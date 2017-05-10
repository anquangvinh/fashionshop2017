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
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.BlogCategories;
import spring.entity.Blogs;
import spring.functions.SharedFunctions;

@Controller
public class BlogController {

    BlogCategoriesSBLocal categoriesSB = lookupBlogCategoriesSBLocal();
    BlogsSBLocal blogsSB = lookupBlogsSBLocal();

    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    BlogCategoriesSBLocal blogCategoriesSB = lookupBlogCategoriesSBLocal();

    @Autowired
    SharedFunctions shareFunc;

    @Autowired
    ServletContext app;

    @RequestMapping(value = "/blog")
    public String blog(ModelMap model) {
        List<Blogs> getShowAllBlogs = blogsSB.getAllBlogs();
        List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
        model.addAttribute("blogListClient", getShowAllBlogs);
        model.addAttribute("blogCateListClient", getBlogCateList);
        model.addAttribute("PopularPosts", blogsSB.getAllBlogs());
        return "client/pages/blog";
    }

    @RequestMapping(value = "blog-categories/{blogCateID}")
    public String blog_categories(@PathVariable("blogCateID") Integer blogCateID, ModelMap model) {
        List<Blogs> getBlogsListByCate = blogsSB.getListBlogsByCategory(blogCateID);
        List<BlogCategories> getBlogCateList = blogCategoriesSB.getBlogCategoriesList();
//        model.addAttribute("PopularPostsBlogCate", blogsSB.getAllBlogs());
        model.addAttribute("getBlogCateList", getBlogCateList);
        model.addAttribute("getBlogsListByCate", getBlogsListByCate);
        model.addAttribute("PopularPosts", blogsSB.getAllBlogs());
        return "client/pages/blog-categories";
    }

    @RequestMapping(value = "blog-detail/{blogID}")
    public String blogdetail(@PathVariable("blogID") Integer blogID, ModelMap model) {
        Blogs getShowAllBlogsDetail = blogsSB.findBlogsByID(blogID);
        List<BlogCategories> getBlogCateListDetail = blogCategoriesSB.getBlogCategoriesList();
        model.addAttribute("getShowAllBlogsDetail", getShowAllBlogsDetail);
        model.addAttribute("getBlogCateListDetail", getBlogCateListDetail);
        model.addAttribute("PopularPosts", blogsSB.getAllBlogs());
        if (getShowAllBlogsDetail != null) {
            Blogs blogUpdateView = getShowAllBlogsDetail;
            blogUpdateView.setBlogViews(getShowAllBlogsDetail.getBlogViews() + 1);
            blogsSB.editBlogs(blogUpdateView);
        }
        return "client/pages/blog-details";
    }

    @RequestMapping(value = "blog-detail")
    public String blogdetail(ModelMap model) {
        model.addAttribute("getBlogCateListDetail", blogCategoriesSB.getBlogCategoriesList());
        model.addAttribute("getShowAllBlogsDetail", blogsSB.getAllBlogs());
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
}
