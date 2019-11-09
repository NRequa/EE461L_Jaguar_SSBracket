package xyz.ssbracket.Service;

import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;

public abstract class UserService implements MainService<User> {
    public abstract User addMatch(MatchResult matchResult, int id);
}
