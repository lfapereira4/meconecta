package meConecta.service;

import meConecta.model.Usuario;
import meConecta.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    /*este arquivo tem a lógica que lê a "situação-problema" do aluno e decide qual profissional deve atendê-lo*/

    private final UsuarioRepository repository;

    // Construtor para o Spring injetar o repositório automaticamente
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        // Aqui futuramente aplicaremos a criptografia citada no artigo
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
