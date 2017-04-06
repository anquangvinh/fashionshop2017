/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import spring.entity.OrdersDetail;
import spring.entity.Products;

/**
 *
 * @author NganNgo
 */
@Stateful
public class OrderStateFulBean implements OrderStateFulBeanLocal {
    @PersistenceContext
    private EntityManager em;
    
    private HashMap<Integer,Integer> productList;
//    private List<Products> productList;
//
//    public List<Products> getProductList() {
//        return productList;
//    }
//
//    public void setProductList(List<Products> productList) {
//        this.productList = productList;
//    }
    
    @PostConstruct
    private void init(){
//        productList = new ArrayList<>();
        productList = new HashMap<>();
    }

    @Override
    public void addProduct(int productID, int quantity) {
        productList.put(productID, quantity);
    }

    @Override
    public boolean deleteProduct(Products product) {
        productList.remove(product);
        return false;
    }

    @Override
    public HashMap<Integer, Integer> showCart() {
        return productList;
    }

    @Override
    public Products getProductInListByID(int id) {
//        for (Products pro : productList) {
//            if (pro.getProductID().equals(id)) {
//                return pro;
//            }
//        }
        return null;
    }

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void completePurchase() {
//        for (Products pro : productList) {
//            try {
//                OrdersDetail ordersDetail = new OrdersDetail();
//                ordersDetail.setOrdersDetailID(1);
//                ordersDetail.setPrice(pro.getPrice());
//                ordersDetail.setQuantity(10);
//                em.persist(ordersDetail);
//            } catch (Exception ex) {
//                Logger.getLogger(OrderStateFulBean.class.getName()).log(Level.SEVERE, null, ex);
//            }
//        }
//        productList.clear();
    }
    
}
