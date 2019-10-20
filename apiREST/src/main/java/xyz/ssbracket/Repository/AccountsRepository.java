package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts,Integer> {
    @Query( value = "SELECT * FROM accounts WHERE tname= :userName",
            nativeQuery = true)
    Accounts findAccountsByName(@Param("userName") String userName);

}
