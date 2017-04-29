/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import spring.entity.Categories;
import spring.entity.DiscountVoucher;
import spring.entity.Orders;
import spring.entity.OrdersDetail;
import spring.entity.Products;
import spring.entity.SizesByColor;

/**
 *
 * @author NganNgo
 */
@Stateless
public class OrderStateLessBean implements OrderStateLessBeanLocal {

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEntityManager() {
        return em;
    }

    @Override
    public List<Orders> getAllOrder() {
        Query q = getEntityManager().createQuery("SELECT o FROM Orders o", Orders.class);
        return q.getResultList();
    }

    @Override
    public List<OrdersDetail> getAllOrderDetailByOrderID(int orderID) {
        Query q = getEntityManager().createQuery("SELECT od FROM OrdersDetail od WHERE od.order.ordersID = :orderID",OrdersDetail.class);
        q.setParameter("orderID", orderID);
        return q.getResultList();
    }

    @Override
    public Orders getOrderByID(int orderID) {
        return getEntityManager().find(Orders.class, orderID);
    }

    @Override
    public OrdersDetail getOrderDetailByID(int orderDetailID) {
        return getEntityManager().find(OrdersDetail.class, orderDetailID);
    }

    @Override
    public float sumTotalOrderDetail(List<OrdersDetail> ordersDetailList) {
        float sum = 0;
        for (OrdersDetail od : ordersDetailList) {
            sum += od.getPrice() * od.getQuantity();
        }
        return sum;
    }

    @Override
    public Products getProductByID(int productID) {
        return getEntityManager().find(Products.class, productID);
    }

    @Override
    public boolean confirmStatusOrder(Orders orders, short status) {
        try {
            orders.setStatus(status);
            getEntityManager().merge(orders);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean confirmStatusOrderDetail(OrdersDetail ordersDetail, short status) {
        try {
            ordersDetail.setStatus(status);
            getEntityManager().merge(ordersDetail);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public List<Categories> getAllCategory() {
        Query q = getEntityManager().createQuery("SELECT c FROM Categories c", Categories.class);
        return q.getResultList();
    }

    @Override
    public List<DiscountVoucher> getAllDiscountVoucher() {
        Query q = getEntityManager().createQuery("SELECT d FROM DiscountVoucher d", DiscountVoucher.class);
        return q.getResultList();
    }

    @Override
    public DiscountVoucher getDiscountVoucherByID(String discountVoucherID) {
        return getEntityManager().find(DiscountVoucher.class, discountVoucherID);
    }

    @Override
    public int createDiscountVoucher(DiscountVoucher newDiscountVoucher) {
        int checkError;
        if (getDiscountVoucherByID(newDiscountVoucher.getVoucherID()) != null) {
            checkError = 2;
        } else {
            try {
                getEntityManager().persist(newDiscountVoucher);
                checkError = 1;
            } catch (Exception e) {
                checkError = 0;
            }
        }
        return checkError;
    }

    @Override
    public int updateDiscountVoucher(DiscountVoucher targetDiscountVoucher) {
        int checkError;
        DiscountVoucher oldDiscountVoucher = getDiscountVoucherByID(targetDiscountVoucher.getVoucherID());
        if (oldDiscountVoucher != null) {
            targetDiscountVoucher.setOrdersList(oldDiscountVoucher.getOrdersList());
            try {
                getEntityManager().merge(targetDiscountVoucher);
                checkError = 1;
            } catch (Exception e) {
                checkError = 0;
            }
        } else {
            checkError = 2;
        }
        return checkError;
    }

    @Override
    public SizesByColor getSizesByColorBySizeIDandColorID(int sizeId, int colorId) {
        try {
            Query q = getEntityManager().createQuery("SELECT s FROM SizesByColor s WHERE s.sizeID = :sizeid AND s.color.colorID = :colorid", Categories.class);
            q.setParameter("sizeid", sizeId);
            q.setParameter("colorid", colorId);
            return (SizesByColor) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

}
