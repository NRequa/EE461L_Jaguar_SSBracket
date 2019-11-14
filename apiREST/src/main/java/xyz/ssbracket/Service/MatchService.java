package xyz.ssbracket.Service;

import xyz.ssbracket.Model.MatchResult;

public abstract class MatchService implements MainService<MatchResult> {
    public abstract MatchResult updateUsers( MatchResult o, int id );
}
