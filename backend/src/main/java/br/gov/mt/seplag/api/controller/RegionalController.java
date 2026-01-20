package br.gov.mt.seplag.api.controller; // PACOTE CORRIGIDO AQUI!

import br.gov.mt.seplag.api.model.Regional;
import br.gov.mt.seplag.api.repository.RegionalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/regionais")
@CrossOrigin(origins = "*") 
public class RegionalController {

    private final RegionalRepository regionalRepository;

    public RegionalController(RegionalRepository regionalRepository) {
        this.regionalRepository = regionalRepository;
    }

    @GetMapping
    public ResponseEntity<List<Regional>> getAll() {
        return ResponseEntity.ok(regionalRepository.findAll());
    }
}