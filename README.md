# Site de Gestão (Pages Router, Webhook-First)

Landing bonita estilo Amazon + tela de cadastro. Todas as ações de backend passam por `/api/proxy/*` e são encaminhadas para `WEBHOOK_BASE_URL` com assinatura HMAC e idempotência.

## Rodar local
```bash
npm install
cp .env.local.sample .env.local
npm run dev
```
Edite `.env.local`:

```
WEBHOOK_BASE_URL=https://api.seu-dominio.com/webhooks
WEBHOOK_SIGNING_SECRET=supersegredo
```

## Estrutura
- `pages/` (Pages Router): `index.js` (Home), `cadastro.js` (Lead), `api/proxy/[...path].js` (proxy webhook)
- `components/`: Header, MegaMenu, Hero, CategoryGrid, FeatureHighlights, Footer, LeadForm
- `lib/webhook.js`: assinatura e forward
- `styles/globals.css`: Tailwind

Depois de subir no GitHub, importe no Vercel e configure as variáveis de ambiente.
