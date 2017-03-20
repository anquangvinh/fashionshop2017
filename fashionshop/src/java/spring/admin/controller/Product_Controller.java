/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/admin/product/")
public class Product_Controller {

    @RequestMapping(value = "category")
    public String productCateList() {
        return "admin/pages/product-category-list";
    }
    
    @RequestMapping(value = "category/create")
    public String productCateAdd() {
        return "admin/pages/product-category-add";
    }
    
    @RequestMapping(value = "category/edit")
    public String productCateUpdate() {
        return "admin/pages/product-category-update";
    }
    
    @RequestMapping(value = "subcategory")
    public String productSubCateList() {
        return "admin/pages/product-subcategory-list";
    }
    
    @RequestMapping(value = "subcategory/create")
    public String productSubCateAdd() {
        return "admin/pages/product-subcategory-add";
    }
    
    @RequestMapping(value = "subcategory/edit")
    public String productSubCateUpdate() {
        return "admin/pages/product-subcategory-update";
    }
    
    @RequestMapping(value = "list")
    public String productList() {
        return "admin/pages/product-list";
    }
    
    @RequestMapping(value = "create")
    public String productAdd() {
        return "admin/pages/product-add";
    }
    
    @RequestMapping(value = "edit")
    public String productUpdate() {
        return "admin/pages/product-update";
    }
}
