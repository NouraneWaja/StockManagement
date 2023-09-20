package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "prix")
    private Float prix;

    @Column(name = "codebarres", unique = true)
    private String codebarres;

    @ManyToOne(fetch = FetchType.LAZY)
    private Categorie categorie;


    public Long getId() {
        return this.id;
    }

    public Article id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Article nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getQuantite() {
        return this.quantite;
    }

    public Article quantite(Integer quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Float getPrix() {
        return this.prix;
    }

    public Article prix(Float prix) {
        this.setPrix(prix);
        return this;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public String getCodebarres() {
        return this.codebarres;
    }

    public Article codebarres(String codebarres) {
        this.setCodebarres(codebarres);
        return this;
    }

    public void setCodebarres(String codebarres) {
        this.codebarres = codebarres;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Article categorie(Categorie categorie) {
        this.setCategorie(categorie);
        return this;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", quantite=" + getQuantite() +
            ", prix=" + getPrix() +
            ", codebarres='" + getCodebarres() + "'" +
            "}";
    }
}
