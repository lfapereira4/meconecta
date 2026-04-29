package meConecta.service;
import meConecta.model.Agendamento;
import meConecta.model.Usuario;
import meConecta.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    // --- NOVA LÓGICA DE TRIAGEM ---
    public void realizarTriagem(Agendamento agendamento) {
        String relato = agendamento.getDescricaoProblema().toLowerCase();

        // Lógica de Prioridade
        if (relato.contains("urgente") || relato.contains("pânico") || relato.contains("crise") || relato.contains("ajuda")) {
            agendamento.setStatus("PRIORIDADE_ALTA");
        } else {
            agendamento.setStatus("PENDENTE");
        }
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}