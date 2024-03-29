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

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/tournament")
public class TournamentController {
    @Autowired
    private TournamentService tournamentService;

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public ResponseWrapper<Tournament> getTournamentById(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @GetMapping()
    public ResponseWrapper<Page<Tournament>> getTournamentAll( Pageable pageable )
    {
        return new ResponseWrapper<>( tournamentService.getAll(pageable ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping(value = "/name")
    public ResponseWrapper<Page<Tournament>> searchTournament( @RequestBody Tournament tournamentName, Pageable pageable )
    {
        return new ResponseWrapper<>( tournamentService.searchTournamentName( pageable, tournamentName ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping
    public ResponseWrapper<Tournament> createTournament( @Valid @RequestBody Tournament tournament )
    {
        return new ResponseWrapper<>( tournamentService.add( tournament ), HttpStatus.OK );
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<Tournament> deleteTournament(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/addUser/{id}")
    public ResponseWrapper<Tournament> addUsersInTournament(@Valid @RequestBody User userId,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.addUsers( userId, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/deleteUser/{id}")
    public ResponseWrapper<Tournament> deleteUsersInTournament(@Valid @RequestBody User userId,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.deleteUsers( userId, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/addvisit/{id}")
    public ResponseWrapper<Tournament> addVisits(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.addVisit( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/close/{id}")
    public ResponseWrapper<Tournament> closeTournament(@Valid @RequestBody Tournament tournamentClose,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.handleCloseTournament( tournamentClose, Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/setChampion/{id}")
    public ResponseWrapper<Tournament>setChampionName(@Valid @RequestBody Tournament champion,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.setChampion( champion, Integer.parseInt( id ) ), HttpStatus.OK );
    }

}
