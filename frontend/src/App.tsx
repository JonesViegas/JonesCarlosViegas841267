import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { ArtistList } from './pages/ArtistList';

// Vamos criar essa página em seguida
function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo ao Painel SEPLAG-MT</h1>
      <p className="mt-4">Você está logado com sucesso!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Inicial: Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota do Painel (Dashboard) */}
        <Route path="/dashboard" element={<ArtistList />} />
        
        {/* Redireciona qualquer rota errada para o login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;