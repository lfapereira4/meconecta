package meConecta.controller;

import meConecta.model.Usuario;
import meConecta.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping("/listar-todos")
    public List<Usuario> buscarTodos() {
        return service.buscarTodos();
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return service.salvarUsuario(usuario);
    }
}