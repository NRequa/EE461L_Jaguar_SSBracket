package xyz.ssbracket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


//new imports
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

//@AllArgsConstructor
//@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "numwins", nullable = false)
    private int numwins;

    @Column(name = "numgamesplayed", nullable = false)
    private int numgamesplayed;

    @Column(name = "numtournamentscreated", nullable = false)
    private int numtournamentscreated;

    @Column(name = "numtournamentsparticipated", nullable = false)
    private int numtournamentsparticipated;

    @Column(name = "numtournamentswon", nullable = false)
    private int numtournamentswon;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<Tournament> tournaments = new ArrayList<>();

    //separate array of tournaments to avoid infinite loops when getting JSON
    @ManyToMany(mappedBy = "usersarray")
    private List<TournamentArray> mytournaments = new ArrayList<>();

    @OneToOne(mappedBy = "myuser")
    @JsonIgnore
    private Accounts account;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    private List<MatchResult> matchResults = new ArrayList<>();

    public User() { }

   public User(String username, int num_wins,  int num_games_played, int num_tournaments_created,
               int num_tournaments_participated, int num_tournaments_won) {
       this.username = username;
       this .numwins = num_wins;
       this.numgamesplayed = num_games_played;
       this.numtournamentscreated = num_tournaments_created;
       this.numtournamentsparticipated = num_tournaments_participated;
       this.numtournamentswon = num_tournaments_won;
   }
}
