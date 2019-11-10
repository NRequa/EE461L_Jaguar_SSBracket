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
@Table(name = "tournamentarray")
public class TournamentArray implements Serializable {
    @Id
    @Column(name = "ID", nullable = false)
    private int id;

  	@Column(name = "tournamentname", nullable = false)
    private String tournamentname;

    @Column(name = "championname", nullable = false)
    private String championname;

    @ManyToMany(cascade = {
          CascadeType.PERSIST,
          CascadeType.MERGE
      })
     @JoinTable
     @JsonIgnore
     private List<User> usersarray = new ArrayList<>();


    public TournamentArray() {}

    public TournamentArray(int id, String tournamentname) {
        this.id = id;
        this.tournamentname = tournamentname;
    }
}
