package xyz.ssbracket.Service;

import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Repository.UserRepository;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@SuppressWarnings("unchecked")
@Service
@NoArgsConstructor
public class UserServiceImp extends UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<User> getAll(Pageable pageable ) {
        return userRepository.findAll( pageable );
    }

    @Override
    public User add(User o ) {
        return userRepository.save( o );
    }

    @Override
    public User update( User o, int id ) {
        User user = checkIfIdIsPresentAndReturnUser( id );
        return userRepository.save( user );
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
}
