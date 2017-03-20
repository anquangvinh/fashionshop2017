/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/product/")
public class ProductController {

    @RequestMapping(value = "category-list")
    public String categorylist() {
        return "client/pages/categories-list";
    }
    
    @RequestMapping(value = "category-grid")
    public String categorygrid() {
        return "client/pages/categories-grid";
    }
    
    @RequestMapping(value = "product-details")
    public String productdetail(){
        return "client/pages/product-detail";
    }
}
