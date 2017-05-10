package spring.client.controller;

import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.Products;

@Controller
public class GeneralController {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @RequestMapping(value = "/index")
    public String index(ModelMap model) {
        List<Categories> cateList = productStateLessBean.categoryList();
        for (Categories cate : cateList) {
            List<Products> productListByCate = cate.getProductList();
            Collections.shuffle(productListByCate);
        }
        List<Object> bestSellerList = productStateLessBean.getTop3ProductBestSeller();
        List<Products> mostViewList = productStateLessBean.getTop3ProductMostViewed();

        model.addAttribute("cateList", cateList);
        model.addAttribute("latestProducts", productStateLessBean.productList("client")); //lấy sản phẩm mới nhất
        model.addAttribute("bestSellerList", bestSellerList); //lấy sản phẩm bán chạy nhất
        model.addAttribute("mostViewList", mostViewList); //lấy sản phẩm xem nhiều nhất
        return "client/pages/index";
    }

    @RequestMapping(value = "/admin")
    public String admin(ModelMap model) {
        return "admin/login";
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
