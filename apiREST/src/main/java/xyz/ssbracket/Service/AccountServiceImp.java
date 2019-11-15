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
public class AccountServiceImp extends AccountService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private AccountsRepository accountsRepository;
    @Autowired
    private FriendRepository friendRepository;

    @Override
    public Page<Accounts> getAll(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Accounts add(Accounts o) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Accounts update(Accounts o, int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Accounts getById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Accounts deleteById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public int updatePassword(int id, String newPass) {
        Accounts oldUser = checkIfIdIsPresentAndReturnAccounts( id );
        oldUser.setPassword(newPass);
        accountsRepository.save( oldUser );
        return 1;
    }


    private Accounts checkIfIdIsPresentAndReturnAccounts( int id ) {
        if ( !accountsRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " User id = " + id + " not found" );
        else
            return accountsRepository.findById( id ).get();
    }







 









}