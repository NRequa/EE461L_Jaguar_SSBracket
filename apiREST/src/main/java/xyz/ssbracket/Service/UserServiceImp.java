package xyz.ssbracket.Service;

import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Exception.DuplicateResourceFoundException;

import xyz.ssbracket.Model.*;

import xyz.ssbracket.Repository.UserRepository;
import xyz.ssbracket.Repository.TournamentRepository;
import xyz.ssbracket.Repository.AccountsRepository;
import xyz.ssbracket.Repository.FriendRepository;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
@Service
@NoArgsConstructor
public class UserServiceImp extends UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private AccountsRepository accountsRepository;
    @Autowired
    private FriendRepository friendRepository;

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

        //delete many to many between tournament and users
        List<Tournament> tournaments = user.getTournaments();
        for(Tournament tournament : tournaments){
          tournament.getUsers().remove(user);
        }

        //delete many to many between storage tournament and users that was made to avoid infinite loop
        List<TournamentArray> tournamentArray = user.getMytournaments();
        for(TournamentArray myTournament : tournamentArray){
          myTournament.getUsersarray().remove(user);
        }

        List<Friends> myFriends = user.getMyfriends();
        for(Friends friendRemoved : myFriends){
          User friendUser = checkIfIdIsPresentAndReturnUser(friendRemoved.getFriendsid());
          friendUser = deleteUserFriendFromUser(user, friendUser);
          userRepository.save(friendUser);
        }
        myFriends.clear();


        //delete one to one relationship between users and account
        Accounts myUser = user.getAccount();
        if(myUser != null){
          myUser.setMyuser(null);
          accountsRepository.deleteById(myUser.getId());
        }
        userRepository.deleteById( id );
        return user;
    }

    @Override
    public User addFriend( User friend, int id ) {
        User ownerUser = checkIfIdIsPresentAndReturnUser( id );
        User friendUser = userRepository.findUserByName(friend.getUsername());
        if(friendUser!=null){
          ownerUser = addUserFriendToUser(friendUser, ownerUser);
          friendUser = addUserFriendToUser(ownerUser,friendUser);
          userRepository.save(friendUser);
        }
        return userRepository.save( ownerUser );
    }

    @Override
    public User deleteFriend( User friend, int id ) {
        User ownerUser = checkIfIdIsPresentAndReturnUser( id );
        User friendUser = userRepository.findUserByName(friend.getUsername());
        if(friendUser!=null){
          ownerUser = deleteUserFriendFromUser(friendUser, ownerUser);
          friendUser = deleteUserFriendFromUser(ownerUser, friendUser);
          userRepository.save(friendUser);
        }
        return userRepository.save( ownerUser );
    }

    @Override
    public User getByUsername(String username){
      return userRepository.findUserByName(username);
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

    private Friends checkIfIdIsPresentAndReturnFriend( int id ) {
        if ( !friendRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Friend relation id = " + id + " not found" );
        else
            return friendRepository.findById( id ).get();
    }

    private User addUserFriendToUser(User friendUser, User ownerUser){
      if(!isAlreadyFriends(ownerUser, friendUser.getUsername())){
        Friends newFriend = new Friends(friendUser.getId(),friendUser.getUsername());
        Friends storingFriend = friendRepository.save(newFriend);
        ownerUser.getMyfriends().add(storingFriend);
      }
      return ownerUser;
    }

    private User deleteUserFriendFromUser(User friendUser, User ownerUser){
      List<Friends> friendsList = ownerUser.getMyfriends();
      List<Friends> friendToRemove = new ArrayList<>();
      for (Friends myFriend : friendsList){
        if(myFriend.getFriendsname().equals(friendUser.getUsername())){
          friendToRemove.add(myFriend);
          friendRepository.deleteById(myFriend.getId());
        }
      }
      for(Friends removedFriend : friendToRemove){
        friendsList.remove(removedFriend);
      }
      return ownerUser;
    }

    private boolean isAlreadyFriends( User ownerUser, String friendname ) {
      List<Friends> friendList = ownerUser.getMyfriends();
      for (Friends myFriend : friendList){
        if(myFriend.getFriendsname().equals(friendname)){
          return true;
        }
      }
      return false;
    }
}
