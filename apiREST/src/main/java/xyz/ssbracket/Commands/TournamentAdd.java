package xyz.ssbracket.Commands;

import xyz.ssbracket.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.ssbracket.Model.*;
import xyz.ssbracket.Exception.*;
import java.util.List;
import java.util.ArrayList;


public class TournamentAdd extends MainCommand<Tournament>{

  private TournamentRepository tournamentRepository;
  private TournamentArrayRepository tournamentArrayRepository;
  private UserRepository userRepository;
  private MatchResultRepository matchResultRepository;
  private Tournament o;

  public TournamentAdd(TournamentRepository tournamentRepository, TournamentArrayRepository tournamentArrayRepository, Tournament o,UserRepository userRepository, MatchResultRepository matchResultRepository){
    this.tournamentRepository = tournamentRepository;
    this.tournamentArrayRepository = tournamentArrayRepository;
    this.userRepository = userRepository;
    this.matchResultRepository = matchResultRepository;
    this.o = o;
  }

  @Override
  public Tournament execute(){
    int id = o.getId();
    int creatorId = Integer.parseInt(o.getTcreator());
    User creatorUser = checkIfIdIsPresentAndReturnUser(creatorId);
    String tname = o.getTname();
    if ( tournamentRepository.findById( id ).isPresent() )
      throw new DuplicateResourceFoundException( " Tournament id = " + id + " already exists" );
    else {
      creatorUser.setNumtournamentscreated(creatorUser.getNumtournamentscreated()+1);
      Tournament returnTournament = tournamentRepository.save(o);
      TournamentArray storingTournament = new TournamentArray(returnTournament.getId(), tname, returnTournament.getChampionname());
      tournamentArrayRepository.save(storingTournament);
      returnTournament = addUsersStringToTournament(o.getTempplayers(), returnTournament);
      return tournamentRepository.save(returnTournament);
    }
  }

  private Tournament addUsersStringToTournament(String usersString, Tournament o){
    String usernames[] = usersString.split("\n");
    int id[]=new int[o.getTsize()];
    for(int i = 0; i<o.getTsize();i++){
      id[i] = 17;
    }
    for(int i = 0; i<usernames.length; i++) {
      System.out.println(usernames[i]);
      try {
        User participant = userRepository.findByUsername(usernames[i]);
        if(participant==null){
          System.out.println("A user not found");
          id[i]=17;
          continue;
        }
        else{
          id[i]=participant.getId();
        }
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(o.getId());
        if(!o.getUsers().contains(participant)){
          participant.setNumtournamentsparticipated(participant.getNumtournamentsparticipated()+1);
          storingTournament.getUsersarray().add(participant);
          o.getUsers().add(participant);
        }
      } catch (Exception e){
        continue;
      }
    }
    ArrayList<Integer> seed=seeding(o.getTsize());
    System.out.println("seed: "+seed);
    for(int i=0;i<o.getTsize()/2;i++){
      int sd1=seed.get(i*2);
      int sd2=seed.get(i*2+1);
      System.out.println("my index is: " + i + "| seed1: " + sd1 + "| seed2: " + sd2);
      String player1="Bye";
      String player2="Bye";
      int id1 = 17;
      int id2 = 17;
      if(sd1<=usernames.length){
        player1=usernames[sd1-1];
        id1 = id[sd1-1];
      }
      if(sd2<=usernames.length){
        player2=usernames[sd2-1];
        id2 = id[sd2-1];
      }
      User user1 = checkIfIdIsPresentAndReturnUser(id1);
      User user2 = checkIfIdIsPresentAndReturnUser(id2);

      System.out.println("player1 is: " + player1 + "| id1 is: " + id1 + "|player2 is: " + player2 + "| id2 is: " + id2);
      System.out.println("tournament id is: "+o.getId());
      System.out.println("User is: "+ user1.getUsername());
      //create a match, add users, and add to the tournament
      MatchResult match1 = new MatchResult(user1, id1, player1, user2, id2, player2, o.getId(), 1,o);
      o.getMatchResults().add(match1);
      //matchResultRepository.save(match1);

    }
    int counter = o.getTsize()/2;
    while(!(counter==1)){
      counter = counter/2;
      int tempPlayId = 17;
      User userTemp = checkIfIdIsPresentAndReturnUser(tempPlayId);
      for(int i=0; i<counter; i++){
        MatchResult match2 = new MatchResult(userTemp, tempPlayId,"",userTemp,tempPlayId,"",o.getId(),1,o);
        o.getMatchResults().add(match2);
      }
    }
    return o;
  }

  private static ArrayList seeding(int tourSize){
    int rounds = (int)(Math.log(tourSize)/Math.log(2))-1;
    ArrayList <Integer> place=new ArrayList<Integer>();
    place.add(1);
    place.add(2);
    for(int i=0;i<rounds;i++){
      place=nextLayer(place);
    }
    return place;
  }

  private static ArrayList nextLayer(ArrayList<Integer> place){
    ArrayList <Integer> output=new ArrayList<Integer>();
    Integer length =new Integer(place.size()*2+1);
    for(Integer i:place){
      output.add(i);
      output.add(length-i);
    }
    return output;
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
