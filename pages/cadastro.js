// pages/cadastro.js
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleCadastro = async () => {
    const { error } = await supabase.auth.signUp({ email, password: senha })
    if (error) alert('Erro: ' + error.message)
    else {
      alert('Conta criada com sucesso!')
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded shadow">
        <h2 className="text-xl mb-4">Cadastro</h2>
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 rounded bg-slate-700" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" className="w-full mb-4 p-2 rounded bg-slate-700" value={senha} onChange={e => setSenha(e.target.value)} />
        <button onClick={handleCadastro} className="w-full bg-green-500 hover:bg-green-600 p-2 rounded">Cadastrar</button>
        <p className="mt-4 text-sm text-center">Já tem conta? <a href="/login" className="text-blue-300 underline">Login</a></p>
      </div>
    </div>
  )
}
