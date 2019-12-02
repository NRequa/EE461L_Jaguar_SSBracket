package xyz.ssbracket.Service;

import xyz.ssbracket.Exception.ResourceNotFoundException;

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

@SuppressWarnings("unchecked")
@Service
@NoArgsConstructor
public class AccountServiceImp extends AccountService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountsRepository accountsRepository;

    @Override
    public Page<Accounts> getAll(Pageable pageable) { return null; }

    @Override
    public Accounts add(Accounts o) { return null; }

    @Override
    public Accounts update(Accounts o, int id) { return null; }

    @Override
    public Accounts getById( int id ) {
        return checkIfIdIsPresentAndReturnAccounts( id );
    }

    @Override
    public Accounts deleteById(int id) { return null; }

    public int updatePassword( int id, AccountSubmission o ) {
        Accounts oldUser = checkIfIdIsPresentAndReturnAccounts( id );
        oldUser.setPassword(o.getPassword());
        accountsRepository.save( oldUser );
        return 1;
    }

    public LogInResult attemptSignIn( AccountSubmission signInAttempt ) {
        String username = signInAttempt.getUsername();
        String password = signInAttempt.getPassword();
        Accounts existingUser = accountsRepository.findAccountsByUsername(username);
        if( existingUser == null ){
            return new LogInResult(-1, -1, false);
        }
        else {
            boolean attemptStatus = existingUser.getPassword().equals(password);
            User linkedUser = userRepository.findByUsername(username);
            int Id = linkedUser.getId();
            int accId = existingUser.getId();
            return new LogInResult( Id, accId, attemptStatus );
        }
    }

    public LogInResult registerAccount ( AccountSubmission registerAttempt ) {
        String username = registerAttempt.getUsername();
        String password = registerAttempt.getPassword();

        Accounts existingUser = accountsRepository.findAccountsByUsername(username);

        if(existingUser == null){
            User newUser = new User(username, 0,0,0,0,0);
            Accounts newAccount = new Accounts(username, password, newUser);
            accountsRepository.save(newAccount);
            LogInResult response = new LogInResult(newUser.getId(), newAccount.getId(), true);
            return response;
        }

        else{
            return new LogInResult(-1, -1, false);
        }
    }

    private Accounts checkIfIdIsPresentAndReturnAccounts( int id ) {
        if ( !accountsRepository.findById( id ).isPresent() )
            throw new ResourceNotFoundException( " Account id = " + id + " not found" );
        else
            return accountsRepository.findById( id ).get();
    }
}