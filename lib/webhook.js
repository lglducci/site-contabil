import crypto from 'crypto'

export function signPayload(body, secret) {
  return crypto.createHmac('sha256', secret).update(body).digest('hex')
}

export async function forwardToWebhook(path, payload, headers={}) {
  const base = process.env.WEBHOOK_BASE_URL
  const secret = process.env.WEBHOOK_SIGNING_SECRET
  if (!base || !secret) throw new Error('WEBHOOK_BASE_URL/WEBHOOK_SIGNING_SECRET ausentes')
  const body = JSON.stringify(payload)
  const signature = signPayload(body, secret)
  const res = await fetch(`${base}/${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-signature-sha256': signature,
      'x-idempotency-key': headers['x-idempotency-key'] || crypto.randomUUID(),
      ...headers
    },
    body
  })
  const text = await res.text()
  let data; try { data = JSON.parse(text) } catch { data = { raw: text } }
  if (!res.ok) throw new Error(`Webhook error ${res.status}: ${JSON.stringify(data)}`)
  return data
}
