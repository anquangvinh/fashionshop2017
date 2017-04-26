/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import spring.entity.CartLineInfo;
import spring.entity.DiscountVoucher;
import spring.entity.Orders;
import spring.entity.OrdersDetail;
import spring.entity.Users;

/**
 *
 * @author NganNgo
 */
@Stateful
public class OrderStateFulBean implements OrderStateFulBeanLocal, Serializable {

    @EJB
    private OrderStateLessBeanLocal orderStateLessBean;
    @EJB
    private ProductStateLessBeanLocal productStateLessBean;

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEntityManager() {
        return em;
    }

    private DiscountVoucher discountVoucher;
    private List<CartLineInfo> cart;
    private Users users;

    @PostConstruct
    private void init() {
        cart = new ArrayList<>();
    }

    @Override
    public void addProduct(CartLineInfo cartLineInfo) {
        CartLineInfo oldCartLineInfo = getProductInListByID(cartLineInfo.getProduct().getProductID(),
                  cartLineInfo.getSizesByColor().getSizeID(),
                  cartLineInfo.getSizesByColor().getColor().getColorID());
        if (oldCartLineInfo != null) {
            cartLineInfo.setQuantity(oldCartLineInfo.getQuantity() + cartLineInfo.getQuantity());
            cart.set(cart.indexOf(oldCartLineInfo), cartLineInfo);
            return;
        } else {
            cart.add(cartLineInfo);
        }
    }

    @Override
    public boolean deleteProduct(CartLineInfo cartLineInfo) {
        if (cartLineInfo != null) {
            cart.remove(cartLineInfo);
            return true;
        }
        return false;
    }

    @Override
    public List<CartLineInfo> showCart() {
        return cart;
    }

    @Override
    public CartLineInfo getProductInListByID(int productid, int sizeid, int colorid) {
        for (CartLineInfo cartLineInfo : cart) {
            if (cartLineInfo.getProduct().getProductID().equals(productid)) {
                if (cartLineInfo.getSizesByColor().getSizeID().equals(sizeid)
                          && cartLineInfo.getSizesByColor().getColor().getColorID().equals(colorid)) {
                    return cartLineInfo;
                }
            }
        }
        return null;
    }

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public int completePurchase(Orders orders) {
        int checkError;
        try {
            getEntityManager().persist(orders);
            for (CartLineInfo cartLineInfo : cart) {
                OrdersDetail ordersDetail = new OrdersDetail();
                ordersDetail.setOrder(orders);
                ordersDetail.setProduct(cartLineInfo.getProduct());
                ordersDetail.setSize(cartLineInfo.getSizesByColor());
                ordersDetail.setProductDiscount(cartLineInfo.getProduct().getProductDiscount());
                ordersDetail.setQuantity(cartLineInfo.getQuantity());
                ordersDetail.setPrice(cartLineInfo.getProduct().getPrice());
                ordersDetail.setStatus(Short.parseShort("0"));
                getEntityManager().persist(ordersDetail);
            }
            checkError = 1;
        } catch (Exception e) {
            checkError = 0;
        }
//        orders.setOrdersDate(new Date());
//        orders.setReceiverFirstName(users.getFirstName());
//        orders.setReceiverLastName(users.getLastName());
//        orders.setPhoneNumber(null);
        cart = new ArrayList<>();
        return checkError;
    }

    @Override
    public float subTotal() {
        float subtotal = 0;
        for (CartLineInfo cartLineInfo : cart) {
            subtotal += cartLineInfo.getAmount();
        }
        return subtotal;
    }

    @Override
    public boolean updateProduct(CartLineInfo oldCartLineInfo, CartLineInfo cartLineInfo) {
        try {
            cart.set(cart.indexOf(oldCartLineInfo), cartLineInfo);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
