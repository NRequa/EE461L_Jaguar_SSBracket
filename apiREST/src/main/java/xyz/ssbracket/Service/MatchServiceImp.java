package xyz.ssbracket.Service;

import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import xyz.ssbracket.Exception.DuplicateResourceFoundException;
import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.TournamentArray;
import xyz.ssbracket.Model.Friends;
import xyz.ssbracket.Repository.MatchResultRepository;
import xyz.ssbracket.Repository.TournamentRepository;
import xyz.ssbracket.Repository.UserRepository;
import xyz.ssbracket.Repository.TournamentArrayRepository;
import xyz.ssbracket.Repository.FriendRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchServiceImp extends MatchService {

    @Autowired
    private MatchResultRepository matchResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TournamentArrayRepository tournamentArrayRepository;

    @Autowired
    private FriendRepository friendRepository;

    @Override
    public Page<MatchResult> getAll(Pageable pageable ) {
        return matchResultRepository.findAll( pageable );
    }

    @Override
    public MatchResult add( MatchResult o ) {
        int id = o.getId();
        if ( matchResultRepository.findById( id ).isPresent() )
            throw new DuplicateResourceFoundException( " MatchResult id = " + id + " already exists" );
        else {
            o.setHigherseed(checkIfIdIsPresentAndReturnUser(o.getPlayer1()));
            o.setLowerseed(checkIfIdIsPresentAndReturnUser(o.getPlayer2()));
            o.setTournament(checkIfIdIsPresentAndReturnTournament(o.getEvent()));
            o.setPlayer1string(o.getHigherseed().getUsername());
            o.setPlayer2string(o.getLowerseed().getUsername());
            MatchResult returnMatchResult = matchResultRepository.save(o);
            return returnMatchResult;
        }
    }

    @Override
    public MatchResult addGuestUser( MatchResult o ) {
        int id = o.getId();
        if ( matchResultRepository.findById( id ).isPresent() )
            throw new DuplicateResourceFoundException( " MatchResult id = " + id + " already exists" );
        else {
            o.setTournament(checkIfIdIsPresentAndReturnTournament(o.getEvent()));
            MatchResult returnMatchResult = matchResultRepository.save(o);
            return returnMatchResult;
        }
    }

    @Override
    public MatchResult update( MatchResult o, int id ) throws ResourceNotFoundException {
        MatchResult oldMatchResult = getById( id );
        oldMatchResult.setP1win(o.isP1win());
        oldMatchResult.setCompleted(o.isCompleted());
        if(o.isCompleted()){
          boolean player1IsPlayer = false;
          boolean player2IsPlayer = false;
          User player1 = null;
          User player2 = null;
          try{
            player1 = checkIfIdIsPresentAndReturnUser(oldMatchResult.getPlayer1());
            player1IsPlayer = true;
            if(o.isP1win()){
              player1.setNumwins(player1.getNumwins()+1);
            }
            player1.setNumgamesplayed(player1.getNumgamesplayed()+1);
          } catch (ResourceNotFoundException e){
            //do nothing
          }
          try{
            player2 = checkIfIdIsPresentAndReturnUser(oldMatchResult.getPlayer2());
            player2IsPlayer = true;
            if(!o.isP1win()){
              player2.setNumwins(player2.getNumwins()+1);
            }
            player2.setNumgamesplayed(player2.getNumgamesplayed()+1);
          } catch (ResourceNotFoundException e){
            //do nothing
          }
          if(player1IsPlayer&&player2IsPlayer){
            List<Friends> player1Friends = player1.getMyfriends();
            List<Friends> player2Friends = player2.getMyfriends();
            for(Friends friend : player1Friends){
              if(friend.getFriendsname().equals(player2.getUsername())){
                if(o.isP1win()){
                  friend.setTotalwins(friend.getTotalwins()+1);
                } else{
                  friend.setTotallosses(friend.getTotallosses()+1);
                }
                friendRepository.save(friend);
              }
            }

            for(Friends friend : player2Friends){
              if(friend.getFriendsname().equals(player1.getUsername())){
                if(o.isP1win()){
                  friend.setTotallosses(friend.getTotallosses()+1);
                } else{
                  friend.setTotalwins(friend.getTotalwins()+1);
                }
                friendRepository.save(friend);
              }
            }

          }
        }
        oldMatchResult.setP1roundswon(o.getP1roundswon());
        oldMatchResult.setP2roundswon(o.getP2roundswon());
        oldMatchResult.setOngoing(o.isOngoing());
        return matchResultRepository.save( oldMatchResult );
    }

    @Override
    public MatchResult updateUsers( MatchResult o, int id) throws ResourceNotFoundException{
        MatchResult oldMatchResult = getById( id );
        oldMatchResult.setHigherseed(checkIfIdIsPresentAndReturnUser(o.getPlayer1()));
        oldMatchResult.setLowerseed(checkIfIdIsPresentAndReturnUser(o.getPlayer2()));
        oldMatchResult.setPlayer1(o.getPlayer1());
        oldMatchResult.setPlayer2(o.getPlayer2());
        oldMatchResult.setPlayer1string(o.getPlayer1string());
        oldMatchResult.setPlayer2string(o.getPlayer2string());
        oldMatchResult.setOngoing(o.isOngoing());
        return matchResultRepository.save(oldMatchResult);
    }

    public MatchResult updateUser1( MatchResult o, int id) throws ResourceNotFoundException{
      MatchResult oldMatchResult = getById( id );
      oldMatchResult.setHigherseed(checkIfIdIsPresentAndReturnUser(o.getPlayer1()));
      oldMatchResult.setPlayer1(o.getPlayer1());
      oldMatchResult.setPlayer1string(o.getPlayer1string());
      oldMatchResult.setOngoing(o.isOngoing());
      Tournament myTournament = checkIfIdIsPresentAndReturnTournament(oldMatchResult.getEvent());
      if(!myTournament.isClosed()){
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(oldMatchResult.getEvent());
        try{
          User participant = checkIfIdIsPresentAndReturnUser(o.getPlayer1());
          participant.setNumtournamentsparticipated(participant.getNumtournamentsparticipated()+1);
          if(!myTournament.getUsers().contains(participant)){
            storingTournament.getUsersarray().add(participant);
            myTournament.getUsers().add(participant);
            tournamentArrayRepository.save(storingTournament);
            tournamentRepository.save(myTournament);
          }
        } catch (Exception e){
          System.out.println("username probably not found");
        }
      }
      return matchResultRepository.save(oldMatchResult);
    };
    public MatchResult updateUser2( MatchResult o, int id)throws ResourceNotFoundException{
      MatchResult oldMatchResult = getById( id );
      oldMatchResult.setLowerseed(checkIfIdIsPresentAndReturnUser(o.getPlayer2()));
      oldMatchResult.setPlayer2(o.getPlayer2());
      oldMatchResult.setPlayer2string(o.getPlayer2string());
      oldMatchResult.setOngoing(o.isOngoing());
      Tournament myTournament = checkIfIdIsPresentAndReturnTournament(oldMatchResult.getEvent());
      if(!myTournament.isClosed()){
        TournamentArray storingTournament = checkIfIdIsPresentAndReturnArrayTournament(oldMatchResult.getEvent());
        try{
          User participant = checkIfIdIsPresentAndReturnUser(o.getPlayer2());
          participant.setNumtournamentsparticipated(participant.getNumtournamentsparticipated()+1);
          if(!myTournament.getUsers().contains(participant)){
            storingTournament.getUsersarray().add(participant);
            myTournament.getUsers().add(participant);
            tournamentArrayRepository.save(storingTournament);
            tournamentRepository.save(myTournament);
          }
        } catch (Exception e){
          System.out.println("username probably not found");
        }
      }
      return matchResultRepository.save(oldMatchResult);
    };

    @Override
    public MatchResult updateP1String( MatchResult o, int id) throws ResourceNotFoundException{
        MatchResult oldMatchResult = getById( id );
        oldMatchResult.setPlayer1string(o.getPlayer1string());
        return matchResultRepository.save(oldMatchResult);
    }

    @Override
    public MatchResult updateP2String( MatchResult o, int id) throws ResourceNotFoundException{
        MatchResult oldMatchResult = getById( id );
        oldMatchResult.setPlayer2string(o.getPlayer2string());
        return matchResultRepository.save(oldMatchResult);
    }

    @Override
    public MatchResult updateCharsPlayed( MatchResult o, int id) throws ResourceNotFoundException{
        MatchResult oldMatchResult = getById( id );
        oldMatchResult.setP1characterplayed(o.getP1characterplayed());
        oldMatchResult.setP2characterplayed(o.getP2characterplayed());
        return matchResultRepository.save(oldMatchResult);
    }

    @Override
    public MatchResult getById( int id ) throws ResourceNotFoundException {
        return checkIfIdIsPresentAndReturnMatchResult( id );
    }

    @Override
    public MatchResult deleteById( int id ) throws ResourceNotFoundException {
        MatchResult matchResult = checkIfIdIsPresentAndReturnMatchResult( id );
        matchResultRepository.deleteById( id );
        return matchResult;
    }

    @Override
    public MatchResult updateChar1(MatchResult o, int id)throws ResourceNotFoundException{
      MatchResult matchResult = checkIfIdIsPresentAndReturnMatchResult( id );
      matchResult.setP1characterplayed(o.getP1characterplayed());
      return matchResultRepository.save(matchResult);
    };

    @Override
    public MatchResult updateChar2(MatchResult o, int id)throws ResourceNotFoundException{
      MatchResult matchResult = checkIfIdIsPresentAndReturnMatchResult( id );
      matchResult.setP2characterplayed(o.getP2characterplayed());
      return matchResultRepository.save(matchResult);
    };

    private MatchResult checkIfIdIsPresentAndReturnMatchResult( int id ) {
        if ( !matchResultRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Match id = " + id + " not found" );
        else
            return matchResultRepository.findById( id ).get();
    }

    private User checkIfIdIsPresentAndReturnUser(int id ) {
        if ( !userRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " User id = " + id + " not found" );
        else
            return userRepository.findById( id ).get();
    }

    private Tournament checkIfIdIsPresentAndReturnTournament( int id ){
        if ( !tournamentRepository.findById( id ).isPresent() ){
            throw new ResourceNotFoundException( " Tournament id =  " + id + " not found" );
        } else {
            return tournamentRepository.findById( id ).get();
        }
    }

    private TournamentArray checkIfIdIsPresentAndReturnArrayTournament( int id ){
      if ( !tournamentArrayRepository.findById( id ).isPresent() ){
          throw new ResourceNotFoundException( "This tournament may have been made before changes to database and might not have necessary data associated." );
      } else {
          return tournamentArrayRepository.findById( id ).get();
      }
    }
}
