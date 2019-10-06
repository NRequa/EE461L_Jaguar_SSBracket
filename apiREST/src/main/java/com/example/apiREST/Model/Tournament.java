package com.example.apiREST.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tournaments")
public class Tournament implements Serializable {
    @Id
    @Column(name = "ID", unique = true, nullable = false)
    private int id;


    @Column(name = "tname", nullable = false)
    private String tname;
    /*
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "size", nullable = false)
    private int size;
    */
}
