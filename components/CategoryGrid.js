import Image from 'next/image'

const cards = [
  { title: 'Restaurantes', img: '/mock/restaurante.svg' },
  { title: 'Pizzarias', img: '/mock/pizzaria.svg' },
  { title: 'Autopeças', img: '/mock/autopecas.svg' },
  { title: 'Varejo', img: '/mock/varejo.svg' },
  { title: 'Serviços', img: '/mock/servicos.svg' },
]

export default function CategoryGrid() {
  return (
    <section id="segmentos" className="container py-6">
      <h2 className="text-2xl font-semibold mb-4">Segmentos atendidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.title} className="card p-4 hover:shadow-md transition">
            <div className="relative h-32 mb-3">
              <Image src={c.img} alt={c.title} fill />
            </div>
            <h3 className="font-medium">{c.title}</h3>
            <p className="text-sm text-gray-600">Plano de contas pronto e personalizável.</p>
          </div>
        ))}
      </div>
    </section>
  )
}
