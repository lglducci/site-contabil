import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import FeatureHighlights from '@/components/FeatureHighlights'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>SuaPlataforma – Gestão Multiempresa</title>
        <meta name="description" content="Gestão contábil e Gerencial Multiempresa com Planos de Contas por Segmento." />
      </Head>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeatureHighlights />
        <section className="container py-10">
          <div className="card p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Pronto para começar?</h3>
              <p className="text-gray-600 text-sm">Crie seu cadastro em menos de 1 minuto.</p>
            </div>
            <a className="btn-primary" href="/cadastro">Criar cadastro</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
