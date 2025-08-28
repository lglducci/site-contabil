import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container py-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Gestão Contábil & Gerencial <span className="text-primary">multiempresa</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Escolha um plano de contas por segmento, importe dados e receba relatórios gerenciais,
          contábeis, fiscais e painéis decisórios.
        </p>
        <div className="flex gap-3">
          <Link href="/cadastro" className="btn-primary">Começar agora</Link>
          <a href="#segmentos" className="btn-ghost">Ver segmentos</a>
        </div>
      </div>
      <div className="relative h-64 md:h-80">
        <Image src="/hero.svg" alt="Dashboard" fill priority />
      </div>
    </section>
  )
}
