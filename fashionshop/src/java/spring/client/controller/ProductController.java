/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.client.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import spring.ejb.ProductStateLessBeanLocal;
import spring.entity.CartLineInfoByID;
import spring.entity.Categories;
import spring.entity.ProductColors;
import spring.entity.Products;
import spring.entity.SizeLetterOrder;
import spring.entity.SizesByColor;

@Controller
public class ProductController {

    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @RequestMapping(value = "/category/{cateID}-{categoryNameNA}")
    public String categorylist(ModelMap model,
            @PathVariable("cateID") Integer cateID,
            @PathVariable("categoryNameNA") String categoryNameNA) {
        int page = 1;
        int itemPerPage = 6;
        String currentProductPageInfo = ((page - 1) * itemPerPage + 1) + " - " + (((page - 1) * itemPerPage) + itemPerPage);

        List<Categories> cateList = productStateLessBean.categoryList();

        List<Products> allProductByCate = productStateLessBean.findCategoryByID(cateID).getProductList();
        int allProducts = allProductByCate.size();

        float fromPrice = productStateLessBean.getMinPriceOfProduct_ByCate(cateID);
        float toPrice = productStateLessBean.getMaxPriceOfProduct_ByCate(cateID);

        List<Object[]> productIDList = productStateLessBean.filterProductByCategory(cateID, page, itemPerPage, fromPrice, toPrice, "", "", 1);
        List<Products> finalProductList = new ArrayList<>();
        for (Object[] prod : productIDList) {

            Products product = productStateLessBean.findProductByID((Integer) prod[0]);
            finalProductList.add(product);
        }
        Set<String> colorSet = new HashSet<>();
        Set<String> sizeSet = new HashSet<>();

        //get List of Color
        for (Products p : allProductByCate) {
            for (ProductColors pc : p.getProductColorList()) {
                colorSet.add(pc.getColor());
                for (SizesByColor size : pc.getSizeList()) {
                    sizeSet.add(size.getProductSize());
                }
            }
        }

        List<SizeLetterOrder> newSizeList = new ArrayList<>();
        for (String s : sizeSet) {
            SizeLetterOrder slo = new SizeLetterOrder();
            if (s.equals("XXS")) {
                slo.setSizeLetter("XXS");
                slo.setOrder(0);
            } else if (s.equals("XS")) {
                slo.setSizeLetter("XS");
                slo.setOrder(1);
            } else if (s.equals("S")) {
                slo.setSizeLetter("S");
                slo.setOrder(2);
            } else if (s.equals("M")) {
                slo.setSizeLetter("M");
                slo.setOrder(3);
            } else if (s.equals("L")) {
                slo.setSizeLetter("L");
                slo.setOrder(4);
            } else if (s.equals("XL")) {
                slo.setSizeLetter("XL");
                slo.setOrder(5);
            } else if (s.equals("XXL")) {
                slo.setSizeLetter("XXL");
                slo.setOrder(6);
            } else if (s.equals("XXXL")) {
                slo.setSizeLetter("XXXL");
                slo.setOrder(7);
            }
            newSizeList.add(slo);
        }

        Collections.sort(newSizeList, new Comparator<SizeLetterOrder>() {
            @Override
            public int compare(SizeLetterOrder o1, SizeLetterOrder o2) {
                return o1.getOrder() - o2.getOrder();
            }
        });

        if (finalProductList != null) {
            model.addAttribute("cateList", cateList);
            model.addAttribute("allProducts", allProducts);
            model.addAttribute("currentProductPageInfo", currentProductPageInfo);
            model.addAttribute("cateID", cateID);
            model.addAttribute("productsList", finalProductList);
            model.addAttribute("colorList", colorSet);
            model.addAttribute("sizeList", newSizeList);
            model.addAttribute("maxPrice", productStateLessBean.getMaxPriceOfProduct_ByCate(cateID));
            model.addAttribute("minPrice", productStateLessBean.getMinPriceOfProduct_ByCate(cateID));
        } else {
            //đưa về trang lỗi.
        }
        return "client/pages/categories-grid";
    }

