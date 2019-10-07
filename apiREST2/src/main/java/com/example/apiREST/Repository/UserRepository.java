package com.example.apiREST.Repository;

import com.example.apiREST.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User,Integer> {

}
