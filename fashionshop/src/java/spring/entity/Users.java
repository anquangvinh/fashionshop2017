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
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String avatar;
    private Short gender;
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Temporal(TemporalType.DATE)
    private Date registrationDate;
    private Short status;
    
    @ManyToOne
    @JoinColumn(name = "roleID")
    private Roles role;
    
    @OneToMany(mappedBy = "user")
    private List<Blogs> blogList;
    
    @OneToMany(mappedBy = "user")
    private List<Orders> ordersList;
    
    @OneToMany(mappedBy = "user")
    private List<UserAddresses> userAddressList;
    
    @OneToMany(mappedBy = "user")
    private List<WishList> wishList;

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Short getGender() {
        return gender;
    }

    public void setGender(Short gender) {
        this.gender = gender;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public List<Blogs> getBlogList() {
        return blogList;
    }

    public void setBlogList(List<Blogs> blogList) {
        this.blogList = blogList;
    }

    public List<Orders> getOrdersList() {
        return ordersList;
    }

    public void setOrdersList(List<Orders> ordersList) {
        this.ordersList = ordersList;
    }

    public List<UserAddresses> getUserAddressList() {
        return userAddressList;
    }

    public void setUserAddressList(List<UserAddresses> userAddressList) {
        this.userAddressList = userAddressList;
    }

    public List<WishList> getWishList() {
        return wishList;
    }

    public void setWishList(List<WishList> wishList) {
        this.wishList = wishList;
    }
    
    
}