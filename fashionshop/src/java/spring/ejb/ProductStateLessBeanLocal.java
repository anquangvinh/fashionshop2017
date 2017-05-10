/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Local;
import spring.entity.Categories;
import spring.entity.ProductColors;
import spring.entity.Products;
import spring.entity.SubCategories;

/**
 *
 * @author vinh.an
 */
@Local
public interface ProductStateLessBeanLocal {
    /*========================================================================
     *                                                                       *
     *                          CATEGORY TREATMENT                           *
     *                                                                       *
     ========================================================================*/

    List<Categories> categoryList();

    Categories findCategoryByID(int cateID);

    Categories findCategoryByName(String cateName);

    List<Categories> findCategoryLikeName(String cateName);

    int createNewCategory(Categories newCate);

    int updateCategory(Categories targetCate);

    /*========================================================================
     *                                                                       *
     *                       SUB-CATEGORY TREATMENT                          *
     *                                                                       *
     ========================================================================*/
    List<SubCategories> subCategoryList();

    SubCategories findSubCategoryByID(int subCateID);

    int createNewSubCategory(SubCategories newSubCate);

    int updateSubCategory(SubCategories targetSubCategory);

    /*========================================================================
     *                                                                       *
     *                          PRODUCT TREATMENT                            *
     *                                                                       *
     ========================================================================*/
    List<Products> productList(String role);

    Products findProductByID(int productID);

    List<Object> getTop3ProductBestSeller();

    List<Products> getTop3ProductMostViewed();

    ProductColors findProductColorByColorID(int colorID);

    boolean checkDuplicateProductName(String name);

    boolean createNewProduct(Products newProduct);

    void updateProductStatus(int productID, short productStatus);

    Float getMaxPriceOfProduct_ByCate(int cateID);

    Float getMinPriceOfProduct_ByCate(int cateID);

    List<Object[]> productsByFilter_OfACategory(int cateID, float fromPrice, float toPrice, String filterColor, String filterSize);

    List<Object[]> filterProductByCategory(int cateID, int page, int itemPerPage, float fromPrice, float toPrice, String filterColor, String filterSize, int sortBy);

}
