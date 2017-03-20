/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductSubImgs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subImgID;
    private Integer colorID;
    private String urlImg;
    private Short status;
}
