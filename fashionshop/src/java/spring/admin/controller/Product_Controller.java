/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.ProductColors;
import spring.entity.ProductSubImgs;
import spring.entity.Products;
import spring.entity.SizesByColor;
import spring.entity.SubCategories;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/admin/")
public class Product_Controller {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @Autowired
    SharedFunctions shareFunc;

    @Autowired
    ServletContext app;

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
            return "redirect:/admin/product-subcategory/" + targetSubCategory.getSubCateNameNA() + "-" + subCateID + ".html";
        } else if (errorCode == 2) {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Danger!</strong> Already have SubCategory<b>\"" + targetSubCategory.getSubCateName() + "\"</b> in <b>\"" + cate.getCateName() + "\"</b>!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/" + oldCategory.getSubCateNameNA() + "-" + subCateID + ".html";
        } else {
            flashAttr.addFlashAttribute("error", "<div class=\"alert alert-danger\">\n"
                    + "<strong>Error! </strong> Error was happened!.\n"
                    + "</div>");
            return "redirect:/admin/product-subcategory/" + oldCategory.getSubCateNameNA() + "-" + subCateID + ".html";
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

    @RequestMapping(value = "product/create", method = RequestMethod.GET)
    public String productAdd() {
        return "admin/pages/product-add";
    }

    @RequestMapping(value = "product/create", method = RequestMethod.POST)
    public String productAdd(HttpServletRequest request,
            ModelMap model,
            @RequestParam MultiValueMap<String, String> allRequestParams,
            RedirectAttributes flashAttr) {
        String productName = allRequestParams.get("productName").get(0);
        if(productStateLessBean.checkDuplicateProductName(productName)){
            model.addAttribute("error", "<div class=\"col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger\">\n"
                    + "<strong>Error!</strong> Duplicate Product Name !.\n"
                    + "</div>");
            return "admin/pages/product-add";
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd_HH_mm_ss");
        int cateID = Integer.parseInt(allRequestParams.get("category").get(0));
        int subCateID = Integer.parseInt(allRequestParams.get("subCategory").get(0));
        
        Float price = Float.parseFloat(allRequestParams.get("price").get(0));
        Short discount = Short.parseShort(allRequestParams.get("discount").get(0));
        String description = allRequestParams.get("description").get(0);
        List<String> colorList = allRequestParams.get("color");
        List<MultipartFile> colorImgs = ((DefaultMultipartHttpServletRequest) request).getFiles("colorImg[]");

        Products product = new Products();

        //Load thông tin category theo cateID
        Categories cate = productStateLessBean.findCategoryByID(cateID);

        //Load thông tin subCategory theo subCateID;
        SubCategories subCate = productStateLessBean.findSubCategoryByID(subCateID);

        //Load List<productColors>
        List<ProductColors> productColorsList = new ArrayList<>();

        for (int i = 0; i < colorList.size(); i++) {
            ProductColors productColor = new ProductColors();
            productColor.setColor(colorList.get(i));
            productColor.setColorNA(shareFunc.changeText(colorList.get(i)));
            productColor.setStatus((short) 1);
            productColor.setProduct(product);
            productColor.setColorOrder(i);
            
            //setUrlColorImg
            MultipartFile colorImg = colorImgs.get(i);
            if (!colorImg.isEmpty()) {
                //set productColor UrlColorImg
                productColor.setUrlColorImg(simpleDateFormat.format(new Date()) + shareFunc.changeText(colorImg.getOriginalFilename())); //Tên hình

                //Luu file duong dan
                String path = app.getRealPath("/assets/images/products/colors/") + "/" + productColor.getUrlColorImg();
                try {
                    colorImg.transferTo(new File(path));
                } catch (IOException | IllegalStateException ex) {
                    Logger.getLogger(Product_Controller.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            //set List<SizeByColor>
            List<SizesByColor> sizeList = new ArrayList<>();
            if (i == 0) {
                List<String> sizeListFromClient = allRequestParams.get("size");
                for (int j = 0; j < sizeListFromClient.size(); j++) {
                    SizesByColor size = new SizesByColor();
                    size.setProductSize(sizeListFromClient.get(j).toUpperCase());
                    size.setQuantity(Integer.parseInt(allRequestParams.get("quantity").get(j)));
                    size.setSizeOrder(j);
                    size.setStatus((short) 1);
                    size.setColor(productColor);
                    sizeList.add(size);
                }
            } else {
                List<String> sizeListFromClient = allRequestParams.get("size_" + i);
                for (int j = 0; j < sizeListFromClient.size(); j++) {
                    SizesByColor size = new SizesByColor();
                    size.setProductSize(sizeListFromClient.get(j).toUpperCase());
                    size.setQuantity(Integer.parseInt(allRequestParams.get("quantity_" + i).get(j)));
                    size.setSizeOrder(j);
                    size.setStatus((short) 1);
                    size.setColor(productColor);
                    sizeList.add(size);
                }
            }
            productColor.setSizeList(sizeList);

            //set List<ProductSubImg>
            List<ProductSubImgs> productSubImgsList = new ArrayList<>();
            List<MultipartFile> subImgsList;
            if (i == 0) {
                subImgsList = ((DefaultMultipartHttpServletRequest) request).getFiles("productSubImg[]");
            } else {
                subImgsList = ((DefaultMultipartHttpServletRequest) request).getFiles("productSubImg_" + i + "[]");
            }
            int k = 0;
            for (MultipartFile file : subImgsList) {
                k++;
                ProductSubImgs psi = new ProductSubImgs();
                //set urlimg
                psi.setUrlImg(simpleDateFormat.format(new Date()) + shareFunc.changeText(file.getOriginalFilename()));
                psi.setSubImgOrder(k);
                //Luu file vao duong dan
                String subImgPath = app.getRealPath("/assets/images/products/subImg/") + "/" + psi.getUrlImg();
                try {
                    file.transferTo(new File(subImgPath));
                } catch (IOException | IllegalStateException ex) {
                    Logger.getLogger(Product_Controller.class.getName()).log(Level.SEVERE, null, ex);
                }
                psi.setProductColor(productColor);
                productSubImgsList.add(psi);
            }
            productColor.setProductSubImgsList(productSubImgsList);

            productColorsList.add(productColor);
        }

        //Load Main IMG
        MultipartFile mainImgFile = ((DefaultMultipartHttpServletRequest) request).getFile("urlImg");
        if (mainImgFile.isEmpty()) {
            model.addAttribute("mainImgFileError", "Product Image cannot be empty!");
        } else {
            //set product urlImg
            product.setUrlImg(simpleDateFormat.format(new Date()) + shareFunc.changeText(mainImgFile.getOriginalFilename()));

            //luu file vào duong dan
            String path = app.getRealPath("/assets/images/products/") + "/" + product.getUrlImg();
            try {
                mainImgFile.transferTo(new File(path));
            } catch (IOException | IllegalStateException ex) {
                Logger.getLogger(Product_Controller.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        product.setCategory(cate);
        product.setSubCate(subCate);
        product.setProductName(productName);
        product.setProductNameNA(shareFunc.changeText(productName));
        product.setPrice(price);
        product.setProductDescription(description);
        product.setProductDiscount(discount);
        product.setPostedDate(new Date());
        product.setProductViews(0);
        product.setStatus((short) 1);
        product.setProductColorList(productColorsList);

        if(productStateLessBean.createNewProduct(product)){
            flashAttr.addFlashAttribute("error", "<div class=\"col-xs-12 col-sm-6 col-sm-offset-3 alert alert-success\">\n"
                    + "<strong>Success!</strong> Create New Product Successfully!.\n"
                    + "</div>");
        } else {
            flashAttr.addFlashAttribute("error", "<div class=\"col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger\">\n"
                    + "<strong>Error!</strong> Sorry error was happened, please try again!.\n"
                    + "</div>");
        }
        return "redirect:/admin/product/create.html";
    }
    
    @RequestMapping(value = "ajax/checkProductName", method = RequestMethod.POST)
    @ResponseBody
    public String checkProductName (
            @RequestParam("productName") String productName){
        if(productStateLessBean.checkDuplicateProductName(productName)){
            return "1";
        } else {
            return "0";
        }
    }
    
    @RequestMapping(value = "ajax/changeProductStatus", method = RequestMethod.POST)
    @ResponseBody
    public void changeProductStatus (
            @RequestParam("newProductStatus") short newProductStatus,
            @RequestParam("productID") int productID){
        productStateLessBean.updateProductStatus(productID, newProductStatus);
    }
    
    @RequestMapping(value = "ajax/getSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public String getSubCategory(@RequestParam("cateID") Integer cateID) {
        Categories cate = productStateLessBean.findCategoryByID(cateID);
        List<SubCategories> subCateList = cate.getSubCateList();
        List<Properties> newList = new ArrayList<>();
        for (SubCategories sc : subCateList) {
            Properties prop = new Properties();
            prop.setProperty("subCateID", sc.getSubCateID().toString());
            prop.setProperty("subCateName", sc.getSubCateName());
            newList.add(prop);
        }
        ObjectMapper mapper = new ObjectMapper();
        String result = "";
        try {
            result = mapper.writeValueAsString(newList);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(Product_Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    @RequestMapping(value = "product/edit-{productID}")
    public String productUpdate(
            @PathVariable("productID") Integer productID,
            ModelMap model) {
        Products targetProduct = productStateLessBean.findProductByID(productID);
        model.addAttribute("targetProduct", targetProduct);
        Categories cate = productStateLessBean.findCategoryByID(targetProduct.getCategory().getCateID());
        List<SubCategories> subCateListByCate = cate.getSubCateList();
        
        model.addAttribute("subCateList", subCateListByCate);
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
