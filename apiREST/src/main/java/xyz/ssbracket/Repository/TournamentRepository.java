package com.example.apiREST.Repository;

import com.example.apiREST.Model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TournamentRepository extends JpaRepository<Tournament,Integer> {

}