    @RequestMapping(value = "/subCategory/{categoryNameNA}-{subCateID}-{subCateNameNA}")
    public String subCategoryList(ModelMap model,
            @PathVariable("subCateID") Integer subCateID) {
        if (productStateLessBean.findSubCategoryByID(subCateID) != null) {
            //2 dòng này thêm để render ra menu chính
            List<Categories> cateList = productStateLessBean.categoryList();
            model.addAttribute("cateList", cateList);

            int page = 1;
            int itemPerPage = 6;
            String currentProductPageInfo = ((page - 1) * itemPerPage + 1) + " - " + (((page - 1) * itemPerPage) + itemPerPage);

            List<Products> allProductBySubCate = productStateLessBean.findSubCategoryByID(subCateID).getProductList();
            int numberOfProducts = allProductBySubCate.size();

            float fromPrice = productStateLessBean.getMinPriceOfProduct_BySubCate(subCateID);
            float toPrice = productStateLessBean.getMaxPriceOfProduct_BySubCate(subCateID);

            List<Object[]> productIDList = productStateLessBean.filterProductBySubCategory(subCateID, page, itemPerPage, fromPrice, toPrice, "", "", 1);
            List<Products> finalProductList = new ArrayList<>();

            for (Object[] prod : productIDList) {
                Products product = productStateLessBean.findProductByID((Integer) prod[0]);
                finalProductList.add(product);
            }
            Set<String> colorSet = new HashSet<>();
            Set<String> sizeSet = new HashSet<>();

            //get List of Color
            for (Products p : allProductBySubCate) {
                for (ProductColors pc : p.getProductColorList()) {
                    colorSet.add(pc.getColor());
                    for (SizesByColor size : pc.getSizeList()) {
                        sizeSet.add(size.getProductSize());
                    }
                }
            }

            List<SizeLetterOrder> newSizeList = new ArrayList<>();
            for (String s : sizeSet) {
                SizeLetterOrder slo = new SizeLetterOrder();
                if (s.equals("XXS")) {
                    slo.setSizeLetter("XXS");
                    slo.setOrder(0);
                } else if (s.equals("XS")) {
                    slo.setSizeLetter("XS");
                    slo.setOrder(1);
                } else if (s.equals("S")) {
                    slo.setSizeLetter("S");
                    slo.setOrder(2);
                } else if (s.equals("M")) {
                    slo.setSizeLetter("M");
                    slo.setOrder(3);
                } else if (s.equals("L")) {
                    slo.setSizeLetter("L");
                    slo.setOrder(4);
                } else if (s.equals("XL")) {
                    slo.setSizeLetter("XL");
                    slo.setOrder(5);
                } else if (s.equals("XXL")) {
                    slo.setSizeLetter("XXL");
                    slo.setOrder(6);
                } else if (s.equals("XXXL")) {
                    slo.setSizeLetter("XXXL");
                    slo.setOrder(7);
                }
                newSizeList.add(slo);
            }

            Collections.sort(newSizeList, new Comparator<SizeLetterOrder>() {
                @Override
                public int compare(SizeLetterOrder o1, SizeLetterOrder o2) {
                    return o1.getOrder() - o2.getOrder();
                }
            });
            model.addAttribute("subCateID", subCateID);
            model.addAttribute("allProducts", numberOfProducts);
            model.addAttribute("currentProductPageInfo", currentProductPageInfo);
            model.addAttribute("productsList", finalProductList);
            model.addAttribute("colorList", colorSet);
            model.addAttribute("sizeList", newSizeList);
            model.addAttribute("maxPrice", productStateLessBean.getMaxPriceOfProduct_BySubCate(subCateID));
            model.addAttribute("minPrice", productStateLessBean.getMinPriceOfProduct_BySubCate(subCateID));
            return "client/pages/sub-categories-grid";
        } else {
            return "Ve Trang 404!";
        }

    }

    @RequestMapping(value = "/{productID:[0-9]+}-{colorID:[0-9]+}-{productNameNA:[A-Za-z0-9-]+}")
    public String productdetail(ModelMap model,
            @PathVariable("productID") Integer productID,
            @PathVariable("colorID") Integer colorID
    ) {
        Products targetProduct = productStateLessBean.findProductByID(productID);
        List<Categories> cateList = productStateLessBean.categoryList();
        if ((targetProduct != null)) {
            List<ProductColors> productColorList = targetProduct.getProductColorList();
            int count = 0;
            for (ProductColors color : productColorList) {
                if (Objects.equals(color.getColorID(), colorID)) {
                    count++;
                    break;
                }
            }

            if (count > 0) {
                ProductColors targetColor = productStateLessBean.findProductColorByColorID(colorID);
                model.addAttribute("targetProduct", targetProduct);
                model.addAttribute("targetColor", targetColor);
                model.addAttribute("cateList", cateList);
                CartLineInfoByID cartLineInfoByID = new CartLineInfoByID();
                model.addAttribute("cartLineInfoByID", cartLineInfoByID);
            } else {
                String error = "Product ko có color này!";
            }
        } else {
            String error = "Product ko có!";
        }

        return "client/pages/product-detail";
    }

    @ResponseBody
    @RequestMapping(value = "/ajax/findProduct", method = RequestMethod.POST)
    public String getProductByID(@RequestParam("productID") Integer productID) {
        Products targetProduct = productStateLessBean.findProductByID(productID);

        try {
            ObjectMapper mapper = new ObjectMapper();
            String result = mapper.writeValueAsString(targetProduct);
            return result;
        } catch (Exception e) {
            return "Error!" + e.getMessage();
        }

    }

