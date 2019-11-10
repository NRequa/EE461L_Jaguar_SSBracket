package xyz.ssbracket.Service;

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
            o.setUser(checkIfIdIsPresentAndReturnUser(o.getPlayer()));
            Tournament t = checkIfIdIsPresentAndReturnTournament(o.getTournament());
            MatchResult returnMatchResult = matchResultRepository.save(o);
            return returnMatchResult;
        }
    }

    @Override
    public MatchResult update( MatchResult o, int id ) throws ResourceNotFoundException {
        MatchResult oldMatchResult = checkIfIdIsPresentAndReturnMatchResult( id );
        return matchResultRepository.save( oldMatchResult );
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
