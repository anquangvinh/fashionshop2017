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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.OrderStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.DiscountVoucher;
import spring.entity.Orders;
import spring.entity.OrdersDetail;

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
            model.addAttribute("orderdetailList", orderStateLessBean.getAllOrderDetailByOrderID(orderid));
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
        return "admin/pages/orders-list-detail-add";
    }
    
    @ModelAttribute("categories")
    public List<Categories> getCategory(){
        return orderStateLessBean.getAllCategory();
    }
    
    @RequestMapping(value = "discountadd", method = RequestMethod.GET)
    public String discountadd(ModelMap model){
        DiscountVoucher discountVoucher = new DiscountVoucher();
        model.addAttribute("discountVoucher", discountVoucher);
        return "admin/pages/discount-add";
    }
    
    @RequestMapping(value = "discountadd", method = RequestMethod.POST)
    public String discountadd(ModelMap model, @ModelAttribute("discountVoucher") DiscountVoucher newDiscountVoucher, 
              RedirectAttributes flashAttr){
        newDiscountVoucher.setDiscount(newDiscountVoucher.getDiscount()/100);
        int checkSta = orderStateLessBean.createDiscountVoucher(newDiscountVoucher);
        if (checkSta == 2) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Discount Code has been existed!.\n"
                    + "</div>");
            model.addAttribute("discountVoucher", newDiscountVoucher);
            return "admin/pages/discount-add";
        }else if(checkSta == 0){
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/orders/discountadd.html";
        }else{
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Create New Discount Voucher Successfully!.\n"
                    + "</div>");
            return "redirect:/admin/orders/discountadd.html";
        }
    }
    
    @RequestMapping(value = "discountupdate/{voucherID}", method = RequestMethod.GET)
    public String discountupdate(@PathVariable("voucherID") String voucherID, ModelMap model, RedirectAttributes flashAttr){
        DiscountVoucher targetDiscountVoucher = orderStateLessBean.getDiscountVoucherByID(voucherID);
        if (targetDiscountVoucher != null) {
            model.addAttribute("targetDiscountVoucher", targetDiscountVoucher);
            return "admin/pages/discount-update";
        }else{
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Voucher not found.\n"
                    + "</div>");
            return "redirect:/admin/orders/discountlist.html"; 
        }
    }
    
    @RequestMapping(value = "discountupdate/{voucherID}", method = RequestMethod.POST)
    public String discountupdate(@PathVariable("voucherID") String voucherID, ModelMap model, 
              @ModelAttribute("targetDiscountVoucher") DiscountVoucher targetDiscountVoucher, RedirectAttributes flashAttr){
        targetDiscountVoucher.setDiscount(targetDiscountVoucher.getDiscount()/100);
        int checkSta = orderStateLessBean.updateDiscountVoucher(targetDiscountVoucher);
        if (checkSta == 2) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Voucher not found.\n"
                    + "</div>");
            model.addAttribute("targetDiscountVoucher", targetDiscountVoucher);
            return "admin/pages/discount-update";
        }else if (checkSta == 0) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/orders/discountupdate/"+voucherID+".html";
        }else{
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Discount Voucher "+voucherID+" update Successfully!.\n"
                    + "</div>");
            return "redirect:/admin/orders/discountupdate/"+voucherID+".html";
        }
    }

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
