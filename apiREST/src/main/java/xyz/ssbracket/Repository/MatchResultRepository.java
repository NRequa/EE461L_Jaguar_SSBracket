package xyz.ssbracket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.ssbracket.Model.MatchResult;

public interface MatchResultRepository extends JpaRepository<MatchResult,Integer> {

}
