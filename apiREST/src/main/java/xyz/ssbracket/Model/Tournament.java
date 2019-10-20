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
}
