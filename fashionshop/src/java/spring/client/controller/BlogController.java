/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.client.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import spring.ejb.BlogCategoriesSBLocal;
import spring.ejb.BlogsSBLocal;
import spring.ejb.ProductStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.BlogCategories;
import spring.entity.Blogs;
import spring.entity.Categories;
import spring.functions.SharedFunctions;

@Controller
public class BlogController {

    BlogCategoriesSBLocal categoriesSB = lookupBlogCategoriesSBLocal();
    BlogsSBLocal blogsSB = lookupBlogsSBLocal();
    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    BlogCategoriesSBLocal blogCategoriesSB = lookupBlogCategoriesSBLocal();

    @Autowired
    SharedFunctions shareFunc;

    @Autowired
    ServletContext app;

//    @RequestMapping(value = "/blog")
//    public String blog(@PathVariable("blogCateID") Integer blogCateID, ModelMap model) {
//        List<Blogs> getBlogsListByCate = blogsSB.getListBlogsByCategory(blogCateID);
//        model.addAttribute("blogsListClient", getBlogsListByCate);  
//        return "client/pages/blog";
//    }
//    @RequestMapping(value = "/blog")
//    public String blog(ModelMap model) {
//        List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
//        model.addAttribute("blogCateListClient", getBlogCateList); 
//        return "client/pages/blog";
//    }
    @RequestMapping(value = "/blog")
    public String blog(ModelMap model) {
        List<Blogs> getShowAllBlogs = blogsSB.getAllBlogs();
        List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        model.addAttribute("blogListClient", getShowAllBlogs);
        model.addAttribute("blogCateListClient", getBlogCateList);
        return "client/pages/blog";
    }

    @RequestMapping(value = "/blog-categories/{blogCateID}", method = RequestMethod.POST)
    public String blog_categories(ModelMap model, @PathVariable("blogCateID") Integer blogCateID) {
        BlogCategories blogCategories = blogCategoriesSB.findCategoryByID(blogCateID);
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        if (blogCategories != null) {
            model.addAttribute("listBlog", blogCategories.getBlogList());
        }
//            BlogCategories blogCategories= blogCategoriesSB.findCategoryByID(blogCateID);
//        if (blogCategories != null) {
//            model.addAttribute("listBlog",blogCategories.getBlogList());
//        }
//        List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
//        model.addAttribute("blogCateListClient", getBlogCateList); 
        return "client/pages/blog-categories";
    }

    @RequestMapping(value = "/blog/detail")
    public String blogdetail(ModelMap model) {
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
//        , @PathVariable("blogCateID") Integer blogCateID 
//           List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
//           Blogs bloglistdetail = blogsSB.findBlogsByID(id);
//           if (id == null){
//               model.addAttribute("")
//           }
//        model.addAttribute("blogCateListClientDetail", getBlogCateList); 
        return "client/pages/blog-details";
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

    private BlogsSBLocal lookupBlogsSBLocal() {
        try {
            Context c = new InitialContext();
            return (BlogsSBLocal) c.lookup("java:global/fashionshop/BlogsSB!spring.ejb.BlogsSBLocal");
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
