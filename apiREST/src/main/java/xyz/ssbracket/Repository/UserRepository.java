package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Integer> {
  @Query( value = "SELECT * FROM users WHERE username= :userName",
          nativeQuery = true)
  User findUserByName(@Param("userName") String userName);
}
