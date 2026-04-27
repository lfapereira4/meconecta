package meConecta.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Mantemos desativado para o formulário POST funcionar
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/index.html", "/agendar.html", "/agendamentos").permitAll() // Portas abertas para o aluno
                        .anyRequest().authenticated() // Todo o resto (como a lista) exige LOGIN
                )
                .formLogin(withDefaults()) // Reativa aquela tela de login bonitinha
                .logout(logout -> logout.permitAll());

        return http.build();
    }
}