package xyz.ssbracket.Service;

import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.Accounts;

public abstract class AccountService implements MainService<Accounts> {
    public abstract int updatePassword(int id, String pass );

  }