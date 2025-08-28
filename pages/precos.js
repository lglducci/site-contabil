// pages/precos.js
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingTable from '@/components/PricingTable'
import { PRICING } from '@/lib/pricing'

export default function Precos({ plans }) {
  return (
    <>
      <Head>
        <title>Planos & Preços – SuaPlataforma</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <Header />
      <main>
        <PricingTable plans={plans} />
        <section className="container py-12">
          <h2 className="text-xl font-semibold mb-3">Perguntas frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold">Posso cancelar quando quiser?</h3>
              <p>Sim. Cancelamento imediato pelo painel. Sem fidelidade.</p>
            </div>
            <div>
              <h3 className="font-semibold">Tem teste?</h3>
              <p>Oferecemos teste de 7 dias ou setup inicial com garantia de 30 dias.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// Lê /public/data/pricing.json se existir; senão, usa lib/pricing.js
export async function getStaticProps() {
  let plans = PRICING
  try {
    const p = path.join(process.cwd(), 'public', 'data', 'pricing.json')
    if (fs.existsSync(p)) {
      const json = JSON.parse(fs.readFileSync(p, 'utf8'))
      if (json?.plans?.length) plans = json.plans
    }
  } catch {}
  return { props: { plans } }
}
