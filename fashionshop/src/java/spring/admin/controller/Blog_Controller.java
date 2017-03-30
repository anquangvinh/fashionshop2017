/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.BlogsSBLocal;
import spring.ejb.BlogCategoriesSBLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.BlogCategories;
import spring.entity.Blogs;
import spring.entity.Users;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/admin/blog/")
public class Blog_Controller { 
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    BlogCategoriesSBLocal blogCategoriesSB = lookupBlogCategoriesSBLocal();
    
    @Autowired
    SharedFunctions shareFunc;

    @Autowired
    ServletContext app;
    
    BlogCategoriesSBLocal categoriesSB = lookupBlogCategoriesSBLocal();
    BlogsSBLocal blogsSB = lookupBlogsSBLocal();
    
    UsersStateLessBeanLocal userSB = lookupUsersStateLessBeanLocal();
   

    @RequestMapping(value = "category")
    public String blogCateList(ModelMap model) {
//        List<Blogs> blogListByCategory = blogsSB.getListBlogsByCategory(blogCateID);
//        model.addAttribute("blogListByCategory", blogListByCategory);
//        return "admin/pages/blog-category-list";
          List<BlogCategories> blogCategoriesList = categoriesSB.getBlogCategoriesList();
        model.addAttribute("blogCategoriesList", blogCategoriesList);
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
    
    @RequestMapping(value = "list/{blogCateID}")
    public String blogList(@PathVariable("blogCateID") Integer blogCateID, ModelMap model) {
        List<Blogs> getBlogsListByCate = blogsSB.getListBlogsByCategory(blogCateID);
        model.addAttribute("blogsList", getBlogsListByCate);
        return "admin/pages/blog-list";
    }
    
    @RequestMapping(value = "list")
    public String blogList(ModelMap model) {
        model.addAttribute("blogsList", blogsSB.getAllBlogs());
        return "admin/pages/blog-list";
    }
    
    @RequestMapping(value = "create", method = RequestMethod.GET)
    public String blogAdd(ModelMap model) {
        Blogs newBlogs = new Blogs();
        model.addAttribute("newBlogs", newBlogs);
        return "admin/pages/blog-add";
    }
    
     @RequestMapping(value = "create", method = RequestMethod.POST)
    public String blogAdd(@ModelAttribute("newBlogs") Blogs newBlogs,
            @RequestParam("upImage") MultipartFile image,
            RedirectAttributes redirectAttr){
        
        newBlogs.setBlogTitleNA(shareFunc.changeText(newBlogs.getBlogTitle()));
        try {
            if (image.isEmpty()) {
                newBlogs.setBlogImg("defaultProduct.png");
            } else {
                newBlogs.setBlogImg(image.getOriginalFilename());
                String path = app.getRealPath("/assets/images/") + "/" + newBlogs.getBlogImg();
                image.transferTo(new File(path));
            }
        } catch (IOException | IllegalStateException ex) {
            Logger.getLogger(Blog_Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        if(blogsSB.blogAdd(newBlogs)) {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-success\">Create New Blogs Successfully!</div>");
        } else {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-danger\">Create New Blogs FAILED!. Error was happened!</div>");
        }
        Blogs blogs = new Blogs();
        redirectAttr.addFlashAttribute("blogs", blogs);
        return "redirect:/admin/pages/create.html";
 
    }
    
    //Chuẩn bị dữ liệu cho selectbox blogcategory
    @ModelAttribute("blogcategory")
    public List<BlogCategories> getAllCategories(){
        return categoriesSB.getBlogCategoriesList();
    }
    
    //Chuẩn bị dữ liệu cho selectbox user
    @ModelAttribute("user")
    public List<Users> getAllUserss(){
        return userSB.getAllUsers();
    }
    
    
    @RequestMapping(value = "edit")
    public String blogUpdate() {
        return "admin/pages/blog-update";
    }

    private BlogsSBLocal lookupBlogsSBLocal() {
        try {
            Context c = new InitialContext();
            return (BlogsSBLocal) c.lookup("java:global/fashionshop/BlogsSB!spring.ejb.BlogsSBLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private BlogCategoriesSBLocal lookupBlogCategoriesSBLocal() {
        try {
            Context c = new InitialContext();
            return (BlogCategoriesSBLocal) c.lookup("java:global/fashionshop/BlogCategoriesSB!spring.ejb.BlogCategoriesSBLocal");
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
    }

   
    
}

