 import Image from 'next/image'
import { SEGMENTOS } from '@/lib/constants'

export default function CategoryGrid() {
  const cards = SEGMENTOS.filter(s => s.slug !== 'custom').slice(0, 12)

  return (
    <section id="segmentos" className="container py-6">
      <h2 className="text-2xl font-semibold mb-4">Segmentos atendidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(c => {
          // Se houver c.img, usamos foto; senão, fallback para o SVG do slug
          const src = c.img || `/mock/${c.slug}.svg`
          return (
            <div key={c.slug} className="card overflow-hidden hover:shadow-md transition">
              <div className="relative h-32">
                <Image
                  src={src}
                  alt={c.nome}
                  fill
                  className={c.img ? 'object-cover' : 'object-contain p-4'}
                  priority={false}
                />
                {c.img && <div className="absolute inset-0 bg-black/20" />}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{c.nome}</h3>
                <p className="text-sm text-gray-600">Plano de contas pronto e personalizável.</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
