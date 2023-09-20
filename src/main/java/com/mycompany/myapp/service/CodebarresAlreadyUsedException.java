package com.mycompany.myapp.service;

public class CodebarresAlreadyUsedException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public CodebarresAlreadyUsedException() {   super("Le code-barres existe déjà"); }
}
