/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class ProductColors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer colorID;
    private String color;
    private String colorNA;
    private String urlColorImg;
    private Short status;
    
    @OneToMany(mappedBy = "color")
    private List<SizesByColor> sizeList;
    
    @OneToMany(mappedBy = "productColor")
    private List<ProductSubImgs> ProductSubImgsList;
    
    @ManyToOne
    @JoinColumn(name = "productID")
    private Products product;

    public Integer getColorID() {
        return colorID;
    }

    public void setColorID(Integer colorID) {
        this.colorID = colorID;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getColorNA() {
        return colorNA;
    }

    public void setColorNA(String colorNA) {
        this.colorNA = colorNA;
    }

    public String getUrlColorImg() {
        return urlColorImg;
    }

    public void setUrlColorImg(String urlColorImg) {
        this.urlColorImg = urlColorImg;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public List<SizesByColor> getSizeList() {
        return sizeList;
    }

    public void setSizeList(List<SizesByColor> sizeList) {
        this.sizeList = sizeList;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public List<ProductSubImgs> getProductSubImgsList() {
        return ProductSubImgsList;
    }

    public void setProductSubImgsList(List<ProductSubImgs> ProductSubImgsList) {
        this.ProductSubImgsList = ProductSubImgsList;
    }
    
    
}
