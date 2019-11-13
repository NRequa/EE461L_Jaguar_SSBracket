package xyz.ssbracket.Service;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public abstract class TournamentService implements MainService<Tournament> {
  public abstract Tournament addUsers( User o, int id );
  public abstract Tournament deleteUsers( User o, int id);
  public abstract Tournament addVisit(int id);
  public abstract List<Tournament> searchTournamentName( Tournament tname );

}
