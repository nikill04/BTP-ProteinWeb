// server/config.js
module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-demo-key-change-me',
  UPLOAD_DIR: 'uploads',
  // demo classification rules - change as you like:
  decideByFilename: function (filenameLower) {
    // default
    let timeMs = 2000
    let probs = { covid: 0.25, aids: 0.25, ebola: 0.25, dengue: 0.25 }

    if (filenameLower.includes('fast')) timeMs = 800
    if (filenameLower.includes('mid')) timeMs = 3000
    if (filenameLower.includes('slow')) timeMs = 6000

    if (filenameLower.includes('covid')) probs = { covid: 0.78, aids: 0.05, ebola: 0.08, dengue: 0.09 }
    if (filenameLower.includes('ebola')) probs = { covid: 0.03, aids: 0.02, ebola: 0.90, dengue: 0.05 }
    if (filenameLower.includes('dengue')) probs = { covid: 0.06, aids: 0.04, ebola: 0.10, dengue: 0.80 }
    if (filenameLower.includes('aids') || filenameLower.includes('hiv')) probs = { covid: 0.02, aids: 0.92, ebola: 0.03, dengue: 0.03 }

    const m = filenameLower.match(/_prob(\d{1,2})/)
    if (m) {
      const v = Math.min(95, Math.max(5, parseInt(m[1], 10))) / 100
      probs = { covid: v, aids: (1 - v) / 3, ebola: (1 - v) / 3, dengue: (1 - v) / 3 }
    }

    return { timeMs, probs }
  }
}
