package com.mycompany.myapp.service;

public class CategoryAlreadyUsedException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public CategoryAlreadyUsedException() {   super("La categorie existe déjà"); }

}
