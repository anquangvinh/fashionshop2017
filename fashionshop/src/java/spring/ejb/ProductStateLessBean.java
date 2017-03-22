/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import spring.entity.Categories;
import spring.entity.Products;
import spring.entity.SubCategories;

/**
 *
 * @author vinh.an
 */
@Stateless
public class ProductStateLessBean implements ProductStateLessBeanLocal {

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEntityManager() {
        return em;
    }

    /* 
     *    CATEGORY TREATMENT 
     */
    @Override
    public List<Categories> categoryList() {
        Query q = getEntityManager().createQuery("SELECT c FROM Categories c", Categories.class);
        return q.getResultList();
    }

    @Override
    public Categories findCategoryByID(int cateID) {
        return getEntityManager().find(Categories.class, cateID);
    }

    @Override
    public Categories findCategoryByName(String cateName) {
        Query q = getEntityManager().createQuery("SELECT c FROM Categories c WHERE c.cateName = :cateName", Categories.class);
        q.setParameter("cateName", cateName);
        return (Categories) q.getSingleResult();
    }

    @Override
    public List<Categories> findCategoryLikeName(String cateName) {
        Query q = getEntityManager().createQuery("SELECT c FROM Categories c WHERE c.cateName LIKE :cateName", Categories.class);
        q.setParameter("cateName", cateName);
        return q.getResultList();
    }

    @Override
    public int createNewCategory(Categories newCate) {
        int errorCode;

        //Kiểm tra trùng tên
        Categories existedCate = findCategoryByName(newCate.getCateName());
        if (existedCate != null) {
            errorCode = 2;  //Tên đã bị TRÙNG
        } else {
            //Insert mới
            try {
                getEntityManager().persist(newCate);
                errorCode = 1;  //Insert thành công 1 dòng
            } catch (Exception e) {
                errorCode = 0;  //Lỗi khi insert, 0 có dòng nào được insert
            }
        }
        return errorCode;
    }

    @Override
    public boolean updateCategory(Categories targetCate) {
        try {
            getEntityManager().merge(targetCate);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /* 
     *    SUB-CATEGORY TREATMENT 
     */
    @Override
    public List<SubCategories> subCategoryList() {
        Query q = getEntityManager().createQuery("SELECT sc FROM SubCategories sc", SubCategories.class);
        return q.getResultList();
    }
    
    /* 
     *    PRODUCT TREATMENT 
     */
    @Override
    public List<Products> productList() {
        Query q = getEntityManager().createQuery("SELECT p FROM Products p ORDER BY p.productID DESC", Products.class);
        return q.getResultList();
    }
}
