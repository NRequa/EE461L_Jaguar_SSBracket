package xyz.ssbracket.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "username", nullable = false)
    private String username;

    /*
    @Column(name = "numWins", nullable = false)
    private int numWins;

    @Column(name = "numTotalGames", nullable = false)
    private int numTotalGames;

    @Column(name = "numTournamentsCreated", nullable = false)
    private int numTournamentsCreated;

    @Column(name = "numTournamentsPlayedIn", nullable = false)
    private int numTournamentsPlayedIn;
    */
}
