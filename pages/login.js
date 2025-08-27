// pages/login.js
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) alert('Erro: ' + error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded shadow">
        <h2 className="text-xl mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 rounded bg-slate-700" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" className="w-full mb-4 p-2 rounded bg-slate-700" value={senha} onChange={e => setSenha(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">Entrar</button>
        <p className="mt-4 text-sm text-center">Não tem conta? <a href="/cadastro" className="text-blue-300 underline">Cadastrar</a></p>
      </div>
    </div>
  )
}
