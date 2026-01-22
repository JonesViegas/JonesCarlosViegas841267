package br.gov.mt.seplag.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "artists")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String genre;
    private Integer regionalId;

    public Artist() {}
    public Artist(String name, String genre, Integer regionalId) { 
        this.name = name; 
        this.genre = genre; 
        this.regionalId = regionalId; 
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public Integer getRegionalId() { return regionalId; }
    public void setRegionalId(Integer regionalId) { this.regionalId = regionalId; }
}