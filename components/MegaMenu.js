import Link from 'next/link'
import { SEGMENTOS } from '@/lib/constants'

export default function MegaMenu() {
  return (
    <div className="bg-dark text-gray-200">
      <div className="container py-2 overflow-x-auto">
        <ul className="flex gap-4 text-sm">
          {SEGMENTOS.map(s => (
            <li key={s.slug}>
              {s.slug === 'custom'
                ? <Link className="hover:text-white" href="/planos">Plano customizado</Link>
                : <a className="hover:text-white" href="#segmentos">{s.nome}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
