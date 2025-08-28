// lib/constants.js
export const SEGMENTOS = [
  { slug: 'restaurante', nome: 'Restaurante' },
  { slug: 'pizzaria', nome: 'Pizzaria' },
  { slug: 'autopecas', nome: 'Autopeças' },
  { slug: 'farmacia', nome: 'Farmácia' },
  { slug: 'moda', nome: 'Moda / Confecção' },
  { slug: 'papelaria', nome: 'Papelaria' },
  { slug: 'material-construcao', nome: 'Materiais de Construção' },
  { slug: 'clinica', nome: 'Clínicas' },
  { slug: 'academia', nome: 'Academias' },
  { slug: 'salao', nome: 'Salões de Beleza' },
  { slug: 'transportes', nome: 'Transportadoras' },
  { slug: 'escritorio', nome: 'Escritórios/Serviços' },
  { slug: 'escola', nome: 'Escolas' },
  { slug: 'hotelaria', nome: 'Hotelaria' },
  { slug: 'petshop', nome: 'Pet Shop' },
  { slug: 'combustivel', nome: 'Postos de Combustível' },
  { slug: 'padaria', nome: 'Padarias' },
  { slug: 'mercearia', nome: 'Mercearias' },
  { slug: 'ecommerce', nome: 'E-commerce' },
  { slug: 'marketplace', nome: 'Marketplaces' },
  { slug: 'profissionais', nome: 'Serviços Profissionais' },
  { slug: 'associacao', nome: 'Associação/ONG' },
  { slug: 'custom', nome: 'Customizado (enviar plano)' }
];

export const REGIMES = ['Simples', 'Presumido', 'Real'];
export const SITE = { brandName: 'SuaPlataforma' };
export const SETORES = SEGMENTOS.map(s => ({ value: s.slug, label: s.nome }));

export const findSegmentoBySlug = (slug) => SEGMENTOS.find(s => s.slug === slug);
