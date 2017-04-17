/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

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
public class OrderStateFulBean implements OrderStateFulBeanLocal {

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
        CartLineInfo oldCartLineInfo = getProductInListByID(cartLineInfo.getProduct().getProductID());
        if (oldCartLineInfo != null) {
            if (cartLineInfo.getProduct().getProductID().equals(oldCartLineInfo.getProduct().getProductID())) {
                if (cartLineInfo.getSizesByColor().getSizeID().equals(oldCartLineInfo.getSizesByColor().getSizeID())) {
                    cartLineInfo.setQuantity(oldCartLineInfo.getQuantity() + cartLineInfo.getQuantity());
                    deleteProduct(oldCartLineInfo);
                    cart.add(cartLineInfo);
                    return;
                }else{
                    cart.add(cartLineInfo);
                }
            }else{
                cart.add(cartLineInfo);
            }
        }else{
            cart.add(cartLineInfo);
        }
    }

    @Override
    public boolean deleteProduct(CartLineInfo cartLineInfo) {
        if (cartLineInfo != null) {
            cart.remove(cartLineInfo);
        }
        return false;
    }

    @Override
    public List<CartLineInfo> showCart() {
        return cart;
    }

    @Override
    public CartLineInfo getProductInListByID(int id) {
        for (CartLineInfo cartLineInfo : cart) {
            if (cartLineInfo.getProduct().getProductID().equals(id)) {
                return cartLineInfo;
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

}
