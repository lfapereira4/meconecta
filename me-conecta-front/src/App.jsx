import { useState, useEffect } from 'react'
import Agendar from './Agendar'

function App() {
  const [agendamentos, setAgendamentos] = useState([])
  // 'aluno' mostra o formulário, 'nuape' mostra a tabela administrativa
  const [telaAtual, setTelaAtual] = useState('aluno')

  const carregarDados = () => {
    fetch('http://localhost:8080/agendamentos/listar')
      .then(res => res.json())
      .then(dados => setAgendamentos(dados))
      .catch(err => console.error("Erro ao buscar dados:", err))
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const concluirAtendimento = (id) => {
    fetch(`http://localhost:8080/agendamentos/${id}/concluir`, {
      method: 'POST'
    })
      .then(() => carregarDados())
      .catch(err => console.error("Erro ao concluir:", err))
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>

      {/* 1. BARRA DE NAVEGAÇÃO SUPERIOR */}
      <nav style={{ backgroundColor: '#003366', padding: '15px 40px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>Me-Conecta UTFPR</span>

        <button
          onClick={() => setTelaAtual('aluno')}
          style={{
            backgroundColor: telaAtual === 'aluno' ? '#ffcc00' : 'transparent',
            color: telaAtual === 'aluno' ? '#003366' : 'white',
            border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
          }}
        >
          Área do Aluno
        </button>

        <button
          onClick={() => setTelaAtual('nuape')}
          style={{
            backgroundColor: telaAtual === 'nuape' ? '#ffcc00' : 'transparent',
            color: telaAtual === 'nuape' ? '#003366' : 'white',
            border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
          }}
        >
          Painel NUAPE (Admin)
        </button>
      </nav>

      {/* 2. CONTEÚDO DINÂMICO CONFORME A ABA SELECIONADA */}
      <div style={{ padding: '40px' }}>

        {telaAtual === 'aluno' && (
          <div>
            <h1 style={{ color: '#003366', marginBottom: '30px' }}>Portal do Aluno</h1>
            <Agendar onAgendamentoSucesso={carregarDados} />
          </div>
        )}

        {telaAtual === 'nuape' && (
          <div>
            <h1 style={{ color: '#003366', marginBottom: '30px' }}>Dashboard de Triagem NUAPE</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <thead style={{ backgroundColor: '#003366', color: 'white' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Relato</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map(ag => (
                  <tr key={ag.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{ag.id}</td>
                    <td style={{ padding: '15px' }}>{ag.descricaoProblema}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: ag.status === 'PRIORIDADE_ALTA' ? '#ffe5e5' : ag.status === 'CONCLUIDO' ? '#e5f9e7' : '#e5f1ff',
                        color: ag.status === 'PRIORIDADE_ALTA' ? '#d9534f' : ag.status === 'CONCLUIDO' ? '#28a745' : '#0056b3'
                      }}>
                        {ag.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      {ag.status !== 'CONCLUIDO' ? (
                        <button
                          onClick={() => concluirAtendimento(ag.id)}
                          style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          Concluir
                        </button>
                      ) : (
                        <span style={{ color: '#aaa', fontStyle: 'italic' }}>Atendido</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default App