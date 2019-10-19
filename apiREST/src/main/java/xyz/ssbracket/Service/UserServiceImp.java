package xyz.ssbracket.Service;

import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Exception.DuplicateResourceFoundException;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Repository.UserRepository;
import xyz.ssbracket.Repository.TournamentRepository;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@SuppressWarnings("unchecked")
@Service
@NoArgsConstructor
public class UserServiceImp extends UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TournamentRepository tournamentRepository;

    @Override
    public Page<User> getAll( Pageable pageable ) {
        return userRepository.findAll( pageable );
    }

    @Override
    public User add( User o ) {
    	int id = o.getId();
    	if ( userRepository.findById( id ).isPresent() )
    		throw new DuplicateResourceFoundException( " User id = " + id + " already exists" );
    	else
    		return userRepository.save( o );
    }

    @Override
    public User update( User o, int id ) {
        User oldUser = checkIfIdIsPresentAndReturnUser( id );
        return userRepository.save( oldUser );
    }

    @Override
    public User getById( int id ) {
        return checkIfIdIsPresentAndReturnUser( id );
    }

    @Override
    public User deleteById( int id ) {
        User user = checkIfIdIsPresentAndReturnUser( id );
        userRepository.deleteById( id );
        return user;
    }

    private User checkIfIdIsPresentAndReturnUser( int id ) {
        if ( !userRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " User id = " + id + " not found" );
        else
            return userRepository.findById( id ).get();
    }

    private Tournament checkIfIdIsPresentAndReturnTournament( int id ) {
        if ( !tournamentRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Tournament id = " + id + " not found" );
        else
            return tournamentRepository.findById( id ).get();
    }
}
