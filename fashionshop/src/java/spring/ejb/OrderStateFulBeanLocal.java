/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.HashMap;
import java.util.List;
import javax.ejb.Local;
import spring.entity.Products;

/**
 *
 * @author NganNgo
 */
@Local
public interface OrderStateFulBeanLocal {
    void addProduct(int productID, int quantity);
    boolean deleteProduct(Products product);
    HashMap<Integer, Integer> showCart();
    Products getProductInListByID(int id);
    void completePurchase();
}
