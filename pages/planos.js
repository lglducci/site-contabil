import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlanUpload from '@/components/PlanUpload'
import { SETORES, REGIMES } from '@/lib/constants'
import { useState } from 'react'

export default function Planos() {
  const [setor, setSetor] = useState(SETORES[0]?.value ?? SETORES[0]?.slug ?? 'restaurante')
  const [regime, setRegime] = useState(REGIMES[0] ?? 'Simples')
  const [status, setStatus] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [proposalId, setProposalId] = useState('')

  async function gerarSugestao() {
    setStatus('Gerando sugestão…'); setPdfUrl(''); setProposalId('')
    try {
      const res = await fetch('/api/proxy/ia/sugerir-plano', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-idempotency-key': crypto.randomUUID() },
        body: JSON.stringify({ action:'ia_sugerir_plano', setor, regime })
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Falha no webhook')
      const { proposal_id, pdf_url } = data.data || {}
      if (!pdf_url) throw new Error('Backend não retornou pdf_url')
      setProposalId(proposal_id || '')
      setPdfUrl(pdf_url)
      setStatus('Sugestão pronta. Revise o PDF.')
    } catch (e) {
      setStatus('Erro: ' + e.message + ' (ok para seguir com upload abaixo)')
    }
  }

  return (
    <>
      <Head><title>Planos de Contas – SuaPlataforma</title></Head>
      <Header />
      <main className="container py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Plano de Contas Customizado</h1>
          <p className="text-gray-600 mb-4">
            Envie seu plano (CSV/JSON). Validamos, versionamos e aplicamos às suas empresas.
          </p>

          {/* Sugestão por Setor (PDF) */}
          <div className="card p-4 space-y-3 mb-6">
            <h2 className="font-semibold">Sugestão por Setor (PDF)</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm mb-1">Setor</label>
                <select className="w-full border rounded px-3 py-2"
                        value={setor}
                        onChange={e=>setSetor(e.target.value)}>
                  {SETORES.map(s => (
                    <option key={(s.value ?? s.slug)} value={(s.value ?? s.slug)}>
                      {s.label ?? s.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Regime</label>
                <select className="w-full border rounded px-3 py-2"
                        value={regime}
                        onChange={e=>setRegime(e.target.value)}>
                  {REGIMES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button className="btn-primary" onClick={gerarSugestao}>
                  Gerar sugestão (PDF)
                </button>
              </div>
            </div>
            {status && <p className="text-sm">{status}</p>}
          </div>

          {/* Prévia do PDF se houver */}
          {pdfUrl && (
            <div className="card p-2 mb-6">
              <iframe src={pdfUrl} className="w-full" style={{height:'70vh'}} title="Prévia do Plano (PDF)"></iframe>
            </div>
          )}

          <PlanUpload />
        </div>
        <div className="card p-6">
          <h2 className="font-semibold mb-2">O que acontece depois?</h2>
          <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
            <li>Validação estrutural (códigos, hierarquia, natureza D/C)</li>
            <li>Mapeamentos origem→conta (você define ou enviamos um template)</li>
            <li>Aplicação nas empresas/unidades e testes com dados reais</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  )
}
