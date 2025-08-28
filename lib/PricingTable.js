// components/PricingTable.js
import Link from 'next/link'
import { useMemo } from 'react'

export default function PricingTable({ plans = [] }) {
  const [pro] = useMemo(() => plans.filter(p => p.highlight), [plans])

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="container">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Planos & Preços</h1>
          <p className="text-slate-300">Escolha um plano. Você pode trocar a qualquer momento.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-6 flex flex-col ${p.highlight ? 'ring-2 ring-primary shadow-xl scale-[1.01]' : ''}`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">R${p.price}</span>
                  <span className="text-sm text-slate-400">{p.period}</span>
                </div>
              </div>

              <ul className="text-sm text-slate-200/90 space-y-2 mb-6 flex-1">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                    {f}
                  </li>
                ))}
              </ul>

              {p.checkout?.startsWith('http') ? (
                <a
                  href={p.checkout}
                  className="w-full text-center px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
                  target="_blank" rel="noreferrer"
                >
                  {p.cta || 'Assinar'}
                </a>
              ) : (
                <Link href="/cadastro" className="w-full text-center px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90">
                  {p.cta || 'Assinar'}
                </Link>
              )}
            </div>
          ))}
        </div>

        {pro && (
          <p className="text-center text-xs text-slate-400 mt-6">
            * Recomendado: plano <strong>{pro.name}</strong> para a maioria dos clientes.
          </p>
        )}
      </div>
    </section>
  )
}
