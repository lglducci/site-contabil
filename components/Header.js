import Link from 'next/link'
import MegaMenu from './MegaMenu'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="container py-3 flex items-center gap-6">
        <Link href="/" className="text-xl font-bold">SuaPlataforma</Link>
        <div className="hidden md:block flex-1">
          <SearchBar />
        </div>
        <nav className="text-sm hidden md:block">
          <ul className="flex gap-4">
            <li><Link href="/cadastro">Cadastro</Link></li>
            <li><a href="#recursos">Recursos</a></li>
            <li><a href="#segmentos">Segmentos</a></li>
          </ul>
        </nav>
      </div>
      <MegaMenu />
    </header>
  )
}
