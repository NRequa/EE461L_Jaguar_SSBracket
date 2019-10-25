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
@Table(name = "tournaments")
public class Tournament implements Serializable {
    @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "tname", nullable = false)
    private String tname;

	@Column(name = "tcreator", nullable = false)
    private String tcreator;

	@Column(name = "ttype", nullable = false)
    private int ttype;

	@Column(name = "tsize", nullable = false)
	private int tsize;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "tempplayers", nullable = false)
  private String tempplayers;



//everything under this comment is new stuff
/*
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    @JoinTable(
            name = "user_tournaments",
            joinColumns = { @JoinColumn(name = "tournament_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    @JsonIgnore
    @JsonBackReference("users")
    @JsonManagedReference("tournaments")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<User> users = new HashSet<>();
*/

  //@OneToMany(mappedBy = "tournaments")
  //private Set<UserTournament> usertournament = new HashSet<>();
  @ManyToMany(cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
   @JoinTable
   private List<User> users = new ArrayList<>();

    public Tournament() {}

    public Tournament(int id, String tname, String tcreator, int ttype, int tsize) {
        this.id = id;
        this.tname = tname;
        this.tcreator = tcreator;
        this.ttype = ttype;
        this.tsize = tsize;
    }
}
