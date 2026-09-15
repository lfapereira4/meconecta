package br.edu.senac.meconecta.repository;

import br.edu.senac.meconecta.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}
