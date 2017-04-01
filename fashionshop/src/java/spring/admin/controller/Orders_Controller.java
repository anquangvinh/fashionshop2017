/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import spring.ejb.OrderStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.Orders;
import spring.entity.OrdersDetail;
import spring.entity.SubCategories;

@Controller
@RequestMapping(value = "/admin/orders/")
public class Orders_Controller {
    OrderStateLessBeanLocal orderStateLessBean = lookupOrderStateLessBeanLocal();
    
    @RequestMapping(value = "list")
    public String ordersList(ModelMap model) {
        model.addAttribute("orderList", orderStateLessBean.getAllOrder());
        return "admin/pages/orders-list";
    }
    
    @RequestMapping(value = "discountlist")
    public String discountlist(ModelMap model) {
        model.addAttribute("discountList", orderStateLessBean.getAllDiscountVoucher());
        return "admin/pages/discount-list";
    }
    
    @RequestMapping(value = "confirmstatusOrder/{orderid}/{status}", method = RequestMethod.GET)
    public String confirmstatusOrder(@PathVariable("orderid") int orderid, @PathVariable("status") short status){
        Orders order = orderStateLessBean.getOrderByID(orderid);
        if (order != null) {
            if (orderStateLessBean.confirmStatusOrder(order, status)) {
                return "redirect:/admin/orders/list.html";
            }
        }
        return "redirect:/admin/orders/list.html";
    }
    
    @RequestMapping(value = "orderlistdetail/{orderid}", method = RequestMethod.GET)
    public String orderlistdetail(@PathVariable("orderid") int orderid, ModelMap model){
        Orders order = orderStateLessBean.getOrderByID(orderid);
        if (order != null) {
            model.addAttribute("orderID",orderid);
            model.addAttribute("orderdetailList", order.getOrderDetailList());
            model.addAttribute("orderTotal", orderStateLessBean.sumTotalOrderDetail(order.getOrderDetailList()));
            return "admin/pages/orders-list-detail";
        }
        return "redirect:/admin/orders/list.html";
    }
    
    @RequestMapping(value = "confirmstatusOrderDetail/{orderdetailid}/{status}", method = RequestMethod.GET)
    public String confirmstatusOrderDetail(@PathVariable("orderdetailid") int orderdetailid, @PathVariable("status") short status){
        OrdersDetail orderDetail = orderStateLessBean.getOrderDetailByID(orderdetailid);
        if (orderDetail != null) {
            if (orderStateLessBean.confirmStatusOrderDetail(orderDetail, status)) {
                return "redirect:/admin/orders/orderlistdetail/"+orderDetail.getOrder().getOrdersID()+".html";
            }
        }
        return "redirect:/admin/orders/orderlistdetail/"+orderDetail.getOrder().getOrdersID()+".html";
    }
    
    @RequestMapping(value = "ordersdetailadd")
    public String ordersdetailadd(ModelMap model){
        OrdersDetail ordersDetail = new OrdersDetail();
        model.addAttribute("orderDetail", ordersDetail);
        return "admin/pages/orders-list-add";
    }
    
    @ModelAttribute("categories")
    public List<Categories> getCategory(){
        return orderStateLessBean.getAllCategory();
    }
    
//    @ModelAttribute("sub-categories")
//    public List<SubCategories> getSubCategoryByCateID(int id){
//        return orderStateLessBean.getSubCategoryByCateID(id);
//    }
    
//    @RequestMapping(value = "getSubCategoryByCateID", method = RequestMethod.GET)
//    public void getSubCategoryByCateID(@RequestParam("cateID") String id, ModelMap model){
//        
//    }

    private OrderStateLessBeanLocal lookupOrderStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (OrderStateLessBeanLocal) c.lookup("java:global/fashionshop/OrderStateLessBean!spring.ejb.OrderStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
