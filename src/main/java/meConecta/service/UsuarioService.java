package meConecta.service;

import meConecta.model.Agendamento;
import meConecta.model.Usuario;
import meConecta.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    // Lógica de Triagem (Sprint 3 e 4)
    public void realizarTriagem(Agendamento agendamento) {
        String relato = agendamento.getDescricaoProblema().toLowerCase();

        if (relato.contains("urgente") || relato.contains("pânico") || relato.contains("crise") || relato.contains("ajuda")) {
            agendamento.setStatus("PRIORIDADE_ALTA");
        } else {
            agendamento.setStatus("PENDENTE");
        }
    }

    // Métodos de Gestão (Sprint 5)
    public Usuario salvarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<Usuario> buscarTodos() {
        return repository.findAll();
    }
}