    @ResponseBody
    @RequestMapping(value = "/ajax/color", method = RequestMethod.POST)
    public String getInforByColorID(@RequestParam("colorID") Integer colorID) {
        ProductColors color = productStateLessBean.findProductColorByColorID(colorID);

        try {
            ObjectMapper mapper = new ObjectMapper();
            String result = mapper.writeValueAsString(color);
            return result;
        } catch (Exception e) {
            return "" + e.getMessage();
        }
    }

    @ResponseBody
    @RequestMapping(value = "/ajax/productPagination", method = RequestMethod.POST)
    public String productPagination(
            @RequestParam("cateID") Integer cateID,
            @RequestParam("page") Integer page,
            @RequestParam("itemPerPage") Integer itemPerPage,
            @RequestParam("sortBy") Integer sortBy,
            @RequestParam("fromPrice") Float fromPrice,
            @RequestParam("toPrice") Float toPrice,
            @RequestParam(value = "colorFilterArr[]", required = false) List<String> colorFilterArr,
            @RequestParam(value = "sizeFilterArr[]", required = false) List<String> sizeFilterArr) {
        if (fromPrice == null) {
            fromPrice = productStateLessBean.getMinPriceOfProduct_ByCate(cateID);
        }

        if (toPrice == null) {
            toPrice = productStateLessBean.getMaxPriceOfProduct_ByCate(cateID);
        }
        String filterColor = "";
        String beginColorStr = "AND pc.color in (";
        String endColorStr = ") ";
        String contentColorStr = "";

        String filterSize = "";
        String beginSizeStr = "AND ps.productSize in (";
        String endSizeStr = ") ";
        String contentSizeStr = "";

        if (colorFilterArr != null) {
            for (String color : colorFilterArr) {
                contentColorStr += "'" + color + "',";
            }
            contentColorStr = contentColorStr.substring(0, contentColorStr.length() - 1);
            filterColor = beginColorStr + contentColorStr + endColorStr;
        }

        if (sizeFilterArr != null) {
            for (String size : sizeFilterArr) {
                contentSizeStr += "'" + size + "',";
            }
            contentSizeStr = contentSizeStr.substring(0, contentSizeStr.length() - 1);
            filterSize = beginSizeStr + contentSizeStr + endSizeStr;
        }

        List<Object[]> productIDList = productStateLessBean.filterProductByCategory(cateID, page, itemPerPage, fromPrice, toPrice, filterColor, filterSize, sortBy);
        List<Products> finalProductList = new ArrayList<>();
        for (Object[] prod : productIDList) {

            Products product = productStateLessBean.findProductByID((Integer) prod[0]);
            finalProductList.add(product);
        }
        ObjectMapper mapper = new ObjectMapper();
        String result = "";
        try {
            result = mapper.writeValueAsString(finalProductList);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/ajax/getNumberOfProductsByFilter_OfACategory", method = RequestMethod.POST)
    public String getNumberOfProductsByFilter_OfACategory(
            @RequestParam("cateID") Integer cateID,
            @RequestParam("fromPrice") Float fromPrice,
            @RequestParam("toPrice") Float toPrice,
            @RequestParam(value = "colorFilterArr[]", required = false) List<String> colorFilterArr,
            @RequestParam(value = "sizeFilterArr[]", required = false) List<String> sizeFilterArr
    ) {
        if (fromPrice == null) {
            fromPrice = productStateLessBean.getMinPriceOfProduct_ByCate(cateID);
        }

        if (toPrice == null) {
            toPrice = productStateLessBean.getMaxPriceOfProduct_ByCate(cateID);
        }
        String filterColor = "";
        String beginColorStr = "AND pc.color in (";
        String endColorStr = ") ";
        String contentColorStr = "";

        String filterSize = "";
        String beginSizeStr = "AND ps.productSize in (";
        String endSizeStr = ") ";
        String contentSizeStr = "";

        if (colorFilterArr != null) {
            for (String color : colorFilterArr) {
                contentColorStr += "'" + color + "',";
            }
            contentColorStr = contentColorStr.substring(0, contentColorStr.length() - 1);
            filterColor = beginColorStr + contentColorStr + endColorStr;
        }

        if (sizeFilterArr != null) {
            for (String size : sizeFilterArr) {
                contentSizeStr += "'" + size + "',";
            }
            contentSizeStr = contentSizeStr.substring(0, contentSizeStr.length() - 1);
            filterSize = beginSizeStr + contentSizeStr + endSizeStr;
        }

        List<Object[]> allProductFilteredByPrice = productStateLessBean.productsByFilter_OfACategory(cateID, fromPrice, toPrice, filterColor, filterSize);

        int numberOfProducts = allProductFilteredByPrice.size();
        return "" + numberOfProducts;
    }

    @ResponseBody
    @RequestMapping(value = "/ajax/productPaginationForSubCate", method = RequestMethod.POST)
    public String productPaginationForSubCate(
            @RequestParam("subCateID") Integer subCateID,
            @RequestParam("page") Integer page,
            @RequestParam("itemPerPage") Integer itemPerPage,
            @RequestParam("sortBy") Integer sortBy,
            @RequestParam("fromPrice") Float fromPrice,
            @RequestParam("toPrice") Float toPrice,
            @RequestParam(value = "colorFilterArrSubCate[]", required = false) List<String> colorFilterArrSubCate,
            @RequestParam(value = "sizeFilterArrSubCate[]", required = false) List<String> sizeFilterArrSubCate) {
        if (fromPrice == null) {
            fromPrice = productStateLessBean.getMinPriceOfProduct_BySubCate(subCateID);
        }

        if (toPrice == null) {
            toPrice = productStateLessBean.getMaxPriceOfProduct_BySubCate(subCateID);
        }
        String filterColor = "";
        String beginColorStr = "AND pc.color in (";
        String endColorStr = ") ";
        String contentColorStr = "";

        String filterSize = "";
        String beginSizeStr = "AND ps.productSize in (";
        String endSizeStr = ") ";
        String contentSizeStr = "";

        if (colorFilterArrSubCate != null) {
            for (String color : colorFilterArrSubCate) {
                contentColorStr += "'" + color + "',";
            }
            contentColorStr = contentColorStr.substring(0, contentColorStr.length() - 1);
            filterColor = beginColorStr + contentColorStr + endColorStr;
        }

        if (sizeFilterArrSubCate != null) {
            for (String size : sizeFilterArrSubCate) {
                contentSizeStr += "'" + size + "',";
            }
            contentSizeStr = contentSizeStr.substring(0, contentSizeStr.length() - 1);
            filterSize = beginSizeStr + contentSizeStr + endSizeStr;
        }

        List<Object[]> productIDList = productStateLessBean.filterProductBySubCategory(subCateID, page, itemPerPage, fromPrice, toPrice, filterColor, filterSize, sortBy);
        List<Products> finalProductList = new ArrayList<>();
        for (Object[] prod : productIDList) {

            Products product = productStateLessBean.findProductByID((Integer) prod[0]);
            finalProductList.add(product);
        }
        ObjectMapper mapper = new ObjectMapper();
        String result = "";
        try {
            result = mapper.writeValueAsString(finalProductList);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/ajax/getNumberOfProductsByFilter_OfASubCategory", method = RequestMethod.POST)
    public String getNumberOfProductsByFilter_OfASubCategory(
            @RequestParam("subCateID") Integer subCateID,
            @RequestParam("fromPrice") Float fromPrice,
            @RequestParam("toPrice") Float toPrice,
            @RequestParam(value = "colorFilterArrSubCate[]", required = false) List<String> colorFilterArrSubCate,
            @RequestParam(value = "sizeFilterArrSubCate[]", required = false) List<String> sizeFilterArrSubCate
    ) {
        if (fromPrice == null) {
            fromPrice = productStateLessBean.getMinPriceOfProduct_BySubCate(subCateID);
        }

        if (toPrice == null) {
            toPrice = productStateLessBean.getMaxPriceOfProduct_BySubCate(subCateID);
        }
        String filterColor = "";
        String beginColorStr = "AND pc.color in (";
        String endColorStr = ") ";
        String contentColorStr = "";

        String filterSize = "";
        String beginSizeStr = "AND ps.productSize in (";
        String endSizeStr = ") ";
        String contentSizeStr = "";

        if (colorFilterArrSubCate != null) {
            for (String color : colorFilterArrSubCate) {
                contentColorStr += "'" + color + "',";
            }
            contentColorStr = contentColorStr.substring(0, contentColorStr.length() - 1);
            filterColor = beginColorStr + contentColorStr + endColorStr;
        }

        if (sizeFilterArrSubCate != null) {
            for (String size : sizeFilterArrSubCate) {
                contentSizeStr += "'" + size + "',";
            }
            contentSizeStr = contentSizeStr.substring(0, contentSizeStr.length() - 1);
            filterSize = beginSizeStr + contentSizeStr + endSizeStr;
        }

        List<Object[]> allProductFilteredByPrice = productStateLessBean.productsByFilter_OfASubCategory(subCateID, fromPrice, toPrice, filterColor, filterSize);

        int numberOfProducts = allProductFilteredByPrice.size();
        return "" + numberOfProducts;
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
