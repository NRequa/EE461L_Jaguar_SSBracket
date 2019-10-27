package xyz.ssbracket.Model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table( name = "userstats" )
public class UserStats implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", unique = true, nullable = false)
    private int id;

    // Mario Stats
    @Column(name = "mariowins", nullable = false)
    private int mariowins;

    @Column(name = "marioloses", nullable = false)
    private int marioloses;

    // Donkey Kong Stats
    @Column(name = "donkeykongwins", nullable = false)
    private int donkeykongwins;

    @Column(name = "donkeykongloses", nullable = false)
    private int donkeykongloses;

    // Link Stats
    @Column(name = "linkwins", nullable = false)
    private int linkwins;

    @Column(name = "linkloses", nullable = false)
    private int linkloses;

    // Samus Stats
    @Column(name = "samuswins", nullable = false)
    private int samuswins;

    @Column(name = "samusloses", nullable = false)
    private int samusloses;

    // Dark Samus Stats
    @Column(name = "darksamuswins", nullable = false)
    private int darksamuswins;

    @Column(name = "darksamusloses", nullable = false)
    private int darksamusloses;

    // Yoshi Stats
    @Column(name = "yoshiwins", nullable = false)
    private int yoshiwins;

    @Column(name = "yoshiloses", nullable = false)
    private int yoshiloses;

    // Kirby Stats
    @Column(name = "kirbywins", nullable = false)
    private int kirbywins;

    @Column(name = "kirbyloses", nullable = false)
    private int kirbyloses;

    // Fox Stats
    @Column(name = "foxwins", nullable = false)
    private int foxwins;

    @Column(name = "foxloses", nullable = false)
    private int foxloses;

    // Pikachu Stats
    @Column(name = "pikachuwins", nullable = false)
    private int pikachuwins;

    @Column(name = "pikachuloses", nullable = false)
    private int pikachuloses;

    // Luigi Stats
    @Column(name = "luigiwins", nullable = false)
    private int luigiwins;

    @Column(name = "luigiloses", nullable = false)
    private int luigiloses;

    // Ness Stats
    @Column(name = "nesswins", nullable = false)
    private int nesswins;

    @Column(name = "nessloses", nullable = false)
    private int nessloses;

    // Captain Falcon Stats
    @Column(name = "captainfalconwins", nullable = false)
    private int captainfalconwins;

    @Column(name = "captainfalconloses", nullable = false)
    private int captainfalconloses;

    // Jiggly Puff Stats
    @Column(name = "jigglypuffwins", nullable = false)
    private int jigglypuffwins;

    @Column(name = "jigglypuffloses", nullable = false)
    private int jigglypuffloses;

    // Peach Stats
    @Column(name = "peachwins", nullable = false)
    private int peachwins;

    @Column(name = "peachloses", nullable = false)
    private int peachloses;

    // Daisy Stats
    @Column(name = "daisywins", nullable = false)
    private int daisywins;

    @Column(name = "daisyloses", nullable = false)
    private int daisyloses;

    // Bowser Stats
    @Column(name = "bowserwins", nullable = false)
    private int bowserwins;

    @Column(name = "bowserloses", nullable = false)
    private int bowserloses;

    // Ice Climbers Stats
    @Column(name = "iceclimberswins", nullable = false)
    private int iceclimberswins;

    @Column(name = "iceclimbersloses", nullable = false)
    private int iceclimbersloses;

    // Sheik Stats
    @Column(name = "sheikwins", nullable = false)
    private int sheikwins;

    @Column(name = "sheikloses", nullable = false)
    private int sheikloses;

    // Zelda Stats
    @Column(name = "zeldawins", nullable = false)
    private int zeldawins;

    @Column(name = "zeldaloses", nullable = false)
    private int zeldaloses;

    // Dr. Mario Stats
    @Column(name = "drmariowins", nullable = false)
    private int drmariowins;

    @Column(name = "drmarioloses", nullable = false)
    private int drmarioloses;

    // Pichu Stats
    @Column(name = "pichuwins", nullable = false)
    private int pichuwins;

    @Column(name = "pichuloses", nullable = false)
    private int pichuloses;

    // Falco Stats
    @Column(name = "falcowins", nullable = false)
    private int falcowins;

    @Column(name = "falcoloses", nullable = false)
    private int falcoloses;

    // Marth Stats
    @Column(name = "marthwins", nullable = false)
    private int marthwins;

    @Column(name = "marthloses", nullable = false)
    private int marthloses;

    // Lucina Stats
    @Column(name = "lucinawins", nullable = false)
    private int lucinawins;

    @Column(name = "lucinaloses", nullable = false)
    private int lucinaloses;

    //  Young Link Stats
    @Column(name = "younglinkwins", nullable = false)
    private int younglinkwins;

    @Column(name = "younglinkloses", nullable = false)
    private int younglinkloses;

    // Ganondorf Stats
    @Column(name = "ganondorfwins", nullable = false)
    private int ganondorfwins;

    @Column(name = "ganondorfloses", nullable = false)
    private int ganondorfloses;

    // Mewtwo Stats
    @Column(name = "mewtwowins", nullable = false)
    private int mewtwowins;

    @Column(name = "mewtwoloses", nullable = false)
    private int mewtwoloses;

    // Roy Stats
    @Column(name = "roywins", nullable = false)
    private int roywins;

    @Column(name = "royloses", nullable = false)
    private int royloses;

    // Chrom Stats
    @Column(name = "chromwins", nullable = false)
    private int chromwins;

    @Column(name = "chromloses", nullable = false)
    private int chromloses;

    // Mr. Game & Watch Stats
    @Column(name = "mrgameandwatchwins", nullable = false)
    private int mrgameandwatchwins;

    @Column(name = "mrgameandwatchloses", nullable = false)
    private int mrgameandwatchloses;

    // Meta Knight Stats
    @Column(name = "metaknightwins", nullable = false)
    private int metaknightwins;

    @Column(name = "metaknightloses", nullable = false)
    private int metaknightloses;

    // Pit Stats
    @Column(name = "pitwins", nullable = false)
    private int pitwins;

    @Column(name = "pitloses", nullable = false)
    private int pitloses;

    // Dark Pit Stats
    @Column(name = "darkpitwins", nullable = false)
    private int darkpitwins;

    @Column(name = "darkpitloses", nullable = false)
    private int darkpitloses;

    // Zero Suit Stats
    @Column(name = "zerosuitsamuswins", nullable = false)
    private int zerosuitsamuswins;

    @Column(name = "zerosuitsamusloses", nullable = false)
    private int zerosuitsamusloses;

    // Wario Stats
    @Column(name = "wariowins", nullable = false)
    private int wariowins;

    @Column(name = "warioloses", nullable = false)
    private int warioloses;

    // Snake Stats
    @Column(name = "snakewins", nullable = false)
    private int snakewins;

    @Column(name = "snakeloses", nullable = false)
    private int snakeloses;

    // Ike Stats
    @Column(name = "ikewins", nullable = false)
    private int ikewins;

    @Column(name = "ikeloses", nullable = false)
    private int ikeloses;

    // Squirtle Stats
    @Column(name = "squirtlewins", nullable = false)
    private int squirtlewins;

    @Column(name = "squirtleloses", nullable = false)
    private int squirtleloses;

    // Ivysaur Stats
    @Column(name = "ivysaurwins", nullable = false)
    private int ivysaurwins;

    @Column(name = "ivysaurloses", nullable = false)
    private int ivysaurloses;

    // Charizard Stats
    @Column(name = "charizardwins", nullable = false)
    private int charizardwins;

    @Column(name = "charizardloses", nullable = false)
    private int charizardloses;

    // Diddy Kong Stats
    @Column(name = "diddykongwins", nullable = false)
    private int diddykongwins;

    @Column(name = "diddykongloses", nullable = false)
    private int diddykongloses;

    // Lucas Stats
    @Column(name = "lucaswins", nullable = false)
    private int lucaswins;

    @Column(name = "lucasloses", nullable = false)
    private int lucasloses;

    // Sonic Stats
    @Column(name = "sonicwins", nullable = false)
    private int sonicwins;

    @Column(name = "sonicloses", nullable = false)
    private int sonicloses;

    // King Dedede Stats
    @Column(name = "kingdededewins", nullable = false)
    private int kingdededewins;

    @Column(name = "kingdededeloses", nullable = false)
    private int kingdededeloses;

    // Olimar Stats
    @Column(name = "olimarwins", nullable = false)
    private int olimarwins;

    @Column(name = "olimarloses", nullable = false)
    private int olimarloses;

    // Lucario Stats
    @Column(name = "lucariowins", nullable = false)
    private int lucariowins;

    @Column(name = "lucarioloses", nullable = false)
    private int lucarioloses;

    // R.O.B. Stats
    @Column(name = "robwins", nullable = false)
    private int robwins;

    @Column(name = "robloses", nullable = false)
    private int robloses;

    // Toon Link Stats
    @Column(name = "toonlinkwins", nullable = false)
    private int toonlinkwins;

    @Column(name = "toonlinkloses", nullable = false)
    private int toonlinkloses;

    // Wolf Stats
    @Column(name = "wolfwins", nullable = false)
    private int wolfwins;

    @Column(name = "wolfloses", nullable = false)
    private int wolfloses;

    // Villager Stats
    @Column(name = "villagerwins", nullable = false)
    private int villagerwins;

    @Column(name = "villagerloses", nullable = false)
    private int villagerloses;

    // Megaman Stats
    @Column(name = "megamanwins", nullable = false)
    private int megamanwins;

    @Column(name = "megamanloses", nullable = false)
    private int megamanloses;

    // Wii Fit Trainer Stats
    @Column(name = "wiifittrainerwins", nullable = false)
    private int wiifittrainerwins;

    @Column(name = "wiifittrainerloses", nullable = false)
    private int wiifittrainerloses;

    // Rosalina & Luma Stats
    @Column(name = "rosalinaandlumawins", nullable = false)
    private int rosalinaandlumawins;

    @Column(name = "rosalinaandlumaloses", nullable = false)
    private int rosalinaandlumaloses;

    // Little Mac Stats
    @Column(name = "littlemacwins", nullable = false)
    private int littlemacwins;

    @Column(name = "littlemacloses", nullable = false)
    private int littlemacloses;

    // Greninja Stats
    @Column(name = "greninjawins", nullable = false)
    private int greninjawins;

    @Column(name = "greninjaloses", nullable = false)
    private int greninjaloses;

    // Mii Brawler Stats
    @Column(name = "miibrawlerwins", nullable = false)
    private int miibrawlerwins;

    @Column(name = "miibrawlerloses", nullable = false)
    private int miibrawlerloses;

    // Mii Swordfighter Stats
    @Column(name = "miiswordfighterwins", nullable = false)
    private int miiswordfighterwins;

    @Column(name = "miiswordfighterloses", nullable = false)
    private int miiswordfighterloses;

    // Mii Grunner Stats
    @Column(name = "miigunnerwins", nullable = false)
    private int miigunnerwins;

    @Column(name = "miigunnerloses", nullable = false)
    private int miigunnerloses;

    // Palutena Stats
    @Column(name = "palutenawins", nullable = false)
    private int palutenawins;

    @Column(name = "palutenaloses", nullable = false)
    private int palutenaloses;

    // Pac-Man Stats
    @Column(name = "pacmanwins", nullable = false)
    private int pacmanwins;

    @Column(name = "pacmanloses", nullable = false)
    private int pacmanloses;

    // Robin Wins
    @Column(name = "robinwins", nullable = false)
    private int robinwins;

    @Column(name = "robinloses", nullable = false)
    private int robinloses;

    // Shulk Wins
    @Column(name = "shulkwins", nullable = false)
    private int shulkwins;

    @Column(name = "shulkloses", nullable = false)
    private int shulkloses;

    // Bowser Jr. Stats
    @Column(name = "bowserjrwins", nullable = false)
    private int bowserjrwins;

    @Column(name = "bowserjrloses", nullable = false)
    private int bowserjrloses;

    // Duck Hunt Stats
    @Column(name = "duckhuntwins", nullable = false)
    private int duckhuntwins;

    @Column(name = "duckhuntloses", nullable = false)
    private int duckhuntloses;

    // Ryu Stats
    @Column(name = "ryuwins", nullable = false)
    private int ryuwins;

    @Column(name = "ryuloses", nullable = false)
    private int ryuloses;

    // Ken Stats
    @Column(name = "kenwins", nullable = false)
    private int kenwins;

    @Column(name = "kenloses", nullable = false)
    private int kenloses;

    // Cloud Stats
    @Column(name = "cloudwins", nullable = false)
    private int cloudwins;

    @Column(name = "cloudloses", nullable = false)
    private int cloudloses;

    // Corrin Stats
    @Column(name = "corrinwins", nullable = false)
    private int corrinwins;

    @Column(name = "corrinloses", nullable = false)
    private int corrinloses;

    // Beyonetta Stats
    @Column(name = "bayonettawins", nullable = false)
    private int bayonettewins;

    @Column(name = "bayonettaloses", nullable = false)
    private int bayonettaloses;

    // Inkling Stats
    @Column(name = "inklingwins", nullable = false)
    private int inklingwins;

    @Column(name = "inklingloses", nullable = false)
    private int inklingloses;

    // Ridley Stats
    @Column(name = "ridleywins", nullable = false)
    private int ridleywins;

    @Column(name = "ridleyloses", nullable = false)
    private int ridleyloses;

    // Simon Stats
    @Column(name = "simonwins", nullable = false)
    private int simonwins;

    @Column(name = "simonloses", nullable = false)
    private int simonloses;

    // Richter Stats
    @Column(name = "richterwins", nullable = false)
    private int richterwins;

    @Column(name = "richterloses", nullable = false)
    private int richterloses;

    // King K. Rool Stats
    @Column(name = "kingkroolwins", nullable = false)
    private int kingkroolwins;

    @Column(name = "kingkroolloses", nullable = false)
    private int kingkroolloses;

    // Isabella Stats
    @Column(name = "isabellewins", nullable = false)
    private int isabellewins;

    @Column(name = "isabelleloses", nullable = false)
    private int isabelleloses;

    // Incineroar Stats
    @Column(name = "incineroarwins", nullable = false)
    private int incineroarwins;

    @Column(name = "incineroarloses", nullable = false)
    private int incineroarloses;

    // Piranha Plant Stats
    @Column(name = "piranhaplantwins", nullable = false)
    private int piranhaplantwins;

    @Column(name = "piranhaplantloses", nullable = false)
    private int piranhaplantloses;

    // Joker Stats
    @Column(name = "jokerwins", nullable = false)
    private int jokerwins;

    @Column(name = "jokerloses", nullable = false)
    private int jokerloses;

    // Hero Stats
    @Column(name = "herowins", nullable = false)
    private int herowins;

    @Column(name = "heroloses", nullable = false)
    private int heroloses;

    // Banjo & Kazooie Stats
    @Column(name = "banjoandkazooiewins", nullable = false)
    private int banjoandkazooiewins;

    @Column(name = "banjoandkazooieloses", nullable = false)
    private int banjoandkazooieloses;

    /*
    @Column(name = "terrywins", nullable = false)
    private int terrywins;

    @Column(name = "terryloses", nullable = false)
    private int terryloses;
    */

    public UserStats() {
        banjoandkazooieloses = 0;
        banjoandkazooiewins = 0;
        bayonettaloses = 0;
        bayonettewins = 0;
        bowserjrloses = 0;
        bowserjrwins = 0;
        bowserloses = 0;
        bowserwins = 0;
        captainfalconloses = 0;
        captainfalconwins = 0;
        charizardloses = 0;
        charizardwins = 0;
        chromloses = 0;
        chromwins = 0;
        cloudloses = 0;
        cloudwins = 0;
        corrinloses = 0;
        corrinwins = 0;
        daisyloses = 0;
        daisywins = 0;
        darkpitloses = 0;
        darkpitwins = 0;
        darksamusloses = 0;
        darksamuswins = 0;
        diddykongloses = 0;
        diddykongwins = 0;
        donkeykongloses = 0;
        donkeykongwins = 0;
        drmarioloses = 0;
        drmariowins = 0;
        duckhuntloses = 0;
        duckhuntwins = 0;
        falcoloses = 0;
        falcowins = 0;
        foxloses = 0;
        foxwins = 0;
        ganondorfloses = 0;
        ganondorfwins = 0;
        heroloses = 0;
        herowins = 0;
        iceclimbersloses = 0;
        iceclimberswins = 0;
        ikeloses = 0;
        ikewins = 0;
        incineroarloses = 0;
        incineroarwins = 0;
        inklingloses = 0;
        inklingwins = 0;
        isabelleloses = 0;
        isabellewins = 0;
        ivysaurloses = 0;
        ivysaurwins = 0;
        jigglypuffloses = 0;
        jigglypuffwins = 0;
        jokerloses = 0;
        jokerwins = 0;
        kenloses = 0;
        kenwins = 0;
        kingdededeloses = 0;
        kingdededewins = 0;
        kingkroolloses = 0;
        kingkroolwins = 0;
        kirbyloses = 0;
        kirbywins = 0;
        linkloses = 0;
        linkwins = 0;
        littlemacloses = 0;
        littlemacwins = 0;
        lucarioloses = 0;
        lucariowins = 0;
        lucasloses = 0;
        lucariowins = 0;
        lucinaloses = 0;
        lucinawins = 0;
        luigiloses = 0;
        luigiwins = 0;
        marioloses = 0;
        mariowins = 0;
        marthloses = 0;
        marthwins = 0;
        megamanloses = 0;
        megamanwins = 0;
        metaknightloses = 0;
        metaknightwins = 0;
        mewtwoloses = 0;
        mewtwowins = 0;
        miibrawlerloses = 0;
        miibrawlerwins = 0;
        miigunnerloses = 0;
        miigunnerwins = 0;
        miiswordfighterloses = 0;
        miiswordfighterwins = 0;
        mrgameandwatchloses = 0;
        mrgameandwatchwins = 0;
        nessloses = 0;
        nesswins = 0;
        olimarloses = 0;
        olimarwins = 0;
        pacmanloses = 0;
        pacmanwins = 0;
        palutenaloses = 0;
        palutenawins = 0;
        peachloses = 0;
        peachwins = 0;
        pichuloses = 0;
        pichuwins = 0;
        pikachuloses = 0;
        pikachuwins = 0;
        piranhaplantloses = 0;
        piranhaplantwins = 0;
        pitloses = 0;
        pitwins = 0;
        richterloses = 0;
        richterwins = 0;
        ridleyloses = 0;
        ridleywins = 0;
        robinloses = 0;
        robinwins = 0;
        rosalinaandlumaloses = 0;
        rosalinaandlumawins = 0;
        royloses = 0;
        roywins = 0;
        ryuloses = 0;
        ryuwins = 0;
        samusloses = 0;
        samuswins = 0;
        sheikloses = 0;
        sheikwins = 0;
        shulkloses = 0;
        shulkwins = 0;
        simonloses = 0;
        simonwins = 0;
        snakeloses = 0;
        snakewins = 0;
        sonicloses = 0;
        sonicwins = 0;
        squirtleloses = 0;
        squirtlewins = 0;
        toonlinkloses = 0;
        toonlinkwins = 0;
        villagerloses = 0;
        villagerwins = 0;
        warioloses = 0;
        wariowins = 0;
        wiifittrainerloses = 0;
        wiifittrainerwins = 0;
        wolfloses = 0;
        wolfwins = 0;
        yoshiloses = 0;
        yoshiwins = 0;
        younglinkloses = 0;
        younglinkwins = 0;
        zeldaloses = 0;
        zeldawins = 0;
        zerosuitsamusloses = 0;
        zerosuitsamuswins = 0;
    }
}
