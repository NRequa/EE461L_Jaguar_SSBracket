package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface FriendRepository extends JpaRepository<Friends,Integer> {

}
