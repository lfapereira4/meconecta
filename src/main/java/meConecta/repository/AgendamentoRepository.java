package meConecta.repository;

import meConecta.model.Agendamento;
import meConecta.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    // Isso permitirá buscar todos os agendamentos de um aluno específico
    List<Agendamento> findByAluno(Usuario aluno);

    // E isso permitirá ao profissional ver sua agenda
    List<Agendamento> findByStatus(String status);
}