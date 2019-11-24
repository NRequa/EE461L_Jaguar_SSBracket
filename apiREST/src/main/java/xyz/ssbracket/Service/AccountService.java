package xyz.ssbracket.Service;

import xyz.ssbracket.Model.*;

public abstract class AccountService implements MainService<Accounts> {
    public abstract int updatePassword( int id , AccountSubmission o );
    public abstract Accounts getFriends( String id );
    public abstract LogInResult attemptSignIn( AccountSubmission signInAttempt );
    public abstract LogInResult registerAccount ( AccountSubmission registerAttempt );
}