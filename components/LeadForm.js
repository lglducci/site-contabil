import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('Email inválido'),
  segmento: z.enum(['restaurante','pizzaria','autopecas','varejo','servicos']),
  telefone: z.string().min(8, 'Telefone inválido')
})

export default function LeadForm() {
  const [form, setForm] = useState({ nome: '', email: '', segmento: 'restaurante', telefone: '' })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }
    setErrors(null); setStatus('Enviando...')
    try {
      const res = await fetch('/api/proxy/leads/criar', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-idempotency-key': crypto.randomUUID() },
        body: JSON.stringify({ action: 'criar_lead', payload: parsed.data })
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Falha no webhook')
      setStatus('Recebemos seus dados. Obrigado!')
    } catch (err) {
      setStatus('Erro ao enviar. Tente novamente.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-3">
      <div>
        <label className="block text-sm mb-1">Nome</label>
        <input className="w-full border rounded px-3 py-2" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value})} />
        {errors?.nome && <p className="text-red-600 text-sm">{errors.nome[0]}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full border rounded px-3 py-2" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        {errors?.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Segmento</label>
        <select className="w-full border rounded px-3 py-2" value={form.segmento} onChange={e=>setForm({...form, segmento: e.target.value})}>
          <option value="restaurante">Restaurante</option>
          <option value="pizzaria">Pizzaria</option>
          <option value="autopecas">Autopeças</option>
          <option value="varejo">Varejo</option>
          <option value="servicos">Serviços</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Telefone</label>
        <input className="w-full border rounded px-3 py-2" value={form.telefone} onChange={e=>setForm({...form, telefone: e.target.value})} />
        {errors?.telefone && <p className="text-red-600 text-sm">{errors.telefone[0]}</p>}
      </div>
      <button className="btn-primary">Cadastrar</button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  )
}
