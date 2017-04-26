package spring.client.controller;

import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.OrderStateFulBeanLocal;
import spring.ejb.OrderStateLessBeanLocal;
import spring.ejb.ProductStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.CartLineInfo;
import spring.entity.CartLineInfoByID;
import spring.entity.Orders;
import spring.entity.Products;
import spring.entity.SizesByColor;
import spring.entity.Users;

@Controller
@RequestMapping(value = "/orders/")
public class OrdersController {

    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();
    OrderStateFulBeanLocal orderStateFulBean = lookupOrderStateFulBeanLocal();
    OrderStateLessBeanLocal orderStateLessBean = lookupOrderStateLessBeanLocal();

    @RequestMapping(value = "addtocart", method = RequestMethod.POST)
    public String addtocart(ModelMap model, @ModelAttribute("cartLineInfoByID") CartLineInfoByID newCartLineInfoByID,
              RedirectAttributes flashAttr) {
        Products pro = orderStateLessBean.getProductByID(newCartLineInfoByID.getProductID());
        SizesByColor sizesByColor = orderStateLessBean.getSizesByColorBySizeIDandColorID(newCartLineInfoByID.getSizeID(),
                  newCartLineInfoByID.getColorID());
        if (pro != null) {
            if (newCartLineInfoByID.getColorID() == 0 || newCartLineInfoByID.getSizeID() == 0) {
                flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                          + "<strong>Danger!</strong> Please choose color and size!.\n"
                          + "</div>");
                return "redirect:/" + pro.getProductID() + "-" + pro.getProductColorList().get(0).getColorID() + "-" + pro.getProductNameNA() + ".html";
            } else {
                if (sizesByColor != null) {
                    CartLineInfo cartLineInfo = new CartLineInfo();
                    cartLineInfo.setProduct(pro);
                    cartLineInfo.setSizesByColor(sizesByColor);
                    cartLineInfo.setQuantity(newCartLineInfoByID.getQuantity());
                    orderStateFulBean.addProduct(cartLineInfo);
                    flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                              + "<strong>Success!</strong> Add Product to Cart Successfully!.\n"
                              + "</div>");
                    return "redirect:/" + pro.getProductID() + "-" + pro.getProductColorList().get(0).getColorID() + "-" + pro.getProductNameNA() + ".html";
                }
                flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                          + "<strong>Danger!</strong> Color and Size error!.\n"
                          + "</div>");
                return "redirect:/" + pro.getProductID() + "-" + pro.getProductColorList().get(0).getColorID() + "-" + pro.getProductNameNA() + ".html";
            }
        }
        return "redirect:/index.html";
    }

    @RequestMapping(value = "checkout", method = RequestMethod.GET)
    public String checkout(ModelMap model, HttpServletRequest request) {
        String email = String.valueOf(request.getSession().getAttribute("emailUser      A"));
        if (email == null) {
            return "redirect:/user/login.html";
        }
        Users users = usersStateLessBean.findUserByEmail(email);
        if (users != null) {
            model.addAttribute("userAddressList", orderStateLessBean.getUserAddressListByUserID(users.getUserID()));
        }
        model.addAttribute("cartList", orderStateFulBean.showCart());
        model.addAttribute("grandTotal", orderStateFulBean.subTotal());
        return "client/pages/checkout";
    }

    @RequestMapping(value = "shoppingcart")
    public String shoppingcart(ModelMap model, HttpServletRequest request) {
        model.addAttribute("cartList", orderStateFulBean.showCart());
        model.addAttribute("grandTotal", orderStateFulBean.subTotal());
        return "client/pages/shoppingcart";
    }

    @RequestMapping(value = "updatecart", method = RequestMethod.POST)
    public String updatecart(ModelMap model, HttpServletRequest request, RedirectAttributes flashAttr) {
        for (CartLineInfo cartLineInfo : orderStateFulBean.showCart()) {
            String codeIdentify = cartLineInfo.getProduct().getProductID() + "-"
                      + cartLineInfo.getSizesByColor().getSizeID() + "-"
                      + cartLineInfo.getSizesByColor().getColor().getColorID();
            if (request.getParameter(codeIdentify) != null) {
                CartLineInfo oldCartLineInfo = cartLineInfo;
                cartLineInfo.setQuantity(Integer.parseInt(request.getParameter(codeIdentify)));
                orderStateFulBean.updateProduct(oldCartLineInfo, cartLineInfo);
            }
        }
        flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                  + "<strong>Success!</strong> Update Cart Successfully!.\n"
                  + "</div>");
        return "redirect:/orders/shoppingcart.html";
    }

    @RequestMapping(value = "deleteitemCart/{productid}/{sizeID}/{colorID}", method = RequestMethod.GET)
    public String deleteitemCart(@PathVariable("productid") int productid,
              @PathVariable("sizeID") int sizeid,
              @PathVariable("colorID") int colorid,
              RedirectAttributes flashAttr) {
        CartLineInfo cartLineInfo = orderStateFulBean.getProductInListByID(productid, sizeid, colorid);
        if (cartLineInfo != null) {
            orderStateFulBean.deleteProduct(cartLineInfo);
        }
        flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                  + "<strong>Success!</strong> Delete Item in Cart Successfully!.\n"
                  + "</div>");
        return "redirect:/orders/shoppingcart.html";
    }

    @ResponseBody
    @RequestMapping(value = "deleteitemCartInHeader", method = RequestMethod.POST)
    public String deleteitemCartInHeader(@RequestParam("productID") Integer productid,
              @RequestParam("sizeID") Integer sizeid,
              @RequestParam("colorID") Integer colorid) {
        CartLineInfo cartLineInfo = orderStateFulBean.getProductInListByID(productid, sizeid, colorid);
        if (cartLineInfo != null) {
            orderStateFulBean.deleteProduct(cartLineInfo);
        }
        return getCart();
    }

    @RequestMapping(value = "order-history")
    public String orderhistory(ModelMap model) {
        HashMap<Orders, Float> order_total = new HashMap<>();
        for (Orders orders : orderStateLessBean.getOrderListByUserID(5)) {
            order_total.put(orders, orderStateLessBean.sumTotalOrderDetail(orders.getOrderDetailList()));
        }
        model.addAttribute("orderList", order_total);
        return "client/pages/order-history";
    }

    @ResponseBody
    @RequestMapping(value = "ajax/cart", method = RequestMethod.GET)
    public String getCart() {
        String str_cart_detail = "";
        String str_cart_big = "";
        String str_cart_button = "";
        String str_subtotal = "";
        float subTotal = 0;
        int cartSize = 0;
        if (orderStateFulBean.showCart().size() == 0) {
            subTotal = 0;
            cartSize = 0;
//            str_cart_small = "<div class=\"ci-item\">\n"
//                      + "<p>You have no product in cart</p>\n"
//                      + "    </div>";
        } else {
            subTotal = orderStateFulBean.subTotal();
            cartSize = orderStateFulBean.showCart().size();
            str_cart_button = "<div class=\"cart-btn\">\n"
                      + "                                <a href=\"orders/shoppingcart.html\">View Bag</a>\n"
                      + "                                <a href=\"orders/checkout.html\">Checkout</a>\n"
                      + "                            </div>";
            str_subtotal = "<div class=\"ci-total\">Subtotal: $" + subTotal + "</div>";
            for (CartLineInfo cartLineInfo : orderStateFulBean.showCart()) {
                str_cart_detail += "<div class=\"ci-item\">\n"
                          + "        <img src=\"assets/images/products/" + cartLineInfo.getProduct().getUrlImg() + "\" width=\"90\" alt=\"\"/>\n"
                          + "        <div class=\"ci-item-info\">\n"
                          + "            <h5>\n"
                          + "                <a href=\"" + cartLineInfo.getProduct().getProductID() + "-" + cartLineInfo.getProduct().getProductColorList().get(0).getColorID() + "-" + cartLineInfo.getProduct().getProductNameNA() + ".html\">\n"
                          + "                    " + cartLineInfo.getProduct().getProductName() + "\n"
                          + "                </a>\n"
                          + "            </h5>\n"
                          + "<p>&nbsp Size: " + cartLineInfo.getSizesByColor().getProductSize() + "\n"
                          + "                                            <img fs-color=\"" + cartLineInfo.getSizesByColor().getColor().getColorID() + "\" \n"
                          + "                                                 src=\"assets/images/products/colors/" + cartLineInfo.getSizesByColor().getColor().getUrlColorImg() + "\" \n"
                          + "                                                 class=\"img-responsive\" \n"
                          + "                                                 alt=\"" + cartLineInfo.getSizesByColor().getColor().getUrlColorImg() + "\" \n"
                          + "                                                 title=\"" + cartLineInfo.getSizesByColor().getColor().getColor() + "\"\n"
                          + "                                                 style=\"width: 18px; height: 18px;\"/>\n"
                          + "                                        </p>"
                          + "            <p>&nbsp " + cartLineInfo.getQuantity() + " &nbsp x $" + cartLineInfo.getProduct().getPrice() + "</p>\n"
                          + "            <div class=\"ci-edit\">\n"
                          + "                <!--<a href=\"#\" class=\"edit fa fa-edit\"></a>-->\n"
                          + "                <button onclick=\"deleteItem(" + cartLineInfo.getProduct().getProductID() + "," + cartLineInfo.getSizesByColor().getSizeID() + "," + cartLineInfo.getSizesByColor().getColor().getColorID() + ");\" class=\"edit fa fa-trash\"></button>\n"
                          + "            </div>\n"
                          + "        </div>\n"
                          + "    </div>";
            }
        }
        str_cart_big = "<span><i class=\"fa fa-shopping-cart\"></i></span>\n"
                  + "<div class=\"cart-info\">\n"
                  + "<small>You have <em class=\"highlight\">" + cartSize + " item(s)</em> in your shopping bag</small>\n"
                  + str_cart_detail
                  + str_subtotal
                  + str_cart_button
                  + "                        </div>";

        return str_cart_big;
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
    }

    private UsersStateLessBeanLocal lookupUsersStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (UsersStateLessBeanLocal) c.lookup("java:global/fashionshop/UsersStateLessBean!spring.ejb.UsersStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }// </editor-fold>

}
