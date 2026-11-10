import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SolicitarAtendimento from './pages/SolicitarAtendimento';
import PainelNuape from './pages/PainelNuape';
import './App.css';

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#ffffff" />
      <path
        d="M15 31 L24 17 L33 31"
        fill="none"
        stroke="#004a8d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="31" r="4.5" fill="#f7941d" />
      <circle cx="33" cy="31" r="4.5" fill="#f7941d" />
      <circle cx="24" cy="17" r="4.5" fill="#004a8d" />
    </svg>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="topo">
          <div className="topo-conteudo">
            <div className="marca">
              <Logo />
              <div>
                <h1>meConecta</h1>
                <span className="marca-sub">Apoio psicopedagógico NUAPE</span>
              </div>
            </div>
            <nav>
              <NavLink to="/" end>
                Solicitar atendimento
              </NavLink>
              <NavLink to="/nuape">Painel NUAPE</NavLink>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<SolicitarAtendimento />} />
            <Route path="/nuape" element={<PainelNuape />} />
          </Routes>
        </main>

        <footer className="rodape">
          meConecta · Projeto acadêmico · Faculdade SENAC
        </footer>
      </div>
    </BrowserRouter>
  );
}
