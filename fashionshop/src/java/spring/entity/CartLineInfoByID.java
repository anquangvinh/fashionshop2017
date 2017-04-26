/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.entity;

/**
 *
 * @author NganNgo
 */
public class CartLineInfoByID {
    private int productID;
    private int sizeID;
    private int colorID;
    private int quantity;

    public CartLineInfoByID() {
    }

    public CartLineInfoByID(int productID, int sizeID, int colorID, int quantity) {
        this.productID = productID;
        this.sizeID = sizeID;
        this.colorID = colorID;
        this.quantity = quantity;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getSizeID() {
        return sizeID;
    }

    public void setSizeID(int sizeID) {
        this.sizeID = sizeID;
    }

    public int getColorID() {
        return colorID;
    }

    public void setColorID(int colorID) {
        this.colorID = colorID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    
}
