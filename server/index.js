// server/index.js
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const { randomUUID } = require('crypto')
const config = require('./config')

const app = express()
app.use(cors())
app.use(express.json())

// prepare uploads dir
const UPLOAD_DIR = path.join(__dirname, config.UPLOAD_DIR || 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// simple JSON file DB helpers (replaces lowdb)
const DB_FILE = path.join(__dirname, 'db.json')

async function readDb() {
  try {
    const raw = await fsp.readFile(DB_FILE, 'utf8')
    const parsed = JSON.parse(raw || '{}')
    // ensure structure
    parsed.users = parsed.users || []
    parsed.uploads = parsed.uploads || []
    return parsed
  } catch (err) {
    // if file doesn't exist or parse error, create default
    const init = { users: [], uploads: [] }
    await writeDb(init)
    return init
  }
}

async function writeDb(data) {
  // pretty print with 2 spaces
  await fsp.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// initialize DB file if missing
async function initDb() {
  try {
    await readDb()
  } catch (err) {
    await writeDb({ users: [], uploads: [] })
  }
}
initDb().catch(console.error)

// storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    // make unique using timestamp + filename + randomUUID
    const ext = path.extname(file.originalname)
    const fname = path.basename(file.originalname, ext).replace(/\s+/g, '_')
    cb(null, `${Date.now()}_${fname}_${randomUUID().slice(0, 8)}${ext}`)
  }
})
const upload = multer({ storage })

// helper: sign token
function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: '7d' })
}

// register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const db = await readDb()
    const exists = db.users.find(u => u.email === email)
    if (exists) return res.status(400).json({ error: 'User already exists' })

    const hash = await bcrypt.hash(password, 10)
    const newUser = { id: randomUUID(), name: name || '', email, password: hash, createdAt: Date.now() }
    db.users.push(newUser)
    await writeDb(db)

    const token = signToken(newUser)
    res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const db = await readDb()
    const user = db.users.find(u => u.email === email)
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })

    const token = signToken(user)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// middleware to check token
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Not authorized' })
  const m = auth.match(/^Bearer (.+)$/)
  if (!m) return res.status(401).json({ error: 'Not authorized' })
  const token = m[1]
  try {
    const payload = jwt.verify(token, config.JWT_SECRET)
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// verify token
app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    const db = await readDb()
    const user = db.users.find(u => u.id === req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ id: user.id, name: user.name, email: user.email })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// upload image (authenticated)
app.post('/api/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' })
    const db = await readDb()
    const rec = {
      id: randomUUID(),
      userId: req.user.id,
      originalName: req.file.originalname,
      savedName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uploadedAt: Date.now()
    }
    db.uploads.push(rec)
    await writeDb(db)
    res.json({ file: rec, url: `/uploads/${req.file.filename}` })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// classify endpoint: can accept filename in body OR process uploaded file via /api/upload first then call /api/classify with saved filename
app.post('/api/classify', authMiddleware, async (req, res) => {
  try {
    const filename = (req.body.filename || req.body.savedName || '').toString().toLowerCase()
    if (!filename) return res.status(400).json({ error: 'filename required (use savedName from /api/upload or original filename)' })

    const { timeMs, probs } = config.decideByFilename(filename)

    // simulate processing time then respond
    setTimeout(() => {
      res.json({ timeMs, probs })
    }, Math.min(Math.max(timeMs, 300), 8000))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// serve uploaded files statically
app.use('/uploads', express.static(UPLOAD_DIR))

// start server
app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`)
})
