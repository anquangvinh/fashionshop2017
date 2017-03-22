/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Local;
import spring.entity.Categories;
import spring.entity.Products;
import spring.entity.SubCategories;

/**
 *
 * @author vinh.an
 */
@Local
public interface ProductStateLessBeanLocal {
    /* 
     *    CATEGORY TREATMENT 
     */
    List<Categories> categoryList();

    Categories findCategoryByID(int cateID);

    Categories findCategoryByName(String cateName);

    List<Categories> findCategoryLikeName(String cateName);

    int createNewCategory(Categories newCate);

    boolean updateCategory(Categories targetCate);

    /* 
     *    SUB-CATEGORY TREATMENT 
     */
    List<SubCategories> subCategoryList();
    
    /* 
     *    PRODUCT TREATMENT 
     */
    List<Products> productList();
    
}
