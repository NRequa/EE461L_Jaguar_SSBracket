package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.*;
import xyz.ssbracket.Exception.*;
import java.util.List;
import java.util.ArrayList;


public class TournamentDeleteId extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private TournamentArrayRepository tournamentArrayRepository;
  private int id;

  public TournamentDeleteId(TournamentRepository tournamentRepository, TournamentArrayRepository tournamentArrayRepository, int id){
    this.tournamentRepository = tournamentRepository;
    this.tournamentArrayRepository = tournamentArrayRepository;
    this.id = id;
  }

  @Override
  public Tournament execute(){
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

  private TournamentArray checkIfIdIsPresentAndReturnArrayTournament( int id ){
    if ( !tournamentArrayRepository.findById( id ).isPresent() ){
        throw new ResourceNotFoundException( "This tournament may have been made before changes to database and might not have necessary data associated." );
    } else {
        return tournamentArrayRepository.findById( id ).get();
    }
  }
}
