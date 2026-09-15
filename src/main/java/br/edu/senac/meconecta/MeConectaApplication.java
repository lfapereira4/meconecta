package br.edu.senac.meconecta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class MeConectaApplication {

    public static void main(String[] args) {
        // RNF01: horario do sistema sincronizado com o fuso de Brasilia.
        TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
        SpringApplication.run(MeConectaApplication.class, args);
    }

}
