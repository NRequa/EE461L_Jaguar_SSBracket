package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Exception.ResourceNotFoundException;


public class TournamentAddVisit extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private int id;

  public TournamentAddVisit(TournamentRepository tournamentRepository, int id){
    this.tournamentRepository = tournamentRepository;
    this.id = id;
  }

  @Override
  public Tournament execute(){
    Tournament tournament = checkIfIdIsPresentAndReturnTournament( id );
    tournament.setVisits(tournament.getVisits()+1);
    return tournamentRepository.save(tournament);
  }

  private Tournament checkIfIdIsPresentAndReturnTournament( int id ) {
      if ( !tournamentRepository.findById( id ).isPresent() )
          throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
      else
          return tournamentRepository.findById( id ).get();
  }
}
