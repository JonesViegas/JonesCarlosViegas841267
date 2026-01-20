package br.gov.mt.seplag.api.dto;

public class ArtistDTO {
    private String name;
    private String genre;
    private Integer regionalId; 

    public Integer getRegionalId() { return regionalId; }
    public void setRegionalId(Integer regionalId) { this.regionalId = regionalId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
}