package meConecta.controller;

import meConecta.model.Agendamento;
import meConecta.repository.AgendamentoRepository;
import meConecta.service.UsuarioService; // Importe o seu Service
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*") // Adicione esta linha para permitir que o JS acesse a API

public class AgendamentoController {

    // 1. Declaramos as duas ferramentas que o Controller vai usar
    private final AgendamentoRepository repository;
    private final UsuarioService usuarioService;

    // 2. O Construtor: O Spring entrega o Repository e o Service aqui automaticamente
    public AgendamentoController(AgendamentoRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public String realizarAgendamento(@RequestParam String descricaoProblema) {
        // Criamos o objeto agendamento com o que o aluno escreveu
        Agendamento novo = new Agendamento();
        novo.setDescricaoProblema(descricaoProblema);

        // Chamamos o Service para analisar o texto e definir o Status (Prioridade)
        usuarioService.realizarTriagem(novo);

        // Agora que o Service já "carimbou" o agendamento com o status correto, salvamos
        repository.save(novo);

        // Retornamos HTML com botões de navegação
        return "<html><body style='font-family: Arial; text-align: center; padding-top: 50px;'>" +
                "<h2>Pedido enviado com sucesso!</h2>" +
                "<p>Status da triagem: <strong>" + novo.getStatus() + "</strong></p>" +
                "<hr style='width: 50%'>" +
                "<div style='margin-top: 20px;'>" +
                "   <a href='/' style='padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;'>🏠 Voltar ao Início</a>" +
                "   <a href='/agendar.html' style='padding: 10px 20px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 5px;'>➕ Nova Solicitação</a>" +
                "</div>" +
                "</body></html>";
    }

    @GetMapping("/listar")
    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }


    @PostMapping("/{id}/concluir")
    public void concluirAgendamento(@PathVariable Long id) {
        repository.findById(id).ifPresent(agendamento -> {
            agendamento.setStatus("CONCLUIDO");
            repository.save(agendamento);
        });
    }
}