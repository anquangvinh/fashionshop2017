/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;
    private String productName;
    private String productNameNA;
    private Float price;
    private String urlImg;
    private String productDescription;
    private Float productDiscount;
    @Temporal(TemporalType.DATE)
    private Date postedDate;
    private Integer productViews;
    private Integer productPurchases;
    private Short status;
    
    @OneToMany(mappedBy = "product")
    private List<OrdersDetail> ordersDetailList;
    
    @ManyToOne
    @JoinColumn(name = "subCateID")
    private SubCategories subCate;
    
    @OneToMany(mappedBy = "product")
    private List<ProductColors> productColorList;
    
    @OneToMany(mappedBy = "product")
    private List<WishList> wishList;

    public Integer getProductID() {
        return productID;
    }

    public void setProductID(Integer productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductNameNA() {
        return productNameNA;
    }

    public void setProductNameNA(String productNameNA) {
        this.productNameNA = productNameNA;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getUrlImg() {
        return urlImg;
    }

    public void setUrlImg(String urlImg) {
        this.urlImg = urlImg;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Float getProductDiscount() {
        return productDiscount;
    }

    public void setProductDiscount(Float productDiscount) {
        this.productDiscount = productDiscount;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public Integer getProductViews() {
        return productViews;
    }

    public void setProductViews(Integer productViews) {
        this.productViews = productViews;
    }

    public Integer getProductPurchases() {
        return productPurchases;
    }

    public void setProductPurchases(Integer productPurchases) {
        this.productPurchases = productPurchases;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public List<OrdersDetail> getOrdersDetailList() {
        return ordersDetailList;
    }

    public void setOrdersDetailList(List<OrdersDetail> ordersDetailList) {
        this.ordersDetailList = ordersDetailList;
    }

    public SubCategories getSubCate() {
        return subCate;
    }

    public void setSubCate(SubCategories subCate) {
        this.subCate = subCate;
    }

    public List<ProductColors> getProductColorList() {
        return productColorList;
    }

    public void setProductColorList(List<ProductColors> productColorList) {
        this.productColorList = productColorList;
    }

    public List<WishList> getWishList() {
        return wishList;
    }

    public void setWishList(List<WishList> wishList) {
        this.wishList = wishList;
    }
    
    
}
