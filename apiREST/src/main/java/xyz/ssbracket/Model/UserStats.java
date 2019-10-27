package xyz.ssbracket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table( name = "userstats" )
public class UserStats {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    @Column(name = "mariowins", nullable = false)
    private int mariowins;
    @Column(name = "marioloses", nullable = false)
    private int marioloses;

    @Column(name = "donkeykongwins", nullable = false)
    private int donkeykongwins;
    @Column(name = "donkeykongloses", nullable = false)
    private int donkeykongloses;

    @Column(name = "linkwins", nullable = false)
    private int linkwins;
    @Column(name = "linkloses", nullable = false)
    private int linkloses;

    @Column(name = "samuswins", nullable = false)
    private int samuswins;
    @Column(name = "samusloses", nullable = false)
    private int samusloses;

    @Column(name = "darksamuswins", nullable = false)
    private int darksamuswins;
    @Column(name = "darksamusloses", nullable = false)
    private int darksamusloses;

    @Column(name = "yoshiwins", nullable = false)
    private int yoshiwins;
    @Column(name = "yoshiloses", nullable = false)
    private int yoshiloses;

    @Column(name = "kirbywins", nullable = false)
    private int kirbywins;
    @Column(name = "kirbyloses", nullable = false)
    private int kirbeyloses;

    @Column(name = "foxwins", nullable = false)
    private int foxwins;
    @Column(name = "foxloses", nullable = false)
    private int foxloses;

    @Column(name = "pikachuwins", nullable = false)
    private int pikachuwins;
    @Column(name = "pikachuloses", nullable = false)
    private int pikachuloses;

    @Column(name = "luigiwins", nullable = false)
    private int luigiwins;
    @Column(name = "luigiloses", nullable = false)
    private int luigiloses;

    @Column(name = "nesswins", nullable = false)
    private int nesswins;
    @Column(name = "nessloses", nullable = false)
    private int nessloses;

    @Column(name = "captainfalconwins", nullable = false)
    private int captaincalconwins;
    @Column(name = "captainfalconloses", nullable = false)
    private int captainfalconloses;

    @Column(name = "jigglypuffwins", nullable = false)
    private int jigglypuffwins;
    @Column(name = "jigglypuffloses", nullable = false)
    private int jigglypuffloses;

    @Column(name = "peachwins", nullable = false)
    private int peachwins;
    @Column(name = "peachloses", nullable = false)
    private int peachloses;
}
