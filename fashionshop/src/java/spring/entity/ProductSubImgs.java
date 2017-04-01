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

    public Integer getSubImgID() {
        return subImgID;
    }

    public void setSubImgID(Integer subImgID) {
        this.subImgID = subImgID;
    }

    public Integer getColorID() {
        return colorID;
    }

    public void setColorID(Integer colorID) {
        this.colorID = colorID;
    }

    public String getUrlImg() {
        return urlImg;
    }

    public void setUrlImg(String urlImg) {
        this.urlImg = urlImg;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }
    
    
}
