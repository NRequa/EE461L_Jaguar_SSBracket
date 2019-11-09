package xyz.ssbracket.Service;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.TournamentArray;
import xyz.ssbracket.Repository.UserRepository;
import xyz.ssbracket.Repository.TournamentRepository;
import xyz.ssbracket.Repository.TournamentArrayRepository;
import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Exception.DuplicateResourceFoundException;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@SuppressWarnings("unchecked")
@Service
public class TournamentServiceImp extends TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TournamentArrayRepository tournamentArrayRepository;

    @Override
    public Page<Tournament> getAll( Pageable pageable ) {
        return tournamentRepository.findAll( pageable );
    }

    @Override
    public Tournament add( Tournament o ) {
    	int id = o.getId();
      String tname = o.getTname();
    	if ( tournamentRepository.findById( id ).isPresent() )
    		throw new DuplicateResourceFoundException( " Tournament id = " + id + " already exists" );
    	else {
        Tournament returnTournament = tournamentRepository.save(o);
        TournamentArray storingTournament = new TournamentArray(returnTournament.getId(), tname);
        tournamentArrayRepository.save(storingTournament);
        return returnTournament;
      }

    }

    //maybe changes are needed
    @Override
    public Tournament update( Tournament o, int id ) throws ResourceNotFoundException {
        Tournament oldTournament = checkIfIdIsPresentAndReturnTournament( id );
        return tournamentRepository.save( oldTournament );
    }

    @Override
    public Tournament addUsers( User o, int id ) throws ResourceNotFoundException {
        Tournament oldTournament = checkIfIdIsPresentAndReturnTournament( id );
        User newUser = checkIfIdIsPresentAndReturnUser(o.getId());
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(id);
        if(!oldTournament.getUsers().contains(newUser)){
          storingTournament.getUsersarray().add(newUser);
          oldTournament.getUsers().add(newUser);
        }
        tournamentArrayRepository.save(storingTournament);
        return tournamentRepository.save( oldTournament );
    }

    @Override
    public Tournament deleteUsers( User o, int id ) throws ResourceNotFoundException {
        Tournament oldTournament = checkIfIdIsPresentAndReturnTournament( id );
        User removalUser = checkIfIdIsPresentAndReturnUser(o.getId());
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(id);
        if(oldTournament.getUsers().contains(removalUser)){
            storingTournament.getUsersarray().remove(removalUser);
            oldTournament.getUsers().remove(removalUser);
        }
        tournamentArrayRepository.save(storingTournament);
        return tournamentRepository.save( oldTournament );
    }


    @Override
    public Tournament getById( int id ) throws ResourceNotFoundException {
        return checkIfIdIsPresentAndReturnTournament( id );
    }

    @Override
    public Tournament deleteById( int id ) throws ResourceNotFoundException {
        Tournament tournament = checkIfIdIsPresentAndReturnTournament( id );
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(id);
        storingTournament.getUsersarray().clear();
        tournamentArrayRepository.deleteById(id);
        tournament.getUsers().clear();
        tournamentRepository.deleteById( id );
        return tournament;
    }

    private Tournament checkIfIdIsPresentAndReturnTournament( int id ) {
        if ( !tournamentRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
        else
            return tournamentRepository.findById( id ).get();
    }

    private User checkIfIdIsPresentAndReturnUser( int id ) {
        if ( !userRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " User id = " + id + " not found" );
        else
            return userRepository.findById( id ).get();
    }

    private TournamentArray checkIfIdIsPresentAndReturnArrayTournament( int id ){
      if ( !tournamentArrayRepository.findById( id ).isPresent() ){
          throw new ResourceNotFoundException( "This tournament may have been made before changes to database and might not have necessary data associated." );
      } else {
          return tournamentArrayRepository.findById( id ).get();
      }
    }
}
