/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

import java.io.Serializable;
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
public class Orders implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ordersID;
    @Temporal(TemporalType.TIMESTAMP)
    private Date ordersDate;
    private String receiverFirstName;
    private String receiverLastName;
    private String phoneNumber;
    private String deliveryAddress;
    private String note;
    private Short status;
    
    @ManyToOne
    @JoinColumn(name = "userID")
    private Users user;
    
    @ManyToOne
    @JoinColumn(name = "voucherID")
    private DiscountVoucher voucher;
    
    @OneToMany(mappedBy = "order")
    private List<OrdersDetail> orderDetailList;
    
    public Integer getOrdersID() {
        return ordersID;
    }

    public void setOrdersID(Integer ordersID) {
        this.ordersID = ordersID;
    }

    public Date getOrdersDate() {
        return ordersDate;
    }

    public void setOrdersDate(Date ordersDate) {
        this.ordersDate = ordersDate;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public DiscountVoucher getVoucher() {
        return voucher;
    }

    public void setVoucher(DiscountVoucher voucher) {
        this.voucher = voucher;
    }

    public List<OrdersDetail> getOrderDetailList() {
        return orderDetailList;
    }

    public void setOrderDetailList(List<OrdersDetail> orderDetailList) {
        this.orderDetailList = orderDetailList;
    }
    
    
}
