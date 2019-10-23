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



//everything under this comment is new stuff
/*
    @ManyToMany(
           fetch = FetchType.LAZY,
           cascade = {CascadeType.PERSIST, CascadeType.MERGE},
           mappedBy = "users"
   )
   @OnDelete(action = OnDeleteAction.CASCADE)
   @JsonIgnore
   @JsonManagedReference("users")
   @JsonBackReference("tournaments")
   private Set<Tournament> tournaments = new HashSet<>();
*/
  //@OneToMany(mappedBy = "users")
  //private Set<UserTournament> usertournament = new HashSet<>();
      @ManyToMany(mappedBy = "users")
      @JsonIgnore
      private List<Tournament> tournaments = new ArrayList<>();

   public User() { }

   public User(int id, String username, int num_wins,  int num_games_played, int num_tournaments_created,
               int num_tournaments_participated, int num_tournaments_won) {
       this.id = id;
       this.username = username;
       this .num_wins = num_wins;
       this.num_games_played = num_games_played;
       this.num_tournaments_created = num_tournaments_created;
       this.num_tournaments_participated = num_tournaments_participated;
       this.num_tournaments_won = num_tournaments_won;
   }
}
