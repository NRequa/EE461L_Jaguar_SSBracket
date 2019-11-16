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
import xyz.ssbracket.Repository.MatchResultRepository;
import xyz.ssbracket.Repository.TournamentRepository;
import xyz.ssbracket.Repository.UserRepository;

@Service
public class MatchServiceImp extends MatchService {

    @Autowired
    private MatchResultRepository matchResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

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

    public MatchResult updateUser1( MatchResult o, int id)throws ResourceNotFoundException{
      MatchResult oldMatchResult = getById( id );
      oldMatchResult.setHigherseed(checkIfIdIsPresentAndReturnUser(o.getPlayer1()));
      oldMatchResult.setPlayer1(o.getPlayer1());
      oldMatchResult.setPlayer1string(o.getPlayer1string());
      oldMatchResult.setOngoing(o.isOngoing());
      return matchResultRepository.save(oldMatchResult);
    };
    public MatchResult updateUser2( MatchResult o, int id)throws ResourceNotFoundException{
      MatchResult oldMatchResult = getById( id );
      oldMatchResult.setLowerseed(checkIfIdIsPresentAndReturnUser(o.getPlayer2()));
      oldMatchResult.setPlayer2(o.getPlayer2());
      oldMatchResult.setPlayer2string(o.getPlayer2string());
      oldMatchResult.setOngoing(o.isOngoing());
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
}
