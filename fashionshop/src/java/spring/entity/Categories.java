/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Categories implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cateID;
    private String cateName;
    private String cateNameNA;
    private Short status;
    
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Products> productList;
    
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<SubCategories> subCateList;

    public Integer getCateID() {
        return cateID;
    }

    public void setCateID(Integer cateID) {
        this.cateID = cateID;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public String getCateNameNA() {
        return cateNameNA;
    }

    public void setCateNameNA(String cateNameNA) {
        this.cateNameNA = cateNameNA;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public List<SubCategories> getSubCateList() {
        return subCateList;
    }

    public void setSubCateList(List<SubCategories> subCateList) {
        this.subCateList = subCateList;
    }

    public List<Products> getProductList() {
        return productList;
    }

    public void setProductList(List<Products> productList) {
        this.productList = productList;
    }
}
