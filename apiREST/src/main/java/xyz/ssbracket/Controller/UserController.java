package xyz.ssbracket.Controller;

import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

import static xyz.ssbracket.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static xyz.ssbracket.Constants.ApiConstants.REGEX_FOR_NUMBERS;

@Validated
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userMainService;

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public ResponseWrapper<User> getUserByID(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @GetMapping()
    public ResponseWrapper<Page<User>> getUserAll( Pageable pageable )
    {
        return new ResponseWrapper<>( userMainService.getAll( pageable ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping
    public ResponseWrapper<User> createUser( @Valid @RequestBody User user )
    {
        return new ResponseWrapper<>( userMainService.add( user ), HttpStatus.OK );
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<User> deleteUser(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/{id}")
    public ResponseWrapper<User> updateUser( @Valid @RequestBody User user,
                                             @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.update( user, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "addfriend/{id}")
    public ResponseWrapper<User> addFriendToUser( @Valid @RequestBody User friend,
                                             @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.addFriend( friend, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "deletefriend/{id}")
    public ResponseWrapper<User> deleteFriendFromUser( @Valid @RequestBody User friend,
                                             @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.deleteFriend( friend, Integer.parseInt( id ) ), HttpStatus.OK );
      }
    @PatchMapping(value = "/addMatch/{id}")
    public ResponseWrapper<User> addMatchToUser(@Valid @RequestBody MatchResult rm,
                                                @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( userMainService.addMatch( rm, Integer.parseInt( id ) ), HttpStatus.OK );
    }
}
