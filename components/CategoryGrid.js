import Image from 'next/image'
import { SEGMENTOS } from '@/lib/constants'

export default function CategoryGrid() {
  const cards = SEGMENTOS.filter(s => s.slug !== 'custom').slice(0, 12)
  return (
    <section id="segmentos" className="container py-6">
      <h2 className="text-2xl font-semibold mb-4">Segmentos atendidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.slug} className="card p-4 hover:shadow-md transition">
            <div className="relative h-32 mb-3">
              <Image src={`/mock/${c.slug}.svg`} alt={c.nome} fill />
            </div>
            <h3 className="font-medium">{c.nome}</h3>
            <p className="text-sm text-gray-600">Plano de contas pronto e personalizável.</p>
          </div>
        ))}
      </div>
    </section>
  )
}
