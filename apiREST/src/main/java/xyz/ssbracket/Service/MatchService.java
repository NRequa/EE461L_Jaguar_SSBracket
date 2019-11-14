package xyz.ssbracket.Service;

import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import xyz.ssbracket.Model.MatchResult;

public abstract class MatchService implements MainService<MatchResult> {
    public abstract MatchResult updateUsers( MatchResult o, int id );
    public abstract MatchResult addGuestUser( MatchResult o );
    public abstract MatchResult updateP1String( MatchResult o, int id);
    public abstract MatchResult updateP2String( MatchResult o, int id);
}
