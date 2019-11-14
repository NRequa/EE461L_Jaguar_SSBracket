package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TournamentRepository extends JpaRepository<Tournament,Integer> {
  Page<Tournament> findByTname(String tname, Pageable pageable);
}
