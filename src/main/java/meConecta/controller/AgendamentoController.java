package meConecta.controller;

import meConecta.model.Agendamento;
import meConecta.repository.AgendamentoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository repository;

    public AgendamentoController(AgendamentoRepository repository) {
        this.repository = repository;
    }

    // Método 1: Para RECEBER dados do formulário (POST)
    @PostMapping
    public String realizarAgendamento(@RequestParam String descricaoProblema) {
        Agendamento novo = new Agendamento();
        novo.setDescricaoProblema(descricaoProblema);
        novo.setStatus("PENDENTE");

        repository.save(novo);

        return "Pedido enviado com sucesso! A equipe de triagem irá analisar o seu caso.";
    }

    // Método 2: Para LISTAR dados no navegador (GET) - O "vizinho" do método acima
    @GetMapping("/listar")
    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }
}