package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Exception.ResourceNotFoundException;


public class TournamentGetId extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private int id;

  public TournamentGetId(TournamentRepository tournamentRepository, int id){
    this.tournamentRepository = tournamentRepository;
    this.id = id;
  }

  @Override
  public Tournament execute(){
    if ( !tournamentRepository.findById( id ).isPresent() )
        throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
    else
        return tournamentRepository.findById( id ).get();
  }
}
