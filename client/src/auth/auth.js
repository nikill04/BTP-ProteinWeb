// client/src/auth/auth.js
import axios from 'axios'
import config from '../config'

const API = config.API_BASE

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function authHeader() {
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}

// API helpers
export async function registerApi({ name, email, password }) {
  const res = await axios.post(`${API}/api/register`, { name, email, password })
  return res.data
}

export async function loginApi({ email, password }) {
  const res = await axios.post(`${API}/api/login`, { email, password })
  return res.data
}

export async function meApi() {
  const res = await axios.get(`${API}/api/me`, { headers: authHeader() })
  return res.data
}

export async function uploadApi(formData) {
  const res = await axios.post(`${config.API_BASE}/api/upload`, formData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
  return res.data
}

export async function classifyApi(body) {
  const res = await axios.post(`${config.API_BASE}/api/classify`, body, { headers: { ...authHeader() } })
  return res.data
}
