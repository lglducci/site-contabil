import Head from 'next/head'
import Header from '@/components/Header'
import LeadForm from '@/components/LeadForm'
import Footer from '@/components/Footer'

export default function Cadastro() {
  return (
    <>
      <Head><title>Cadastro – SuaPlataforma</title></Head>
      <Header />
      <main className="container py-10 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Cadastre-se</h1>
          <p className="text-gray-600 mb-4">Informe seus dados para conhecer a plataforma.</p>
          <LeadForm />
        </div>
        <div className="card p-6">
          <h2 className="font-semibold mb-2">O que você recebe</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            <li>Plano de contas por segmento</li>
            <li>Motor contábil com regras configuráveis</li>
            <li>Relatórios gerenciais/contábeis/fiscais</li>
            <li>Dashboard de KPIs e alertas</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
