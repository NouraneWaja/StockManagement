package com.mycompany.myapp.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponseException;
import tech.jhipster.web.rest.errors.ProblemDetailWithCause;

@SuppressWarnings("java:S110")
public class CategoryAlreadyUsedException extends ErrorResponseException {

    private static final long serialVersionUID = 1L;


    public CategoryAlreadyUsedException() {
        super(
            HttpStatus.BAD_REQUEST,
            ProblemDetailWithCause.ProblemDetailWithCauseBuilder
                .instance()
                .withStatus(HttpStatus.BAD_REQUEST.value())
                .withType(ErrorConstants.CATEGORY_ALREADY_USED_TYPE)
                .withTitle("categorie existe")
                .build(),
            null
        );
    }
}
