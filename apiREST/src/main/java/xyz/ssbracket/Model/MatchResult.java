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

    @Column(name = "completed", nullable = false)
    private boolean completed;

    @Column(name = "p1win", nullable = false)
    private boolean p1win;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "higherseed_id")
    @JsonIgnore
    private User higherseed;

    @Column(name = "player1string")
    private String player1string;

    @Column(name = "player1")
    private int player1;

    @Column(name = "p1characterplayed")
    private String p1characterplayed;

    @Column(name = "p1roundswon")
    private int p1roundswon;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "lowerseed_id")
    @JsonIgnore
    private User lowerseed;

    @Column(name = "player2string")
    private String player2string;

    @Column(name = "player2")
    private int player2;

    @Column(name = "p2characterplayed" )
    private String p2characterplayed;

    @Column(name = "p2roundswon")
    private int p2roundswon;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tournament_id")
    @JsonIgnore
    private Tournament tournament;

    @Column(name = "event")
    private int event;

    @Column(name = "level")
    private int level;

    public MatchResult() { }

    public MatchResult(boolean completed, boolean p1win, User higherseed, int player1, String p1characterplayed, int p1roundswon, User lowerseed, int player2, String p2characterplayed, int p2roundswon, Tournament tournament, int event, int level) {
        this.completed = completed;
        this.p1win = p1win;
        this.higherseed = higherseed;
        this.player1 = player1;
        this.p1characterplayed = p1characterplayed;
        this.p1roundswon = p1roundswon;
        this.lowerseed = lowerseed;
        this.player2 = player2;
        this.p2characterplayed = p2characterplayed;
        this.p2roundswon = p2roundswon;
        this.tournament = tournament;
        this.event = event;
        this.level = level;
    }
}
