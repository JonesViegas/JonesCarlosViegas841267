import React, { useState } from 'react';
import api from '../service/api';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  }

  return (
    // Div pai que centraliza tudo horizontal e verticalmente
    <div className="min-h-screen w-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Logo da SEPLAG */}
        <div className="flex justify-center mb-8">
          <img src="/logo-seplag.png" alt="Logo SEPLAG MT" className="h-20 object-contain" />
        </div>

        <h2 className="text-xl font-bold mb-8 text-center text-gray-700 uppercase tracking-wider">
          Acesso ao Sistema de TI
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 border outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 border outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg active:scale-95"
          >
            ENTRAR
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-gray-400">
          Governo do Estado de Mato Grosso © 2026
        </p>
      </div>
    </div>
  );
}