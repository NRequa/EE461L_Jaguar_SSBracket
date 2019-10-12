package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TournamentRepository extends JpaRepository<Tournament,Integer> {

}
