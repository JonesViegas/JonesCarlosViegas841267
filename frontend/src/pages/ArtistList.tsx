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
  
  // Estados de navegação
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Menu sanduíche

  const fetchData = async () => {
    try {
      const [artRes, regRes] = await Promise.all([api.get('/artists'), api.get('/regionais')]);
      setArtists(artRes.data || []);
      setRegionais(regRes.data || []);
    } catch (err: any) {
      if (err.response?.status === 403) handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegId) return alert("Selecione uma Regional no menu!");
    try {
      await api.post('/artists', { name, genre, regionalId: selectedRegId });
      setName(''); setGenre('');
      fetchData();
      alert("Cadastro realizado com sucesso!");
    } catch (err) { alert("Erro ao cadastrar"); }
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegional = selectedRegId ? artist.regionalId === selectedRegId : true;
    return matchesSearch && matchesRegional;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row notranslate" key="main-app">
      
      {/* HEADER MOBILE (Aparece apenas em telas pequenas) */}
      <div className="md:hidden bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
         <img src="/seplag-logo.svg" alt="SEPLAG" className="h-8" />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* OVERLAY MOBILE (Fundo escuro quando o menu abre) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR (Responsiva: Escondida no mobile, visível no desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-blue-900 text-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex md:flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-10 border-b border-blue-800 pb-6 text-center hidden md:block">
          <img src="/seplag-logo.svg" alt="SEPLAG" className="h-12 mx-auto mb-2" />
          <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest"></p>
        </div>
        
        <nav className="flex-1 space-y-4">
          <div 
            onClick={() => { setSelectedRegId(null); setIsRegOpen(false); setIsMobileMenuOpen(false); }}
            className={`cursor-pointer p-3 rounded-xl transition-all flex items-center gap-3 ${!selectedRegId ? 'bg-blue-600 shadow-lg' : 'hover:bg-blue-800 text-blue-100'}`}
          >
            <span className="text-lg">🌎</span>
            <span className="font-bold text-sm">Todas as Unidades</span>
          </div>

          <div className="space-y-2">
            <div 
              onClick={() => setIsRegOpen(!isRegOpen)}
              className="cursor-pointer p-3 rounded-xl hover:bg-blue-800 text-blue-100 flex justify-between items-center transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <span className="font-bold text-sm">Regionais</span>
              </div>
              <span className={`transition-transform duration-300 ${isRegOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {isRegOpen && (
              <ul className="ml-4 space-y-1 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {regionais.filter(reg => reg.nome.startsWith('REGIONAL')).map(reg => (
                  <li 
                    key={`reg-${reg.id}`}
                    onClick={() => { setSelectedRegId(reg.id); setIsMobileMenuOpen(false); }}
                    className={`cursor-pointer p-2 rounded-lg text-xs transition-all ${selectedRegId === reg.id ? 'bg-blue-500 text-white font-bold' : 'hover:bg-blue-700 text-blue-200'}`}
                  >
                    <span>• {reg.nome.replace('REGIONAL DE ', '')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-10 w-full flex items-center justify-center gap-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black transition-all shadow-lg text-sm"
        >
          <span>🚪 SAIR DO SISTEMA</span>
        </button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6" key={`header-${selectedRegId}`}>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 uppercase tracking-tighter">
                {selectedRegId ? <span>{regionais.find(r => r.id === selectedRegId)?.nome}</span> : <span>Gestão de Artistas</span>}
              </h1>
              <p className="text-gray-400 font-medium">SEPLAG MT - Painel de Controle</p>
            </div>
            <div className="relative w-full md:w-96">
              <input 
                type="text" placeholder="🔍 Buscar artista por nome..." 
                className="w-full border-2 border-gray-100 p-4 rounded-2xl shadow-sm focus:border-blue-500 outline-none transition-all bg-white"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* FORMULÁRIO */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
             <h2 className="text-[10px] font-bold text-blue-600 uppercase mb-6 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Novo Cadastro p/ {selectedRegId ? regionais.find(r => r.id === selectedRegId)?.nome : "Unidade Global"}
             </h2>
            <form onSubmit={handleCreateArtist} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Nome" className="bg-gray-50 border-none p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={e => setName(e.target.value)} required />
              <input type="text" placeholder="Gênero" className="bg-gray-50 border-none p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={genre} onChange={e => setGenre(e.target.value)} required />
              <button type="submit" className="bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-blue-700 shadow-xl active:scale-95 transition-all">
                + CADASTRAR
              </button>
            </form>
          </section>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArtists.map(artist => (
              <div key={`artist-card-${artist.id}`} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                <div className="flex justify-between mb-6">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Ativo</span>
                  <span className="text-gray-200 font-mono text-xl">#{artist.id}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800"><span>{artist.name}</span></h3>
                <p className="text-gray-400 text-sm mb-6"><span>{artist.genre}</span></p>
                <button className="w-full py-3 bg-gray-50 text-gray-400 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                  Gerenciar Álbuns
                </button>
              </div>
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="text-center py-20 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium italic">Nenhum artista nesta seleção.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}