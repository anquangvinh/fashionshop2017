/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.client.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Objects;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.CartLineInfoByID;
import spring.entity.ProductColors;
import spring.entity.Products;

@Controller
public class ProductController {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @RequestMapping(value = "/category/{cateID}-{categoryNameNA}")
    public String categorylist(ModelMap model,
                                @PathVariable("cateID") Integer cateID) {
        List<Products> productsListByCate = productStateLessBean.getProductByCategory(cateID);
        if(productsListByCate != null){
            model.addAttribute("productsList", productsListByCate);
        } else {
            //đưa về trang lỗi.
        }
        return "client/pages/categories-list";
    }

    @RequestMapping(value = "category-grid")
    public String categorygrid() {
        return "client/pages/categories-grid";
    }

    @RequestMapping(value = "/{productID:[0-9]+}-{colorID:[0-9]+}-{productNameNA:[A-Za-z0-9-]+}")
    public String productdetail(ModelMap model,
            @PathVariable("productID") Integer productID,
            @PathVariable("colorID") Integer colorID
    ) {
        Products targetProduct = productStateLessBean.findProductByID(productID);
        if ((targetProduct != null)) {
            List<ProductColors> productColorList = targetProduct.getProductColorList();
            int count = 0;
            for (ProductColors color : productColorList) {
                if (Objects.equals(color.getColorID(), colorID)) {
                    count++;
                    break;
                }
            }

            if (count > 0) {
                ProductColors targetColor = productStateLessBean.findProductColorByColorID(colorID);
                model.addAttribute("targetProduct", targetProduct);
                model.addAttribute("targetColor", targetColor);
                CartLineInfoByID cartLineInfoByID = new CartLineInfoByID();
                model.addAttribute("cartLineInfoByID", cartLineInfoByID);
            } else {
                String error = "Product ko có color này!";
            }
        } else {
            String error = "Product ko có!";
        }

        return "client/pages/product-detail";
    }
    
    @ResponseBody
    @RequestMapping(value = "/ajax/findProduct", method = RequestMethod.POST)
    public String getProductByID(@RequestParam("productID") Integer productID) {
        Products targetProduct = productStateLessBean.findProductByID(productID);

        try {
            ObjectMapper mapper = new ObjectMapper();
            String result = mapper.writeValueAsString(targetProduct);
            return result;
        } catch (Exception e) {
            return "Error!" + e.getMessage();
        }

    }

    @ResponseBody
    @RequestMapping(value = "/ajax/color", method = RequestMethod.POST)
    public String getInforByColorID(@RequestParam("colorID") Integer colorID) {
        ProductColors color = productStateLessBean.findProductColorByColorID(colorID);
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            String result = mapper.writeValueAsString(color);
            return result;
        } catch (Exception e) {
            return ""+e.getMessage();
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
}
