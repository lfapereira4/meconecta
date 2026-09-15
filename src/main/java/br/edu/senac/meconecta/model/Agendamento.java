package br.edu.senac.meconecta.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String descricaoProblema;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAgendamento status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAtendimento tipoAtendimento;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    private LocalDateTime dataConclusao;

    @Column(length = 2000)
    private String observacoesConclusao;

    public Agendamento() {
    }

    public Agendamento(String descricaoProblema, TipoAtendimento tipoAtendimento, Usuario usuario) {
        this.descricaoProblema = descricaoProblema;
        this.tipoAtendimento = tipoAtendimento;
        this.usuario = usuario;
        this.status = StatusAgendamento.PENDENTE;
        this.dataCriacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getDescricaoProblema() {
        return descricaoProblema;
    }

    public void setDescricaoProblema(String descricaoProblema) {
        this.descricaoProblema = descricaoProblema;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public TipoAtendimento getTipoAtendimento() {
        return tipoAtendimento;
    }

    public void setTipoAtendimento(TipoAtendimento tipoAtendimento) {
        this.tipoAtendimento = tipoAtendimento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public String getObservacoesConclusao() {
        return observacoesConclusao;
    }

    public void setObservacoesConclusao(String observacoesConclusao) {
        this.observacoesConclusao = observacoesConclusao;
    }
}
