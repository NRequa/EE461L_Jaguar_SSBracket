package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.*;
import xyz.ssbracket.Exception.*;
import java.util.List;
import java.util.ArrayList;


public class TournamentSetChampion extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private TournamentArrayRepository tournamentArrayRepository;
  private UserRepository userRepository;
  private Tournament myTournamentRequest;
  private int id;

  public TournamentSetChampion(TournamentRepository tournamentRepository, TournamentArrayRepository tournamentArrayRepository,UserRepository userRepository, Tournament o,int id){
    this.tournamentRepository = tournamentRepository;
    this.tournamentArrayRepository = tournamentArrayRepository;
    this.userRepository = userRepository;
    this.myTournamentRequest = o;
    this.id = id;
  }

  @Override
  public Tournament execute(){
    Tournament tournament = checkIfIdIsPresentAndReturnTournament( id );
    TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(id);
    String myChampion = myTournamentRequest.getChampionname();
    tournament.setChampionname(myChampion);
    storingTournament.setChampionname(myChampion);
    try {
      User championUser = userRepository.findByUsername(myChampion);
      championUser.setNumtournamentswon(championUser.getNumtournamentswon()+1);
    } catch(Exception e){
      //Do nothing if User with the name of the champion is not found. Probably a guest user
    }
    tournamentArrayRepository.save(storingTournament);
    return tournamentRepository.save(tournament);
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
