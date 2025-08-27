'use client';

import { useEffect, useMemo, useState } from 'react';

const BRL = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const BRAND = process.env.NEXT_PUBLIC_BRAND || 'Minha Pizzaria';
const WHATS = process.env.NEXT_PUBLIC_WHATSAPP || '5599999999999';
const MENU_URL = process.env.NEXT_PUBLIC_N8N_MENU_URL;

export default function Page(){
  const [produtos, setProdutos] = useState([]);
  const [cat, setCat] = useState('');
  const [cart, setCart] = useState([]);
  const cats = useMemo(()=> Array.from(new Set(produtos.map(p=>p.categoria||'OUTROS'))), [produtos]);
  const subtotal = cart.reduce((s,i)=>s+i.preco*i.qtd,0);

  useEffect(()=>{
    async function load(){
      try{
        const r = await fetch(MENU_URL, { cache: 'no-store' });
        if(!r.ok) throw new Error('HTTP '+r.status);
        setProdutos(await r.json());
      }catch(e){
        setProdutos([
          {id:1,nome:'Relatório',preco:39.9,imagem:'',categoria:'Contábil',descricao:'Relatório DER'},
          {id:2,nome:'Relatório',preco:42.9,imagem:'',categoria:'Contábil',descricao:'Relatório Balanço'},
          {id:3,nome:'Relatório',preco:8.0,imagem:'',categoria:'Contábil',descricao:'Relatório Balancete'},
          {id:4,nome:'Relatório',preco:11.0,imagem:'',categoria:'Fiscal',descricao:'Reusltados'},
          {id:5,nome:'Modelo Conta',preco:11.0,imagem:'',categoria:'Cadastro',descricao:'Cadastro de Modelos'},
          {id:6,nome:'Lancamentos',preco:11.0,imagem:'',categoria:'Lançammento',descricao:'Lançamentos Manuais'},
          {id:7,nome:'Relatório',preco:39.9,imagem:'',categoria:'Contábil',descricao:'Balancete'},
          {id:8,nome:'Relatório',preco:42.9,imagem:'',categoria:'Contábil',descricao:'Razonete'},
          {id:9,nome:'Relatório',preco:8.0,imagem:'',categoria:'Contábil',descricao:'Balanço KPPI'},
          {id:10,nome:'Relatório',preco:11.0,imagem:'',categoria:'Gerenciail',descricao:'Resultado'},
          {id:11,nome:'Modelo Conta',preco:11.0,imagem:'',categoria:'Cadastro',descricao:'Mensal'},
          {id:12,nome:'Relatório',preco:11.0,imagem:'',categoria:'Gerencial',descricao:'Anual'},
        ]);
      }
    }
    load();
  },[]);

  function add(p){ setCart(prev=>{
    const i = prev.findIndex(x=>x.id===p.id);
    if(i>=0){ const cp=[...prev]; cp[i].qtd+=1; return cp; }
    return [...prev, {id:p.id,nome:p.nome,preco:p.preco,qtd:1}];
  }); }

  function rm(id){ setCart(prev=> prev.filter(x=>x.id!==id)); }

  async function checkout(){
    const nome = prompt('Seu nome?') || '';
    const tel  = prompt('Seu WhatsApp (DDD+Número)?') || '';
    const payload = { cliente: { nome, tel }, itens: cart, total: subtotal, origem: 'site' };
    const r = await fetch('/api/order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if(r.ok){ alert('Pedido enviado!'); setCart([]); } else { alert('Falha ao enviar'); }
  }

  function wpp(){
    const linhas = cart.map(i=>`• ${i.qtd}x ${i.nome} — ${BRL.format(i.preco*i.qtd)}`).join('%0A');
    const msg = `*${BRAND}*%0A%0A${linhas}%0A*Total:* ${BRL.format(subtotal)}`;
    const url = `https://wa.me/${WHATS}?text=${msg}`;
    window.open(url,'_blank');
  }

  const list = cat ? produtos.filter(p=>p.categoria===cat) : produtos;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/80 border-b border-white/10 mb-4">
        <div className="py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 grid place-content-center">
            <span className="text-sky-300 font-black">🍕</span>
          </div>
          <h1 className="text-xl font-bold">{BRAND}</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-slate-300">Itens: {cart.reduce((a,b)=>a+b.qtd,0)}</span>
            <button className="btn bg-sky-500 text-white" onClick={checkout}>Finalizar</button>
            <button className="btn bg-white/10" onClick={wpp}>WhatsApp</button>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-5">
        <button className={`chip ${cat===''?'ring-1 ring-sky-400/50':''}`} onClick={()=>setCat('')}>Tudo</button>
        {cats.map(c=>(
          <button key={c} className={`chip ${cat===c?'ring-1 ring-sky-400/50':''}`} onClick={()=>setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p=>(
          <div key={p.id} className="card overflow-hidden">
            <div className="h-40 w-full overflow-hidden">
              <img className="w-full h-full object-cover" src={p.imagem || `https://picsum.photos/seed/${p.id}/800/400`} alt="" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="font-bold text-lg">{p.nome}</div>
                  <div className="text-slate-400 text-sm">{p.descricao || ''}</div>
                </div>
                <div className="text-right font-extrabold text-sky-300">{BRL.format(p.preco)}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn bg-white/10 flex-1" onClick={()=>add(p)}>Aplicar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-slate-400 text-sm">
        Subtotal: <span className="font-bold text-slate-100">{BRL.format(subtotal)}</span>
        <div className="mt-2">© {new Date().getFullYear()} {BRAND}</div>
      </footer>
    </div>
  );
}
