import { forwardToWebhook } from '@/lib/webhook'
import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' })
  const { path = [] } = req.query
  const idem = req.headers['x-idempotency-key'] || crypto.randomUUID()
  try {
    const data = await forwardToWebhook(path.join('/'), req.body, { 'x-idempotency-key': idem })
    res.status(200).json({ ok: true, data })
  } catch (err) {
    res.status(502).json({ ok:false, error: err.message })
  }
}
