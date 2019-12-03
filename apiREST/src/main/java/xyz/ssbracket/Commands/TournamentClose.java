package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.*;
import xyz.ssbracket.Exception.ResourceNotFoundException;
import java.util.List;
import java.util.ArrayList;


public class TournamentClose extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private int id;
  private Tournament myTournamentRequest;

  public TournamentClose(TournamentRepository tournamentRepository, int id, Tournament myTournamentRequest){
    this.tournamentRepository = tournamentRepository;
    this.id = id;
    this.myTournamentRequest = myTournamentRequest;
  }

  @Override
  public Tournament execute(){
    Tournament tournament = checkIfIdIsPresentAndReturnTournament(id);

    if(myTournamentRequest.isClosed()&&!tournament.isClosed()){
      tournament = handleCloseTournamentHelper(tournament);
      tournament.setClosed(true);
    }
    return tournamentRepository.save(tournament);
  }

  private Tournament handleCloseTournamentHelper(Tournament tournament){
    List<MatchResult> matches = tournament.getMatchResults();
    int maxround = 0;
    int power = 1;
    while((matches.size()/power)>=1){
      power = power*2;
      maxround++;
    }
    System.out.println(maxround);
    for(MatchResult eachMatch: matches){
      String player1 = eachMatch.getPlayer1string();
      String player2 = eachMatch.getPlayer2string();
      System.out.println(player1);
      System.out.println(player2);
    }
    int indexFinder = tournament.getTsize();
    int currentIndex = 0;
    int endIndex = 0;
    for(int i = 0;i<indexFinder/2;i++){
      matches.get(i).setOngoing(true);
    }
    for(int currentRound = 1; currentRound<=maxround;currentRound++){
      System.out.println("current round is: "+currentRound);
      indexFinder = indexFinder/2;
      endIndex = endIndex+indexFinder;
      int nextMatchIncrement = indexFinder;
      boolean isLowerSeed = false;
      for(int i = currentIndex;i<endIndex;i++){
        matches.get(i).setLevel(currentRound);
        if(isLowerSeed ){
          nextMatchIncrement--;
        }
        int nextMatch = i+nextMatchIncrement;
        if(nextMatch>=matches.size()){
          System.out.println("Last match reached");
          continue;
        }
        System.out.println("Current match:" +currentIndex + " Next match: "+ nextMatch);
        if(matches.get(i).getPlayer1string().equals("Bye")&&matches.get(i).getPlayer2string().equals("Bye")){
          System.out.println("Both are byes");
          matches.get(i).setOngoing(false);
          matches.get(nextMatch).setOngoing(false);
          if(isLowerSeed){
            matches.get(nextMatch).setPlayer2string("Bye");
          } else {
            matches.get(nextMatch).setPlayer1string("Bye");
          }
        } else if(matches.get(i).getPlayer1string().equals("Bye")){
          System.out.println("Player1 is bye");
          matches.get(i).setOngoing(false);
          if(isLowerSeed){
            matches.get(nextMatch).setPlayer2string(matches.get(i).getPlayer2string());
            matches.get(nextMatch).setPlayer2(matches.get(i).getPlayer2());
            matches.get(nextMatch).setP2characterplayed(matches.get(i).getP2characterplayed());
            matches.get(nextMatch).setLowerseed(matches.get(i).getLowerseed());
            if(!matches.get(nextMatch).getPlayer1string().equals("")&&!matches.get(nextMatch).getPlayer1string().equals("Bye")){
              matches.get(nextMatch).setOngoing(true);
            } else {
              matches.get(nextMatch).setOngoing(false);
            }
          } else {
            matches.get(nextMatch).setPlayer1string(matches.get(i).getPlayer2string());
            matches.get(nextMatch).setPlayer1(matches.get(i).getPlayer2());
            matches.get(nextMatch).setP1characterplayed(matches.get(i).getP2characterplayed());
            matches.get(nextMatch).setHigherseed(matches.get(i).getLowerseed());
            if(!matches.get(nextMatch).getPlayer2string().equals("")&&!matches.get(nextMatch).getPlayer2string().equals("Bye")){
              matches.get(nextMatch).setOngoing(true);
            } else {
              matches.get(nextMatch).setOngoing(false);
            }
          }
        } else if(matches.get(i).getPlayer2string().equals("Bye")){
          System.out.println("Player2 is bye");
          matches.get(i).setOngoing(false);
          if(isLowerSeed){
            matches.get(nextMatch).setPlayer2string(matches.get(i).getPlayer1string());
            matches.get(nextMatch).setPlayer2(matches.get(i).getPlayer1());
            matches.get(nextMatch).setP2characterplayed(matches.get(i).getP1characterplayed());
            matches.get(nextMatch).setLowerseed(matches.get(i).getHigherseed());
            if(!matches.get(nextMatch).getPlayer1string().equals("")&&!matches.get(nextMatch).getPlayer1string().equals("Bye")){
              matches.get(nextMatch).setOngoing(true);
            } else {
              matches.get(nextMatch).setOngoing(false);
            }
          } else {
            matches.get(nextMatch).setPlayer1string(matches.get(i).getPlayer1string());
            matches.get(nextMatch).setPlayer1(matches.get(i).getPlayer1());
            matches.get(nextMatch).setP1characterplayed(matches.get(i).getP1characterplayed());
            matches.get(nextMatch).setHigherseed(matches.get(i).getHigherseed());
            if(!matches.get(nextMatch).getPlayer2string().equals("")&&!matches.get(nextMatch).getPlayer2string().equals("Bye")){
              matches.get(nextMatch).setOngoing(true);
            } else {
              matches.get(nextMatch).setOngoing(false);
            }
          }
        }
        currentIndex++;
        if(isLowerSeed ){
          isLowerSeed =false;
        } else{
          isLowerSeed =true;
        }
      }
    }
    return tournament;
  }

  private Tournament checkIfIdIsPresentAndReturnTournament( int id ) {
      if ( !tournamentRepository.findById( id ).isPresent() )
          throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
      else
          return tournamentRepository.findById( id ).get();
  }
}
