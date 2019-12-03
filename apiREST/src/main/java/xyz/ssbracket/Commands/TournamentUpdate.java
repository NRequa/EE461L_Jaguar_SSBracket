package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Exception.ResourceNotFoundException;


public class TournamentUpdate extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private int id;
  private Tournament o;

  public TournamentUpdate(TournamentRepository tournamentRepository, int id, Tournament o){
    this.tournamentRepository = tournamentRepository;
    this.id = id;
    this.o = o;
  }

  @Override
  public Tournament execute(){
    if ( !tournamentRepository.findById( id ).isPresent() )
        throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
    else
        return tournamentRepository.save( o );
  }

}
