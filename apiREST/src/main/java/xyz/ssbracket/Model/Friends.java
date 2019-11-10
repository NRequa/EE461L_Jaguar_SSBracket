package xyz.ssbracket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "friends")
public class Friends implements Serializable {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "friendsid", nullable = false)
    private int friendsid;

    @Column(name = "friendsname", nullable = false)
    private String friendsname;

    @Column(name = "totalwins", nullable = false)
    private int totalwins;

    @Column(name = "totallosses", nullable = false)
    private int totallosses;

    @ManyToMany(mappedBy = "myfriends")
    @JsonIgnore
    private List<User> friendowner = new ArrayList<>();

    public Friends(int id, String friendsname){
      this.friendsid = id;
      this.friendsname = friendsname;
      this.totalwins = 0;
      this.totallosses = 0;
    }

}
