import { useState } from 'react'

function Agendar({ onAgendamentoSucesso }) {
  const [relato, setRelato] = useState('')
  const [mensagem, setMensagem] = useState('')

  const lidarComEnvio = (e) => {
    e.preventDefault()

    if (!relato.trim()) {
      setMensagem('Por favor, descreva o seu problema.')
      return
    }

    // Configura os dados para enviar como formulário para o Java
    const formData = new URLSearchParams()
    formData.append('descricaoProblema', relato)

    fetch('http://localhost:8080/agendamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao enviar agendamento')
        return res.json()
      })
      .then(dados => {
        setMensagem(`Agendamento enviado com sucesso! Status: ${dados.status}`)
        setRelato('') // Limpa o campo de texto depois que envia
        if (onAgendamentoSucesso) onAgendamentoSucesso() // Avisa a tabela para atualizar
      })
      .catch(err => {
        console.error(err)
        setMensagem('Erro ao conectar com o servidor.')
      })
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      marginBottom: '40px',
      maxWidth: '600px'
    }}>
      <h2 style={{ color: '#003366', marginTop: 0, marginBottom: '20px' }}>Nova Solicitação de Atendimento</h2>

      <form onSubmit={lidarComEnvio}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="relato" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Descreva brevemente o que está acontecendo:
          </label>
          <textarea
            id="relato"
            rows="4"
            value={relato}
            onChange={(e) => setRelato(e.target.value)}
            placeholder="Ex: Estou com muita dificuldade de organização com o horário das matérias..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              fontFamily: 'sans-serif',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#003366',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            width: '100%'
          }}
        >
          Enviar Solicitação
        </button>
      </form>

      {mensagem && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: mensagem.includes('Erro') ? '#ffe5e5' : '#e5f9e7',
          color: mensagem.includes('Erro') ? '#d9534f' : '#28a745',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {mensagem}
        </div>
      )}
    </div>
  )
}

export default Agendar