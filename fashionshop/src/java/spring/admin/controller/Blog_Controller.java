/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/admin/blog/")
public class Blog_Controller {

    @RequestMapping(value = "category")
    public String blogCateList() {
        return "admin/pages/blog-category-list";
    }
    
    @RequestMapping(value = "category/create")
    public String blogCateAdd() {
        return "admin/pages/blog-category-add";
    }
    
    @RequestMapping(value = "category/edit")
    public String blogCateUpdate() {
        return "admin/pages/blog-category-update";
    }
    
    @RequestMapping(value = "list")
    public String blogList() {
        return "admin/pages/blog-list";
    }
    
    @RequestMapping(value = "create")
    public String blogAdd() {
        return "admin/pages/blog-add";
    }
    
    @RequestMapping(value = "edit")
    public String blogUpdate() {
        return "admin/pages/blog-update";
    }
}
