package spring.client.controller;

import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import spring.ejb.OrderStateFulBeanLocal;
import spring.ejb.OrderStateLessBeanLocal;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.CartLineInfo;
import spring.entity.Orders;
import spring.entity.Products;

@Controller
@RequestMapping(value = "/orders/")
public class OrdersController {
    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();
    OrderStateFulBeanLocal orderStateFulBean = lookupOrderStateFulBeanLocal();
    OrderStateLessBeanLocal orderStateLessBean = lookupOrderStateLessBeanLocal();
    

    @RequestMapping(value = "producttest")
    public String product(ModelMap model){
        model.addAttribute("productList", productStateLessBean.productList());        return "client/pages/product";
    }
    
    @RequestMapping(value = "addtocart/{productid}", method = RequestMethod.GET)
    public String addtocart(@PathVariable("productid") Integer productid){
        Products pro = orderStateLessBean.getProductByID(productid);
        if (pro != null) {
            orderStateFulBean.addProduct(productid, 1);
        }
        return "redirect:/orders/product.html";
    }
    
    @RequestMapping(value = "checkout")
    public String checkout() {
        return "client/pages/checkout";
    }
    
    @RequestMapping(value = "shoppingcart")
    public String shoppingcart(ModelMap model){
        model.addAttribute("cartList", orderStateFulBean.showCart());
        return "client/pages/shoppingcart";
    }
    
    @RequestMapping(value = "deleteitemCart/{productid}", method = RequestMethod.GET)
    public String deleteitemCart(@PathVariable("productid") int productid){
        CartLineInfo cartLineInfo = orderStateFulBean.getProductInListByID(productid);
        if (cartLineInfo != null) {
            orderStateFulBean.deleteProduct(cartLineInfo);
        }
        return "redirect:/orders/shoppingcart.html";
    }
    
    @RequestMapping(value = "order-history")
    public String orderhistory(ModelMap model) {
        HashMap<Orders,Float> order_total = new HashMap<>();
        for (Orders orders : orderStateLessBean.getOrderListByUserID(5)) {
            order_total.put(orders, orderStateLessBean.sumTotalOrderDetail(orders.getOrderDetailList()));
        }
        model.addAttribute("orderList", order_total);
        return "client/pages/order-history";
    }
    
    // <editor-fold defaultstate="collapsed" desc="Look Up Beans Local">
    private OrderStateLessBeanLocal lookupOrderStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (OrderStateLessBeanLocal) c.lookup("java:global/fashionshop/OrderStateLessBean!spring.ejb.OrderStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private OrderStateFulBeanLocal lookupOrderStateFulBeanLocal() {
        try {
            Context c = new InitialContext();
            return (OrderStateFulBeanLocal) c.lookup("java:global/fashionshop/OrderStateFulBean!spring.ejb.OrderStateFulBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private ProductStateLessBeanLocal lookupProductStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (ProductStateLessBeanLocal) c.lookup("java:global/fashionshop/ProductStateLessBean!spring.ejb.ProductStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }// </editor-fold>

    
}
