/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.SubCategories;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/admin/")
public class Product_Controller {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @Autowired
    SharedFunctions shareFunc;

    /*========================================================================
     *                                                                       *
     *                          CATEGORY TREATMENT                           *
     *                                                                       *
     ========================================================================*/
    @RequestMapping(value = "product-category")
    public String productCateList(ModelMap model) {
        model.addAttribute("cateList", productStateLessBean.categoryList());
        return "admin/pages/product-category-list";
    }

    @RequestMapping(value = "product-category/create", method = RequestMethod.GET)
    public String productCateAdd(ModelMap model) {
        Categories newCate = new Categories();
        newCate.setStatus((short) 1);
        model.addAttribute("newCate", newCate);
        return "admin/pages/product-category-add";
    }

    @RequestMapping(value = "product-category/create", method = RequestMethod.POST)
    public String productCateAdd(ModelMap model, @ModelAttribute("newCate") Categories newCate, RedirectAttributes flashAttr) {
        newCate.setCateNameNA(shareFunc.changeText(newCate.getCateName()));
        int error_code = productStateLessBean.createNewCategory(newCate);
        if (error_code == 2) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Category has been existed!.\n"
                    + "</div>");
            model.addAttribute("newCate", newCate);
            return "admin/pages/product-category-add";
        } else if (error_code == 1) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Create New Category Successfully!.\n"
                    + "</div>");
            return "redirect:/admin/product-category/create.html";
        } else {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/product-category/create.html";
        }
    }

    @RequestMapping(value = "product-category/{cateNameNA}-{cateID}", method = RequestMethod.GET)
    public String productCateUpdate(ModelMap model, @PathVariable("cateID") Integer cateID) {
        Categories targetCate = productStateLessBean.findCategoryByID(cateID);
        model.addAttribute("targetCate", targetCate);
        return "admin/pages/product-category-update";
    }

    @RequestMapping(value = "product-category/{cateNameNA}-{cateID}", method = RequestMethod.POST)
    public String productCateUpdate(ModelMap model,
            RedirectAttributes flashAttr,
            @ModelAttribute("targetCate") Categories targetCate,
            @PathVariable("cateID") Integer cateID) {
        Categories oldCate = productStateLessBean.findCategoryByID(cateID);
        targetCate.setCateNameNA(shareFunc.changeText(targetCate.getCateName()));

        int errorCode = productStateLessBean.updateCategory(targetCate);
        if (errorCode == 1) { //Update thành công
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Update Category Successfully!.\n"
                    + "</div>");
            model.addAttribute("targetCate", targetCate);
            return "redirect:/admin/product-category/" + targetCate.getCateNameNA() + "-" + cateID + ".html";
        } else if (errorCode == 0) { //Update bị lỗi
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Error was happened!.\n"
                    + "</div>");
        } else if (errorCode == 2) { //Update lỗi trùng tên đã tồn tại trước đó
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-warning\">\n"
                    + "<strong>Danger!</strong> Category name \"" + targetCate.getCateName() + "\" existed!.\n"
                    + "</div>");
        }
        return "redirect:/admin/product-category/" + oldCate.getCateNameNA() + "-" + cateID + ".html";
    }

    /*========================================================================
     *                                                                       *
     *                       SUB-CATEGORY TREATMENT                          *
     *                                                                       *
     ========================================================================*/
    @RequestMapping(value = "product-subcategory")
    public String productSubCateList(ModelMap model) {
        model.addAttribute("subCateList", productStateLessBean.subCategoryList());
        return "admin/pages/product-subcategory-list";
    }

    @RequestMapping(value = "product-subcategory/create", method = RequestMethod.GET)
    public String productSubCateAdd(ModelMap model) {
        SubCategories subCategory = new SubCategories();
        model.addAttribute("subCategory", subCategory);
        return "admin/pages/product-subcategory-add";
    }

    @RequestMapping(value = "product-subcategory/create", method = RequestMethod.POST)
    public String productSubCateAdd(ModelMap model,
            @RequestParam("category.cateID") Integer cateID,
            @ModelAttribute("subCategory") SubCategories newSubCategory,
            RedirectAttributes flashAttr) {
        newSubCategory.setSubCateNameNA(shareFunc.changeText(newSubCategory.getSubCateName()));
        Categories cate = productStateLessBean.findCategoryByID(cateID);
        int errorCode = productStateLessBean.createNewSubCategory(newSubCategory);
        if (errorCode == 1) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Create New SubCategory Successfully!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/create.html";
        } else if (errorCode == 2) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Already have SubCategory<b>\"" + newSubCategory.getSubCateName() + "\"</b> in <b>\"" + cate.getCateName() + "\"</b>!.\n"
                    + "</div>");
            model.addAttribute("subCategory", newSubCategory);
            return "admin/pages/product-subcategory-add";
        } else {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Error! </strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/create.html";
        }
    }

    @RequestMapping(value = "product-subcategory/{subCateNameNA}-{subCateID}", method = RequestMethod.GET)
    public String productSubCateUpdate(ModelMap model,
            @PathVariable("subCateID") Integer subCateID) {
        SubCategories targetSubCategory = productStateLessBean.findSubCategoryByID(subCateID);
        model.addAttribute("targetSubCategory", targetSubCategory);
        return "admin/pages/product-subcategory-update";
    }

    @RequestMapping(value = "product-subcategory/{subCateNameNA}-{subCateID}", method = RequestMethod.POST)
    public String productSubCateUpdate(ModelMap model,
            @PathVariable("subCateID") Integer subCateID,
            @RequestParam("category.cateID") Integer cateID,
            RedirectAttributes flashAttr,
            @ModelAttribute("targetSubCategory") SubCategories targetSubCategory) {
        SubCategories oldCategory = productStateLessBean.findSubCategoryByID(subCateID);
        targetSubCategory.setSubCateNameNA(shareFunc.changeText(targetSubCategory.getSubCateName()));
        Categories cate = productStateLessBean.findCategoryByID(cateID);

        int errorCode = productStateLessBean.updateSubCategory(targetSubCategory);
        if (errorCode == 1) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-success\">\n"
                    + "<strong>Success!</strong> Update SubCategory Successfully!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/"+ targetSubCategory.getSubCateNameNA()+ "-" + subCateID +".html";
        } else if (errorCode == 2) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Already have SubCategory<b>\"" + targetSubCategory.getSubCateName() + "\"</b> in <b>\"" + cate.getCateName() + "\"</b>!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/"+ oldCategory.getSubCateNameNA()+ "-" + subCateID +".html";
        } else {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Error! </strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/"+ oldCategory.getSubCateNameNA()+ "-" + subCateID +".html";
        }
    }

    /*========================================================================
     *                                                                       *
     *                          PRODUCT TREATMENT                            *
     *                                                                       *
     ========================================================================*/
    @RequestMapping(value = "product")
    public String productList(ModelMap model) {
        model.addAttribute("productList", productStateLessBean.productList("admin"));
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

    /*========================================================================
     *                                                                       *
     *                              MISCELLANEOUS                            *
     *                                                                       *
     ========================================================================*/
    //Chuẩn bị dữ liệu cho select box Category
    @ModelAttribute("categories")
    public List<Categories> getAllCategory() {
        return productStateLessBean.categoryList();
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
