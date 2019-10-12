package xyz.ssbracket.Results;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import xyz.ssbracket.Exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.Tournament;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Resultset <T> {
    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private T data;
    //
    private String toStringData;

    private Resultset() {
        this.timestamp = LocalDateTime.now();
    }

    public Resultset( T o, HttpStatus status ) throws ResourceNotFoundException {
        this();
        if ( o == null || ( o instanceof List && ( ( List ) o ).isEmpty() ) )
            throw new ResourceNotFoundException("No Content Found");
        this.status = status;
        this.data = o;
        //
        this.toStringData = o.toString();
    }
}
