package xyz.ssbracket.Service;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;

public abstract class TournamentService implements MainService<Tournament> {
  public abstract Tournament addUsers( User o, int id );
  public abstract Tournament deleteUsers(User o, int id);
}
