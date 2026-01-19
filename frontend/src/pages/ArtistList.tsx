import { useEffect, useState } from 'react';
import api from '../service/api';

// Definição de Tipos para o TypeScript (Requisito Sênior)
interface Artist {
  id: number;
  name: string;
  genre: string;
}

interface Regional {
  id: number;
  nome: string;
  ativo: boolean;
}

export function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [regionais, setRegionais] = useState<Regional[]>([]);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Função para carregar dados do Backend
  const fetchData = async () => {
    try {
      const [artistRes, regionalRes] = await Promise.all([
        api.get('/artists'),
        api.get('/regionais') // Criamos esse endpoint no Java antes
      ]);
      setArtists(artistRes.data);
      setRegionais(regionalRes.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        alert("Sua sessão expirou (limite de 5 min). Faça login novamente.");
        window.location.href = '/';
      }
      console.error("Erro ao carregar dados", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Função para cadastrar novo artista (Corrigida)
  const handleCreateArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/artists', { name, genre });
      setName('');
      setGenre('');
      await fetchData(); // Força a atualização da lista
      alert("Artista cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar. Verifique se o servidor está ligado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full">
      
      {/* SIDEBAR: Regionais (Exigência 6.3.1-e) */}
      <aside className="w-full md:w-64 bg-blue-900 text-white p-6 shadow-xl">
        <div className="mb-10 flex justify-center border-b border-blue-800 pb-6">
            <img src="/logo-seplag.png" alt="SEPLAG" className="h-18 brightness-120" />
        </div>
        <h2 className="text-lg font-bold mb-6 text-blue-200 uppercase text-xs tracking-widest">Regionais SEPLAG</h2>
        <ul className="space-y-3">
          {regionais.map(reg => (
            <li key={reg.id} className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${reg.ativo ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {reg.nome}
            </li>
          ))}
        </ul>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-800">Gestão de Artistas</h1>
            <button 
              onClick={() => { localStorage.clear(); window.location.href='/'; }}
              className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
              Sair do Sistema
            </button>
          </div>

          {/* FORMULÁRIO DE CADASTRO */}
          <div className="bg-white p-8 rounded-xl shadow-sm mb-10 border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Novo Cadastro</h2>
            <form onSubmit={handleCreateArtist} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" placeholder="Nome Completo" 
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={name} onChange={e => setName(e.target.value)} required 
              />
              <input 
                type="text" placeholder="Gênero Musical" 
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={genre} onChange={e => setGenre(e.target.value)} required 
              />
              <button 
                type="submit" disabled={loading}
                className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Salvando...' : 'Cadastrar Artista'}
              </button>
            </form>
          </div>

          {/* LISTAGEM DE CARDS */}
          <h2 className="text-xl font-bold mb-6 text-gray-700">Artistas no Banco de Dados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map(artist => (
              <div key={artist.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded uppercase">Ativo</div>
                  <span className="text-gray-300 text-xs font-mono">ID: #{artist.id}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{artist.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{artist.genre}</p>
                <button className="w-full text-sm py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">+ Gerenciar Álbuns</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}