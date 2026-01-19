package main.java.br.gov.mt.seplag.api.controller;

import br.gov.mt.seplag.api.model.Regional;
import br.gov.mt.seplag.api.repository.RegionalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/regionais")
public class RegionalController {

    private final RegionalRepository regionalRepository;

    // Construtor manual (Substitui o @RequiredArgsConstructor do Lombok)
    public RegionalController(RegionalRepository regionalRepository) {
        this.regionalRepository = regionalRepository;
    }

    @GetMapping
    public ResponseEntity<List<Regional>> getAll() {
        return ResponseEntity.ok(regionalRepository.findAll());
    }
}