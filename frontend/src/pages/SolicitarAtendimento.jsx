import { useState } from 'react';
import { buscarUsuarioPorEmail, criarUsuario, criarAgendamento } from '../api';

export default function SolicitarAtendimento() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('ALUNO');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [tipoAtendimento, setTipoAtendimento] = useState('REMOTO');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setMensagem(null);
    setErro(null);

    try {
      let usuario = await buscarUsuarioPorEmail(email);
      if (!usuario) {
        usuario = await criarUsuario({ nome, email, tipo: tipoUsuario });
      }

      await criarAgendamento({
        descricaoProblema,
        tipoAtendimento,
        usuarioId: usuario.id,
      });

      setMensagem('Solicitação enviada com sucesso! O NUAPE vai analisar seu pedido.');
      setDescricaoProblema('');
    } catch (err) {
      setErro(err.message || 'Não foi possível enviar sua solicitação.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="card">
      <h2>Solicitar atendimento</h2>
      <p className="subtitulo">
        Conte pra gente o que está acontecendo. O NUAPE vai analisar e entrar em contato.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Seus dados</legend>
          <label>
            Nome
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Você é
            <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
              <option value="ALUNO">Aluno</option>
              <option value="PROFISSIONAL">Profissional</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>Sobre o atendimento</legend>
          <label>
            Descreva o problema
            <textarea
              value={descricaoProblema}
              onChange={(e) => setDescricaoProblema(e.target.value)}
              rows={5}
              required
            />
          </label>
          <label>
            Tipo de atendimento
            <select
              value={tipoAtendimento}
              onChange={(e) => setTipoAtendimento(e.target.value)}
            >
              <option value="REMOTO">Remoto</option>
              <option value="PRESENCIAL">Presencial</option>
            </select>
          </label>
        </fieldset>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar solicitação'}
        </button>
      </form>

      {mensagem && <p className="sucesso">{mensagem}</p>}
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}
