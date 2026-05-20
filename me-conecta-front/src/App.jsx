import { useState, useEffect } from 'react'

function App() {
  const [agendamentos, setAgendamentos] = useState([])

  // 1. Busca os dados do Java
  const carregarDados = () => {
    fetch('http://localhost:8080/agendamentos/listar')
      .then(res => res.json())
      .then(dados => setAgendamentos(dados))
      .catch(err => console.error("Erro ao buscar dados:", err))
  }

  // 2. Executa a busca assim que a página abre
  useEffect(() => {
    carregarDados()
  }, [])

  // 3. Função para o botão Concluir (Sprint 5/6)
  const concluirAtendimento = (id) => {
    fetch(`http://localhost:8080/agendamentos/${id}/concluir`, {
      method: 'POST'
    })
      .then(() => carregarDados())
      .catch(err => console.error("Erro ao concluir:", err))
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#003366' }}>Dashboard NUAPE (React)</h1>

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
                  backgroundColor: ag.status === 'PRIORIDADE_ALTA' ? '#ffe5e5' : '#e5f1ff',
                  color: ag.status === 'PRIORIDADE_ALTA' ? '#d9534f' : '#0056b3'
                }}>
                  {ag.status}
                </span>
              </td>
              <td style={{ padding: '15px' }}>
                <button
                  onClick={() => concluirAtendimento(ag.id)}
                  style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Concluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App