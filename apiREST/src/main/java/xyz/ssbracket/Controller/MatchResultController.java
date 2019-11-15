package xyz.ssbracket.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Service.MatchService;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

import static xyz.ssbracket.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static xyz.ssbracket.Constants.ApiConstants.REGEX_FOR_NUMBERS;

@Validated
@RestController
@RequestMapping("/api/v1/match")
public class MatchResultController {
    @Autowired
    private MatchService matchMainService;

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public ResponseWrapper<MatchResult> getUserByID(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @GetMapping()
    public ResponseWrapper<Page<MatchResult>> getMatchAll(Pageable pageable )
    {
        return new ResponseWrapper<>( matchMainService.getAll( pageable ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping
    public ResponseWrapper<MatchResult> createMatch( @Valid @RequestBody MatchResult matchResult )
    {
        return new ResponseWrapper<>( matchMainService.add( matchResult ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping(value = "/guestUser")
    public ResponseWrapper<MatchResult> createGuestMatch( @Valid @RequestBody MatchResult matchResult )
    {
        return new ResponseWrapper<>( matchMainService.addGuestUser( matchResult ), HttpStatus.OK );
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<MatchResult> deleteMatch(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/{id}")
    public ResponseWrapper<MatchResult> updateMatch(@Valid @RequestBody MatchResult matchResult,
                                                   @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.update( matchResult, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/setusers/{id}")
    public ResponseWrapper<MatchResult> updateMatchUsers(@Valid @RequestBody MatchResult matchResult,
                                                   @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.updateUsers( matchResult, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/setp1string/{id}")
    public ResponseWrapper<MatchResult> updateP1String(@Valid @RequestBody MatchResult matchResult,
                                                         @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.updateP1String( matchResult, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/setp2string/{id}")
    public ResponseWrapper<MatchResult> updateP2String(@Valid @RequestBody MatchResult matchResult,
                                                         @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.updateP2String( matchResult, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/setcharacters/{id}")
    public ResponseWrapper<MatchResult> updateMatchCharacters(@Valid @RequestBody MatchResult matchResult,
                                                       @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( matchMainService.updateCharsPlayed( matchResult, Integer.parseInt( id ) ), HttpStatus.OK );
    }
}
