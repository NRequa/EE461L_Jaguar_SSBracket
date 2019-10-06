package com.example.apiREST.Controller;

import com.example.apiREST.Model.User;
import com.example.apiREST.Model.Tournament;
import com.example.apiREST.Results.ResponseWrapper;
import com.example.apiREST.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.util.List;

import static com.example.apiREST.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static com.example.apiREST.Constants.ApiConstants.REGEX_FOR_NUMBERS;

@Validated
@RestController
@RequestMapping("/api/v1/author")

public class UserController {

    @Autowired
    private UserService userMainService;

    @GetMapping(value = "/{id}")
    public ResponseWrapper<User> getUserByID(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @GetMapping()
    public ResponseWrapper<Page<User>> getUserAll( Pageable pageable )
    {
        return new ResponseWrapper<>( userMainService.getAll( pageable ), HttpStatus.OK );
    }

    @PostMapping
    public ResponseWrapper<User> createUser( @Valid @RequestBody User author )
    {
        return new ResponseWrapper<>( userMainService.add( author ), HttpStatus.OK );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<User> deleteUser(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @PatchMapping(value = "/{id}")
    public ResponseWrapper<User> UpdateUser( @Valid @RequestBody User user,
                                                 @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.update( user, Integer.parseInt( id ) ), HttpStatus.OK );
    }
}
