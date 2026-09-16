import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SolicitarAtendimento from './pages/SolicitarAtendimento';
import PainelNuape from './pages/PainelNuape';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="topo">
          <h1>MeConecta</h1>
          <nav>
            <NavLink to="/" end>
              Solicitar atendimento
            </NavLink>
            <NavLink to="/nuape">Painel NUAPE</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<SolicitarAtendimento />} />
            <Route path="/nuape" element={<PainelNuape />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
