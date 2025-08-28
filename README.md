# Site de Gestão (Pages Router, Webhook-First) — v0.2

Landing estilo Amazon + cadastro via webhook + **Planos por Setor (PDF)**.

## Como rodar
```bash
npm install
cp .env.local.sample .env.local
# preencha WEBHOOK_BASE_URL e WEBHOOK_SIGNING_SECRET
npm run dev
```
Acesse: `http://localhost:3000` e `/planos`.

### Variáveis de ambiente
- `WEBHOOK_BASE_URL` → ex.: `https://webhook.site/<token>` (para demo) ou seu backend
- `WEBHOOK_SIGNING_SECRET` → segredo HMAC

### Webhooks esperados
- `POST /ia/sugerir-plano` → retorna `{ proposal_id, pdf_url }`
- `POST /planos/importar` → upload CSV/JSON do plano
- (opcional) `POST /ia/aprovar-plano`

## Estrutura
- `pages/` → `index`, `cadastro`, `planos`, `api/proxy/[...path].js`
- `components/` → Header, MegaMenu, Hero, CategoryGrid, FeatureHighlights, LeadForm, PlanUpload
- `lib/` → `webhook.js`, `constants.js` (listas centralizadas)
- `public/` → logo/hero e `mock/*.svg` por segmento
- `styles/` → Tailwind
- `jsconfig.json` → alias `@/` habilitado
- `.gitignore` → evita subir `.next/` e `node_modules/`

## Notas
- Se o PDF não abrir no embed, use o link "Abrir em nova aba".
- Em produção (Vercel), configure as variáveis nas Project Settings.
