package xyz.ssbracket.Repository;

import xyz.ssbracket.Model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts,Integer> {
    @query("SELECT * FROM accounts WHERE tname= :userName")
    Accounts findAccountsByName(@Param("userName") String userName);

}
