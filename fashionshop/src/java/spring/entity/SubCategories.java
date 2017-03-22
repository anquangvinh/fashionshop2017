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
public class SubCategories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subCateID;
    private String subCateName;
    private String subCateNameNA;
    private Short status;
    
    @OneToMany(mappedBy = "subCate")
    private List<Products> productList;
    
    @ManyToOne
    @JoinColumn(name = "cateID")
    private Categories category;

    public Integer getSubCateID() {
        return subCateID;
    }

    public void setSubCateID(Integer subCateID) {
        this.subCateID = subCateID;
    }

    public String getSubCateName() {
        return subCateName;
    }

    public void setSubCateName(String subCateName) {
        this.subCateName = subCateName;
    }

    public String getSubCateNameNA() {
        return subCateNameNA;
    }

    public void setSubCateNameNA(String subCateNameNA) {
        this.subCateNameNA = subCateNameNA;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public List<Products> getProductList() {
        return productList;
    }

    public void setProductList(List<Products> productList) {
        this.productList = productList;
    }

    public Categories getCategory() {
        return category;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }
    
    
}