package xyz.ssbracket.Service;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.TournamentArray;
import xyz.ssbracket.Model.MatchResult;
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
import java.util.List;
import java.util.ArrayList;

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
    public Page<Tournament> searchTournamentName( Pageable page, Tournament tname ) {
        return tournamentRepository.findByTname(tname.getTname(), page);
    }

    @Override
    public Tournament add( Tournament o ) throws ResourceNotFoundException{
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
      int id[]=new int[usernames.length];
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
      int seed[]=seeding(o.getTsize());
      for(int i=0;i<o.getTsize/2;i++){
         int sd1=seed[i*2];
         int sd2=seed[i*2+1];
         String player1="";
         String player2="";
         if(sd1<=usernames.length){
           player1=username[sd1-1];
         }
         if(sd2<=username.length){
           player2=username[sd2-1];
         }
         //create a match, add users, and add to the tournament
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

    @Override
    public Tournament setChampion(Tournament myTournamentRequest, int id)throws ResourceNotFoundException {
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
    };

    @Override
    public Tournament addVisit(int id) throws ResourceNotFoundException{
      Tournament tournament = checkIfIdIsPresentAndReturnTournament( id );
      tournament.setVisits(tournament.getVisits()+1);
      return tournamentRepository.save(tournament);
    }

    @Override
    public Tournament handleCloseTournament(Tournament myTournamentRequest, int id) throws ResourceNotFoundException{
      Tournament tournament = checkIfIdIsPresentAndReturnTournament(id);

      if(myTournamentRequest.isClosed()&&!tournament.isClosed()){
        tournament = handleCloseTournamentHelper(tournament);
        tournament.setClosed(true);
      } /*else {
        if(!myTournamentRequest.isClosed()){
          throw new ResourceNotFoundException("Request to change closed tournament state to not closed was not found");
        }
        if(tournament.isClosed()){
          throw new ResourceNotFoundException("Tournament is already closed");
        }
      }*/
      return tournamentRepository.save(tournament);
    };

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
