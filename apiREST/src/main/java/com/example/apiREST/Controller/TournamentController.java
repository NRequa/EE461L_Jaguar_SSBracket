package com.example.apiREST.Controller;

import com.example.apiREST.Model.Tournament;
import com.example.apiREST.Results.ResponseWrapper;
import com.example.apiREST.Service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

import static com.example.apiREST.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static com.example.apiREST.Constants.ApiConstants.REGEX_FOR_NUMBERS;

@Validated
@RestController
@RequestMapping("/api/v1/tournament")
public class TournamentController {
    @Autowired
    private TournamentService tournamentService;

    @GetMapping(value = "/{id}")
    public ResponseWrapper<Tournament> getPublisherById(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.getById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @GetMapping()
    public ResponseWrapper<Page<Tournament>> getPublisherAll( Pageable pageable )
    {
        return new ResponseWrapper<>( tournamentService.getAll( pageable ), HttpStatus.OK );
    }

    @PostMapping
    public ResponseWrapper<Tournament> createPublisher( @Valid @RequestBody Tournament book )
    {
        return new ResponseWrapper<>( tournamentService.add( book ), HttpStatus.OK );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseWrapper<Tournament> deletePublisher(
            @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.deleteById( Integer.parseInt( id ) ), HttpStatus.OK );
    }

    @PatchMapping(value = "/{id}")
    public ResponseWrapper<Tournament> UpdateAuthor( @Valid @RequestBody Tournament book,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( tournamentService.update( book, Integer.parseInt( id ) ), HttpStatus.OK );
    }
}
