/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

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
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.Categories;

@Controller
@RequestMapping(value = "/admin/")
public class Product_Controller {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();
    
    /* 
     *    CATEGORY TREATMENT 
     */
    @RequestMapping(value = "product-category")
    public String productCateList(ModelMap model) {
        model.addAttribute("cateList", productStateLessBean.categoryList());
        return "admin/pages/product-category-list";
    }

    @RequestMapping(value = "product-category/create")
    public String productCateAdd() {
        return "admin/pages/product-category-add";
    }

    @RequestMapping(value = "product-category/{cateNameNA}-{cateID}", method = RequestMethod.GET)
    public String productCateUpdate(ModelMap model, @PathVariable("cateID") Integer cateID) {
        Categories targetCate = productStateLessBean.findCategoryByID(cateID);
        model.addAttribute("targetCate", targetCate);
        return "admin/pages/product-category-update";
    }

    /* 
     *    SUB-CATEGORY TREATMENT 
     */
    @RequestMapping(value = "product-subcategory")
    public String productSubCateList(ModelMap model) {
        model.addAttribute("subCateList", productStateLessBean.subCategoryList());
        return "admin/pages/product-subcategory-list";
    }

    @RequestMapping(value = "product-subcategory/create")
    public String productSubCateAdd() {
        return "admin/pages/product-subcategory-add";
    }

    @RequestMapping(value = "product-subcategory/edit")
    public String productSubCateUpdate() {
        return "admin/pages/product-subcategory-update";
    }
    
    /* 
     *    PRODUCT TREATMENT 
     */
    @RequestMapping(value = "product")
    public String productList(ModelMap model) {
        model.addAttribute("productList", productStateLessBean.productList());
        return "admin/pages/product-list";
    }

    @RequestMapping(value = "product/create")
    public String productAdd() {
        return "admin/pages/product-add";
    }

    @RequestMapping(value = "product/edit")
    public String productUpdate() {
        return "admin/pages/product-update";
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
