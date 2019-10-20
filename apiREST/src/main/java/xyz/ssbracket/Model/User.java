package xyz.ssbracket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "num_wins", nullable = false)
    private int num_wins;

    @Column(name = "num_games_played", nullable = false)
    private int num_games_played;

    @Column(name = "num_tournaments_created", nullable = false)
    private int num_tournaments_created;

    @Column(name = "num_tournaments_participated", nullable = false)
    private int num_tournaments_participated;

    @Column(name = "num_tournaments_won", nullable = false)
    private int num_tournaments_won;
}
