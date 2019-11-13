package xyz.ssbracket.Service;

import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;

public abstract class UserService implements MainService<User> {
  public abstract User addFriend( User friend, int id );
  public abstract User deleteFriend(User friend, int id);
  public abstract User getByUsername(String username);
}
