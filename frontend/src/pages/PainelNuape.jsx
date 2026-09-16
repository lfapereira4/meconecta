import { useEffect, useState } from 'react';
import { listarAgendamentos, concluirAgendamento, cancelarAgendamento } from '../api';

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  PRIORIDADE_ALTA: 'Prioridade alta',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
};

export default function PainelNuape() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregar() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await listarAgendamentos();
      setAgendamentos(dados);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar os agendamentos.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleConcluir(id) {
    const observacoes = window.prompt('Observações da conclusão (opcional):', '') || '';
    try {
      await concluirAgendamento(id, observacoes);
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleCancelar(id) {
    try {
      await cancelarAgendamento(id);
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="card">
      <div className="cabecalho-painel">
        <h2>Painel do NUAPE</h2>
        <button onClick={carregar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {!carregando && agendamentos.length === 0 && (
        <p className="subtitulo">Nenhum agendamento por enquanto.</p>
      )}

      <div className="lista-agendamentos">
        {agendamentos.map((a) => (
          <div key={a.id} className={`agendamento status-${a.status.toLowerCase()}`}>
            <div className="agendamento-topo">
              <span className="badge">{STATUS_LABEL[a.status] || a.status}</span>
              <span className="tipo">{a.tipoAtendimento}</span>
            </div>
            <p className="descricao">{a.descricaoProblema}</p>
            <p className="meta">
              Solicitado por: <strong>{a.usuario?.nome}</strong> ({a.usuario?.email})
            </p>
            {a.status === 'PENDENTE' || a.status === 'PRIORIDADE_ALTA' ? (
              <div className="acoes">
                <button onClick={() => handleConcluir(a.id)}>Concluir</button>
                <button className="secundario" onClick={() => handleCancelar(a.id)}>
                  Cancelar
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
