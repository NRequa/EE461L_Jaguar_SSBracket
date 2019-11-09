package xyz.ssbracket.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "MatchResult")
@Table(name = "matchresult")
public class MatchResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "characterplayed", nullable = false)
    private String characterplayed;

    @Column(name = "win", nullable = false)
    private boolean win;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "player")
    private int player;

    @Column(name = "tournamet")
    private int tournament;

    @Column(name = "round")
    private int round;

    public MatchResult() { }

    public MatchResult(String characterplayed, boolean win, User user, int player, int tournament, int round) {
        this.characterplayed = characterplayed;
        this.win = win;
        this.user = user;
        this.player = player;
        this.tournament = tournament;
        this.round = round;
    }
}
