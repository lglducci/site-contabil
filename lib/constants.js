 export const SEGMENTOS = [
  { slug: 'academia', nome: 'Academias', img: '/photos/academia.jpg' },
  { slug: 'restaurante', nome: 'Restaurante', img: '/photos/restaurante.webp' },
  { slug: 'pizzaria', nome: 'Pizzaria', img: '/photos/pizzaria.jpg' },
  // os demais podem ficar sem img e continuarão no SVG
]

  const REGIMES = ['Simples', 'Presumido', 'Real'];
export const SITE = { brandName: 'SuaPlataforma' };
export const SETORES = SEGMENTOS.map(s => ({ value: s.slug, label: s.nome }));

export const findSegmentoBySlug = (slug) => SEGMENTOS.find(s => s.slug === slug);
