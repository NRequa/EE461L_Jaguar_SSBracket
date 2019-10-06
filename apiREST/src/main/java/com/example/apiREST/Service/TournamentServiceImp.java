package com.example.apiREST.Service;

import com.example.apiREST.Model.Tournament;
import com.example.apiREST.Model.User;
import com.example.apiREST.Repository.UserRepository;
import com.example.apiREST.Repository.TournamentRepository;
import com.example.apiREST.Exception.ResourceNotFoundException;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@SuppressWarnings("unchecked")
@Service
public class TournamentServiceImp extends TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<Tournament> getAll( Pageable pageable ) {
        return tournamentRepository.findAll( pageable );
    }

    @Override
    public Tournament add( Tournament o ) {
        return tournamentRepository.save( o );
    }

    @Override
    public Tournament update( Tournament o, int id ) throws ResourceNotFoundException {

        Tournament oldTournament = checkIfIdIsPresentAndReturnTournament( id );
        return tournamentRepository.save( oldTournament );
    }

    @Override
    public Tournament getById( int id ) throws ResourceNotFoundException {
        return checkIfIdIsPresentAndReturnTournament( id );
    }

    @Override
    public Tournament deleteById( int id ) throws ResourceNotFoundException {
        Tournament tournament = checkIfIdIsPresentAndReturnTournament( id );
        tournamentRepository.deleteById( id );
        return tournament;
    }

    private Tournament checkIfIdIsPresentAndReturnTournament( int id ) {
        if ( !tournamentRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Tournament id=" + id + " not found" );
        else
            return tournamentRepository.findById( id ).get();
    }

    private User checkIfIdIsPresentAndReturnUser( int id ) {
        if ( !userRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " User id = " + id + " not found" );
        else
            return userRepository.findById( id ).get();
    }
}
