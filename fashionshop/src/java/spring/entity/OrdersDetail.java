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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class OrdersDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ordersDetailID;
    private Float productDiscount;
    private Integer quantity;
    private Float price;
    private Short status;
    
    @ManyToOne
    @JoinColumn(name = "ordersID")
    private Orders order;
    
    @ManyToOne
    @JoinColumn(name = "productID")
    private Products product;
    
    @ManyToOne
    @JoinColumn(name = "sizeID")
    private SizesByColor size;

    public Integer getOrdersDetailID() {
        return ordersDetailID;
    }

    public void setOrdersDetailID(Integer ordersDetailID) {
        this.ordersDetailID = ordersDetailID;
    }

    public Float getProductDiscount() {
        return productDiscount;
    }

    public void setProductDiscount(Float productDiscount) {
        this.productDiscount = productDiscount;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public SizesByColor getSize() {
        return size;
    }

    public void setSize(SizesByColor size) {
        this.size = size;
    }
    
    
}
