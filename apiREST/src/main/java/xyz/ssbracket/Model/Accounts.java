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
@Table(name = "accounts")
public class Accounts implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "tname", nullable = false)
    private String username;

    @Column(name = "tpassword", nullable = false)
    private String password;

    @Column(name = "tfriends", nullable = false)
    private int num_friends;

    @Column(name = "ttournament_wins", nullable = false)
    private int num_tournaments_won;

    @Column(name = "timageID", nullable = false)
    private int image_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private User myuser;

    public Accounts(String username, String password){
        super();
        this.username = username;
        this.password = password;
        num_friends = 0;
        num_tournaments_won = 0;
        image_id = 0;
    }

    public Accounts(String username, String password, User myuser){
      super();
      this.username = username;
      this.password = password;
      num_friends = 0;
      num_tournaments_won = 0;
      image_id = 0;
      this.myuser = myuser;
      this.myuser.setAccount(this);
    }

    public boolean isEmpty(){
        return this.username == null;
    }

    public int getId(){
        return this.id;
    }

    public String getPassword(){
        return this.password;
    }

    public User getUser(){
        return this.myuser;
    }

    public void setPassword(String pass){
        this.password = pass;
    }

}
