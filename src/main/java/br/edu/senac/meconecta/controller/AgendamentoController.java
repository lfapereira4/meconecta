package br.edu.senac.meconecta.controller;

import br.edu.senac.meconecta.dto.AgendamentoRequest;
import br.edu.senac.meconecta.model.Agendamento;
import br.edu.senac.meconecta.model.StatusAgendamento;
import br.edu.senac.meconecta.model.Usuario;
import br.edu.senac.meconecta.repository.AgendamentoRepository;
import br.edu.senac.meconecta.repository.UsuarioRepository;
import br.edu.senac.meconecta.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public AgendamentoController(AgendamentoRepository agendamentoRepository,
                                  UsuarioRepository usuarioRepository,
                                  UsuarioService usuarioService) {
        this.agendamentoRepository = agendamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
    }

    // RF: aluno preenche o relato do problema e envia a solicitacao (Fluxo 1).
    @PostMapping
    public ResponseEntity<Agendamento> criar(@Valid @RequestBody AgendamentoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado"));

        Agendamento agendamento = new Agendamento(
                request.getDescricaoProblema(),
                request.getTipoAtendimento(),
                usuario
        );

        usuarioService.realizarTriagem(agendamento);

        Agendamento salvo = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(salvo);
    }

    // RF: painel do NUAPE lista os chamados em tempo real (Fluxo 2).
    @GetMapping("/listar")
    public List<Agendamento> listar() {
        return agendamentoRepository.findAll();
    }

    // RF06: historico de atendimentos.
    @GetMapping("/historico")
    public List<Agendamento> historico() {
        return agendamentoRepository.findAll();
    }

    // RF: profissional do NUAPE clica em "Concluir" (Fluxo 2).
    @PostMapping("/{id}/concluir")
    public ResponseEntity<Agendamento> concluir(@PathVariable Long id,
                                                 @RequestBody(required = false) Map<String, String> body) {
        Agendamento agendamento = buscarOu404(id);
        agendamento.setStatus(StatusAgendamento.CONCLUIDO);
        agendamento.setDataConclusao(LocalDateTime.now());
        if (body != null) {
            agendamento.setObservacoesConclusao(body.get("observacoesConclusao"));
        }
        return ResponseEntity.ok(agendamentoRepository.save(agendamento));
    }

    // RF05: permite o cancelamento de um agendamento.
    @PostMapping("/{id}/cancelar")
    public ResponseEntity<Agendamento> cancelar(@PathVariable Long id) {
        Agendamento agendamento = buscarOu404(id);
        agendamento.setStatus(StatusAgendamento.CANCELADO);
        return ResponseEntity.ok(agendamentoRepository.save(agendamento));
    }

    private Agendamento buscarOu404(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agendamento nao encontrado"));
    }
}
