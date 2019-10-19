package xyz.ssbracket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "tournaments")
public class Tournament implements Serializable {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<User> users = new HashSet<>();
	*/

    public Tournament() {}

    public Tournament(int id, String tname, String tcreator, int ttype, int tsize) {
        this.id = id;
        this.tname = tname;
        this.tcreator = tcreator;
        this.ttype = ttype;
        this.tsize = tsize;
    }
}
