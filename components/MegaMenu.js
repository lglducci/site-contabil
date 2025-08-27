import Link from 'next/link'

const segmentos = [
  { slug: 'restaurante', nome: 'Restaurante' },
  { slug: 'pizzaria', nome: 'Pizzaria' },
  { slug: 'autopecas', nome: 'Autopeças' },
  { slug: 'varejo', nome: 'Varejo' },
  { slug: 'servicos', nome: 'Serviços' },
]

export default function MegaMenu() {
  return (
    <div className="bg-dark text-gray-200">
      <div className="container py-2 overflow-x-auto">
        <ul className="flex gap-4 text-sm">
          {segmentos.map(s => (
            <li key={s.slug}>
              <Link className="hover:text-white" href={`/#segmentos`}>{s.nome}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
