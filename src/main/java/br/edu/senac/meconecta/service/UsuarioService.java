package br.edu.senac.meconecta.service;

import br.edu.senac.meconecta.model.Agendamento;
import br.edu.senac.meconecta.model.StatusAgendamento;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

/**
 * Regras de negocio relacionadas ao usuario e a triagem dos agendamentos.
 * Nomeada UsuarioService para manter consistencia com o diagrama de
 * sequencia (Diagrama A.S.) elaborado pela equipe no card do Trello.
 */
@Service
public class UsuarioService {

    // RF01: palavras-chave que indicam um caso de maior vulnerabilidade/urgencia.
    // Simula a "triagem por IA" citada nos requisitos ate que um modelo de
    // classificacao real seja integrado.
    private static final List<String> PALAVRAS_CHAVE_PRIORIDADE_ALTA = List.of(
            "urgente", "crise", "suicid", "autolesao", "desespero", "pânico", "panico"
    );

    /**
     * Define o status inicial do agendamento (PENDENTE ou PRIORIDADE_ALTA)
     * a partir do relato enviado pelo aluno. Chamado pelo
     * AgendamentoController logo apos a criacao da solicitacao,
     * conforme o Fluxo 1 do Diagrama A.S.
     */
    public void realizarTriagem(Agendamento agendamento) {
        String descricao = agendamento.getDescricaoProblema() == null
                ? ""
                : agendamento.getDescricaoProblema().toLowerCase(Locale.ROOT);

        boolean prioridadeAlta = PALAVRAS_CHAVE_PRIORIDADE_ALTA.stream()
                .anyMatch(descricao::contains);

        agendamento.setStatus(prioridadeAlta
                ? StatusAgendamento.PRIORIDADE_ALTA
                : StatusAgendamento.PENDENTE);
    }
}
