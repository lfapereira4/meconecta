const BASE_URL = 'http://localhost:8080';

async function tratarResposta(res) {
  if (!res.ok) {
    let mensagem = `Erro ${res.status}`;
    try {
      const corpo = await res.json();
      mensagem = corpo.message || corpo.error || mensagem;
    } catch {
      // resposta sem corpo JSON, mantem mensagem padrao
    }
    throw new Error(mensagem);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function buscarUsuarioPorEmail(email) {
  const res = await fetch(`${BASE_URL}/usuarios/buscar?email=${encodeURIComponent(email)}`);
  if (res.status === 404) return null;
  return tratarResposta(res);
}

export async function criarUsuario(usuario) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  return tratarResposta(res);
}

export async function criarAgendamento(agendamento) {
  const res = await fetch(`${BASE_URL}/agendamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agendamento),
  });
  return tratarResposta(res);
}

export async function listarAgendamentos() {
  const res = await fetch(`${BASE_URL}/agendamentos/listar`);
  return tratarResposta(res);
}

export async function concluirAgendamento(id, observacoesConclusao) {
  const res = await fetch(`${BASE_URL}/agendamentos/${id}/concluir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ observacoesConclusao }),
  });
  return tratarResposta(res);
}

export async function cancelarAgendamento(id) {
  const res = await fetch(`${BASE_URL}/agendamentos/${id}/cancelar`, {
    method: 'POST',
  });
  return tratarResposta(res);
}
