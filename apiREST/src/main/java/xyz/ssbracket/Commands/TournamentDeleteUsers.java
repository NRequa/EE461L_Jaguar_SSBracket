package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.*;
import xyz.ssbracket.Exception.*;
import java.util.List;
import java.util.ArrayList;


public class TournamentDeleteUsers extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private TournamentArrayRepository tournamentArrayRepository;
  private UserRepository userRepository;
  private User o;
  private int id;

  public TournamentDeleteUsers(TournamentRepository tournamentRepository, TournamentArrayRepository tournamentArrayRepository,UserRepository userRepository, User o, int id){
    this.tournamentRepository = tournamentRepository;
    this.tournamentArrayRepository = tournamentArrayRepository;
    this.userRepository = userRepository;
    this.o = o;
    this.id = id;
  }

  @Override
  public Tournament execute(){
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
