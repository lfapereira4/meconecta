
package meConecta.repository;

import meConecta.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Isso permitirá buscar um usuário pelo e-mail para fazer o login
    Optional<Usuario> findByEmail(String email);
}