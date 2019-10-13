package xyz.ssbracket.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DuplicateResourceFoundException extends RuntimeException {

    public DuplicateResourceFoundException( String exception ) {
        super( exception );
    }

    public DuplicateResourceFoundException() {
        super();
    }

    public DuplicateResourceFoundException( String message, Throwable cause ) {
        super( message, cause );
    }

}