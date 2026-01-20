import { useEffect, useState } from 'react';
import api from '../service/api';

interface Artist { id: number; name: string; genre: string; regionalId: number; }
interface Regional { id: number; nome: string; ativo: boolean; }

export function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [regionais, setRegionais] = useState<Regional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegId, setSelectedRegId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');

  const fetchData = async () => {
    try {
      const [artRes, regRes] = await Promise.all([api.get('/artists'), api.get('/regionais')]);
      setArtists(artRes.data || []);
      setRegionais(regRes.data || []);
    } catch (err) { console.error("Erro ao carregar dados", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegId) return alert("Selecione uma Regional na barra lateral primeiro!");
    try {
      await api.post('/artists', { name, genre, regionalId: selectedRegId });
      setName(''); setGenre('');
      fetchData();
      alert("Cadastro realizado com sucesso!");
    } catch (err) { alert("Erro ao cadastrar"); }
  };

  // Lógica de filtro segura
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegional = selectedRegId ? artist.regionalId === selectedRegId : true;
    return matchesSearch && matchesRegional;
  });

  // Encontrar o nome da regional selecionada de forma segura
  const currentRegionalName = selectedRegId 
    ? regionais.find(r => r.id === selectedRegId)?.nome 
    : "Gestão de Artistas";

  return (
    <div className="min-h-screen bg-gray-50 flex w-full" key="main-container">
      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-6 shadow-2xl hidden md:block">
        <div className="mb-10 border-b border-blue-800 pb-6">
          <img src="/logo-seplag.png" alt="SEPLAG" className="h-12 mx-auto" />
        </div>
        <h2 className="text-[10px] font-black text-blue-300 uppercase mb-6">Filtrar por Unidade</h2>
        <ul className="space-y-1">
          <li 
            key="all-units"
            onClick={() => setSelectedRegId(null)}
            className={`cursor-pointer p-3 rounded-xl transition-all ${!selectedRegId ? 'bg-blue-600 font-bold' : 'hover:bg-blue-800 text-blue-100'}`}
          >
            🌎 Todas as Regionais
          </li>
          {regionais.filter(reg => reg.nome.startsWith('REGIONAL')).map(reg => (
            <li 
              key={`reg-${reg.id}`} // KEY ÚNICA
              onClick={() => setSelectedRegId(reg.id)}
              className={`cursor-pointer p-3 rounded-xl text-sm transition-all ${selectedRegId === reg.id ? 'bg-blue-600 font-bold' : 'hover:bg-blue-800'}`}
            >
              {reg.nome.replace('REGIONAL DE ', '')}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6" key={`header-${selectedRegId}`}>
            <div>
              <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                {currentRegionalName}
              </h1>
              <p className="text-gray-500">Painel de controle - SEPLAG MT</p>
            </div>
            <input 
              type="text" placeholder="🔍 Buscar artista..." 
              className="border-2 border-gray-100 p-4 rounded-2xl w-full md:w-80 shadow-sm focus:border-blue-500 outline-none"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FORMULÁRIO */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-xs font-bold text-blue-600 uppercase mb-6">Novo Cadastro Vinculado</h2>
            <form onSubmit={handleCreateArtist} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input type="text" placeholder="Nome" className="bg-gray-50 p-4 rounded-xl outline-none" value={name} onChange={e => setName(e.target.value)} required />
              <input type="text" placeholder="Gênero" className="bg-gray-50 p-4 rounded-xl outline-none" value={genre} onChange={e => setGenre(e.target.value)} required />
              <button type="submit" className="bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg active:scale-95 transition-all">
                + Cadastrar Artista
              </button>
            </form>
          </section>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map(artist => (
              <div key={`artist-${artist.id}`} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl transition-all">
                <div className="flex justify-between mb-6">
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Ativo</span>
                  <span className="text-gray-300 font-mono">#{artist.id}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{artist.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{artist.genre}</p>
                <button className="w-full py-3 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                  Álbuns
                </button>
              </div>
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="text-center py-20 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Nenhum artista encontrado para esta seleção.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}