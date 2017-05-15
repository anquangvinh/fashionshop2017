/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import static javassist.CtMethod.ConstParameter.string;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
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

    @RequestMapping(value = "category/create", method = RequestMethod.GET)
    public String blogCateAdd(ModelMap model) {
        BlogCategories categories = new BlogCategories();
        model.addAttribute("categories", categories);
        return "admin/pages/blog-category-add";
    }

    @RequestMapping(value = "category/create", method = RequestMethod.POST)
    public String blogCateAdd(@ModelAttribute("categories") BlogCategories newBlogCate,
            RedirectAttributes redirectAttr, ModelMap model) {
        newBlogCate.setBlogCateNameNA(shareFunc.changeText(newBlogCate.getBlogCateName()));
        int checkError = categoriesSB.addNewBlogCategories(newBlogCate);
        if (checkError == 2) {
            model.addAttribute("error", "<div class=\"col-md-12  alert alert-danger\">Blog Category Name existed!.</div>");
            model.addAttribute("categories", newBlogCate);
            return "admin/pages/blog-category-add";
        } else if (checkError == 0) {
            redirectAttr.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-success\">Create New Categories Successfully!</div>");
            return "redirect:/admin/blog/category/create.html";
        } else {
            redirectAttr.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">Create New Categories FAILED!. Error was happened!</div>");
            return "redirect:/admin/blog/category/create.html";
        }
    }

    @RequestMapping(value = "category/edit/{blogCateID}", method = RequestMethod.GET)
    public String blogCateUpdate(ModelMap model, @PathVariable("blogCateID") Integer blogCateID) {
        BlogCategories targetBlogCategories = categoriesSB.findCategoryByID(blogCateID);
        model.addAttribute("targetBlogCategories", targetBlogCategories);
        return "admin/pages/blog-category-update";
    }

    @RequestMapping(value = "category/edit/{blogCateID}", method = RequestMethod.POST)
    public String blogCateUpdate(@ModelAttribute("targetBlogCategories") BlogCategories targetBlogCategories,
            RedirectAttributes redirectAttr,
            @PathVariable("blogCateID") Integer blogCateID) {
        targetBlogCategories.setBlogCateNameNA(shareFunc.changeText(targetBlogCategories.getBlogCateName()));
        if (blogCategoriesSB.updateCategories(targetBlogCategories)) {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-success\">Update Category Successfully!</div>");
        } else {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-success\">Error was happened!</div>");
        }
        return "redirect:/admin/blog/category/edit/" + blogCateID + ".html";

    }

    @RequestMapping(value = "list/{blogCateID}")
    public String blogList(@PathVariable("blogCateID") Integer blogCateID, ModelMap model) {
        List<Blogs> getBlogsListByCate = blogsSB.getListBlogsByCategory(blogCateID);
        model.addAttribute("blogsList", getBlogsListByCate);
        return "admin/pages/blog-list";
    }

    @RequestMapping(value = "list")
    public String blogList(ModelMap model) {
        model.addAttribute("blogsList", blogsSB.getAllBlogsAdmin());
        return "admin/pages/blog-list";
    }

    @RequestMapping(value = "listChart")
    public String blogListChart(ModelMap model) {
        return "admin/pages/blog-statistics";
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
            RedirectAttributes redirectAttr, HttpServletRequest Request) {

        String email = String.valueOf(Request.getSession().getAttribute("email"));
        if (email != null) {
            Users user = usersStateLessBean.findUserByEmail(email);
            if (user != null) {
                newBlogs.setUser(user);
            }
        }
        newBlogs.setBlogTitleNA(shareFunc.changeText(newBlogs.getBlogTitle()));
        newBlogs.setContent(Request.getParameter("editor1"));
        newBlogs.setPostedDate(new Date());
        newBlogs.setBlogViews(0);
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

        if (blogsSB.blogAdd(newBlogs)) {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-success\">Create New Blogs Successfully!</div>");
        } else {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-danger\">Create New Blogs FAILED!. Error was happened!</div>");
        }
        Blogs blogs = new Blogs();
        redirectAttr.addFlashAttribute("blogs", blogs);
        return "redirect:/admin/blog/create.html";

    }

    //Chuẩn bị dữ liệu cho selectbox blogcategory.
    @ModelAttribute("blogcategory")
    public List<BlogCategories> getAllCategories() {
        return categoriesSB.getBlogCategoriesList();
    }

    //Chuẩn bị dữ liệu cho selectbox user
    @ModelAttribute("user")
    public List<Users> getAllUserss() {
        return userSB.getAllUsers();
    }

    @RequestMapping(value = "edit/{blogID}", method = RequestMethod.GET)
    public String blogUpdate(@PathVariable("blogID") Integer blogID,
            ModelMap model) {
        Blogs targetBlogs = blogsSB.findBlogsByID(blogID);
        //Change normal date to string
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date date = targetBlogs.getPostedDate();
        String formattedDate = dateFormat.format(date);
        model.addAttribute("formattedDate", formattedDate);
        model.addAttribute("targetBlogs", targetBlogs);
        // Hien thi img trong update
//        model.addAttribute("upImage", targetBlogs.getBlogImg());
        model.addAttribute("editor1", targetBlogs.getContent());

        return "admin/pages/blog-update";
    }

    @RequestMapping(value = "edit/{blogID}", method = RequestMethod.POST)
    public String blogUpdate(@ModelAttribute("targetBlogs") Blogs updatedTargetBlogs,
            @PathVariable("blogID") Integer blogID,
            @RequestParam("upImage") MultipartFile image,
            RedirectAttributes redirectAttr, HttpServletRequest Request) {
        Blogs normalTargetProduct = blogsSB.findBlogsByID(blogID); //Blogs Khi chưa chỉnh sửa

        String email = String.valueOf(Request.getSession().getAttribute("email"));
        if (email != null) {
            Users user = usersStateLessBean.findUserByEmail(email);
            if (user != null) {
                updatedTargetBlogs.setUser(user);
            }
        }

        updatedTargetBlogs.setBlogTitleNA(shareFunc.changeText(updatedTargetBlogs.getBlogTitle()));
        updatedTargetBlogs.setPostedDate(new Date());
        updatedTargetBlogs.setContent(Request.getParameter("editor1"));
        try {
            if (!image.isEmpty()) {
                updatedTargetBlogs.setBlogImg(image.getOriginalFilename());
                String path = app.getRealPath("/assets/images/") + "/" + updatedTargetBlogs.getBlogImg();
                image.transferTo(new File(path));
            } else {
                updatedTargetBlogs.setBlogImg(normalTargetProduct.getBlogImg());
            }
        } catch (IOException | IllegalStateException ex) {
            Logger.getLogger(Blog_Controller.class.getName()).log(Level.SEVERE, null, ex);
        }

        if (blogsSB.editBlogs(updatedTargetBlogs)) {
            Blogs afterUpdateBlogs = blogsSB.findBlogsByID(blogID);
            //Change normal date to string
            DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date date = afterUpdateBlogs.getPostedDate();
            String formattedDate = dateFormat.format(date);
            redirectAttr.addFlashAttribute("formattedDate", formattedDate);

            redirectAttr.addFlashAttribute("targetBlogs", afterUpdateBlogs);
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-success\">Update Blogs Info Successfully!</div>");
        } else {
            redirectAttr.addFlashAttribute("status", "<div class=\"col-md-12  alert alert-danger\">Update Blogs Info FAILED!. Error was happened!</div>");
        }

        return "redirect:/admin/blog/edit/" + blogID + ".html";
    }

    @RequestMapping(value = "/delete/{blogCateID}", method = RequestMethod.GET)
    public String deleteCategory(@PathVariable("blogCateID") Integer blogCateID,
            RedirectAttributes flashAttr) {
        BlogCategories blogcate = blogCategoriesSB.findCategoryByID(blogCateID);
        if (blogcate != null) {
            int errorCheck = blogCategoriesSB.deleteCategory(blogcate);
            if (errorCheck == 1) {
                flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">"
                        + "<strong>Blog category: " + blogcate.getBlogCateName() + " Deleted</strong></div>");
                return "redirect:/admin/blog/category.html";
            } else if (errorCheck == 0) {
                flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">"
                        + "<strong>All blogs in blog category must DISABLE</strong></div>");
                return "redirect:/admin/blog/category.html";
            }else{
                flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">"
                        + "<strong>Delete process have error</strong></div>");
                return "redirect:/admin/blog/category.html";
            }
        }
        flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">"
                + "<strong>Can't find Blog Category ID</strong></div>");
        return "redirect:/admin/blog/category.html";
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
