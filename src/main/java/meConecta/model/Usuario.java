package meConecta.model;

import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email; // Essencial para a triagem inicial
    private String senha; // Será protegida por criptografia
    private String tipo; // "ALUNO" ou "PROFISSIONAL"
}