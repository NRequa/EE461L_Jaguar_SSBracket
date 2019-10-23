package xyz.ssbracket.Controller;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Service.TournamentService;
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
@RequestMapping("/api/v1/tournament")
public class TournamentController {
    @Autowired
    private TournamentService tournamentService;

    @GetMapping(value = "/{id}")
    public ResponseWrapper<Tournament> getTournamentById(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @GetMapping()
    public ResponseWrapper<Page<Tournament>> getTournamentAll( Pageable pageable )
    {
        return new ResponseWrapper<>( tournamentService.getAll( pageable ), HttpStatus.OK );
    }

    @PostMapping
    public ResponseWrapper<Tournament> createTournament( @Valid @RequestBody Tournament tournament )
    {
        return new ResponseWrapper<>( tournamentService.add( tournament ), HttpStatus.OK );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<Tournament> deleteTournament(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @PatchMapping(value = "/{id}")
    public ResponseWrapper<Tournament> updateUsersInTournament(@Valid @RequestBody User user,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.updateUsers( user, Integer.parseInt( id ) ), HttpStatus.OK );
    }
}
