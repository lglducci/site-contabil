import { useState } from 'react'

export default function PlanUpload() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  async function enviar() {
    if (!file) return setStatus('Selecione um arquivo CSV/JSON')
    const text = await file.text()
    const formato = file.name.endsWith('.json') ? 'json' : 'csv'
    setStatus('Enviando...')
    try {
      const res = await fetch('/api/proxy/planos/importar', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-idempotency-key': crypto.randomUUID() },
        body: JSON.stringify({ action:'importar_plano', formato, segmento:'custom', content: text })
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Falha no webhook')
      setStatus('Plano enviado. Validando…')
    } catch (e) {
      setStatus('Erro ao enviar: ' + e.message)
    }
  }

  return (
    <div className="card p-6 space-y-3">
      <div>
        <label className="block text-sm mb-1">Arquivo do plano (CSV ou JSON)</label>
        <input type="file" accept=".csv,.json" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
      </div>
      <button className="btn-primary" onClick={enviar}>Enviar plano via Webhook</button>
      {status && <p className="text-sm">{status}</p>}
      <details className="mt-3">
        <summary className="cursor-pointer text-sm">Ver formato esperado (CSV)</summary>
        <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
{`codigo,nome,grupo,natureza,nivel,codigo_pai,centro_custo,ativa
1,Ativo,Ativo,,1,,,
3.1.01,Receita de Vendas,Resultado,C,3,3.1,,true`}
        </pre>
      </details>
    </div>
  )
}
