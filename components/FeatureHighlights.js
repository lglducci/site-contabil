const feats = [
  { title: 'Importação automática', desc: 'POS/ERP/CSV/Bancos via webhook e validação.' },
  { title: 'Motor contábil', desc: 'Regras por segmento, centros de custo e rateios.' },
  { title: 'Relatórios', desc: 'Gerenciais, contábeis, fiscais e decisórios (PDF/DOCX).' },
  { title: 'Alertas & KPIs', desc: 'Painel de saúde e monitoramento de anomalias.' },
]

export default function FeatureHighlights() {
  return (
    <section id="recursos" className="bg-white py-8">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-4">Recursos principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feats.map(f => (
            <div key={f.title} className="card p-4">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
