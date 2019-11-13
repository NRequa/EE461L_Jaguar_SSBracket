package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.ArrayList;

public interface TournamentRepository extends JpaRepository<Tournament,Integer> {
  @Query( value = "SELECT * FROM tournaments WHERE tname= :tName",
          nativeQuery = true)
  List<Tournament> findTournamentsByName(@Param("tName") String tName);
}
