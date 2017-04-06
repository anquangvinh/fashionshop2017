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
import spring.entity.ProductColors;
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

    /*========================================================================
     *                                                                       *
     *                          CATEGORY TREATMENT                           *
     *                                                                       *
     ========================================================================*/
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
        try {
            Query q = getEntityManager().createQuery("SELECT c FROM Categories c WHERE c.cateName LIKE :cateName", Categories.class);
            q.setParameter("cateName", cateName);
            return (Categories) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
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
    public int updateCategory(Categories targetCate) {
        int errorCode; // = 1; => update thành công, = 0; => update bị lỗi, = 2 => update trùng với tên trước đó.
        Categories oldCate = findCategoryByID(targetCate.getCateID());
        Categories cate = findCategoryByName(targetCate.getCateName());
        if (oldCate.getCateName().equalsIgnoreCase(targetCate.getCateName())) {
            try {
                getEntityManager().merge(targetCate);
                errorCode = 1;
            } catch (Exception e) {
                errorCode = 0;
            }
        } else {
            if (cate != null) {
                errorCode = 2;
            } else {
                try {
                    getEntityManager().merge(targetCate);
                    errorCode = 1;
                } catch (Exception e) {
                    errorCode = 0;
                }
            }

        }
        return errorCode;
    }

    /*=======================================================================
     *                                                                       *
     *                       SUB-CATEGORY TREATMENT                          *
     *                                                                       *
     ========================================================================*/
    @Override
    public List<SubCategories> subCategoryList() {
        Query q = getEntityManager().createQuery("SELECT sc FROM SubCategories sc", SubCategories.class);
        return q.getResultList();
    }

    @Override
    public SubCategories findSubCategoryByID(int subCateID) {
        return getEntityManager().find(SubCategories.class, subCateID);
    }

    @Override
    public int createNewSubCategory(SubCategories newSubCate) {
        int errorCode;

        Query q = getEntityManager().createQuery("SELECT sc FROM SubCategories sc WHERE sc.category.cateID = :cateID AND sc.subCateName LIKE :newSubCateName", SubCategories.class);
        q.setParameter("cateID", newSubCate.getCategory().getCateID());
        q.setParameter("newSubCateName", newSubCate.getSubCateName());

        int count = q.getResultList().size();
        if (count == 1) { //=> đã có SubCategory trong Category đó rồi.
            errorCode = 2;
        } else {//=> Chưa có SubCategory trong Category đó.
            try {
                getEntityManager().persist(newSubCate);
                errorCode = 1;
            } catch (Exception e) {
                errorCode = 0;
            }
        }
        return errorCode;
    }

    @Override
    public int updateSubCategory(SubCategories targetSubCategory) {
        int errorCode;
        SubCategories oldSubCate = getEntityManager().find(SubCategories.class, targetSubCategory.getSubCateID());

        Query q = getEntityManager().createQuery("SELECT sc FROM SubCategories sc WHERE sc.category.cateID = :cateID AND sc.subCateName LIKE :targetSubCateName", SubCategories.class);
        q.setParameter("cateID", targetSubCategory.getCategory().getCateID());
        q.setParameter("targetSubCateName", targetSubCategory.getSubCateName());
        int count = q.getResultList().size();
        if (count == 1) { //=> trùng
            if ((oldSubCate.getCategory().getCateID() == targetSubCategory.getCategory().getCateID()) && oldSubCate.getSubCateName().equalsIgnoreCase(targetSubCategory.getSubCateName())) {
                try {
                    getEntityManager().merge(targetSubCategory);
                    errorCode = 1; //Update thành công.
                } catch (Exception e) {
                    errorCode = 0; //Update bị lỗi.
                }
            } else {
                errorCode = 2; //bị trùng
            }
        } else { //=> ko bị trùng
            try {
                getEntityManager().merge(targetSubCategory);
                errorCode = 1; //Update thành công.
            } catch (Exception e) {
                errorCode = 0; //Update bị lỗi.
            }
        }
        return errorCode;
    }

    /*========================================================================
     *                                                                       *
     *                          PRODUCT TREATMENT                            *
     *                                                                       *
     ========================================================================*/
    @Override
    public List<Products> productList(String role) {
        Query q;
        if(role.equals("client")){
            q = getEntityManager().createQuery("SELECT p FROM Products p WHERE p.status = 1 ORDER BY p.productID DESC", Products.class);
        } else {
            q = getEntityManager().createQuery("SELECT p FROM Products p ORDER BY p.productID DESC", Products.class);
        }
        
        return q.getResultList();
    }
    
    @Override
    public Products findProductByID(int productID){
        return getEntityManager().find(Products.class, productID);
    }
    
    @Override
    public List<Object> getTop3ProductBestSeller(){
        String sql = "SELECT p.productID, p.productName, p.productNameNA, p.price, p.urlImg, sum(od.quantity) as tongsoluong "
                + "FROM OrdersDetail od JOIN od.product p "
                + "WHERE p.status = 1 "
                + "GROUP BY p.productID, p.productName, p.productNameNA, p.price, p.urlImg "
                + "ORDER BY tongsoluong DESC";
        Query q = getEntityManager().createQuery(sql).setMaxResults(3);
        
        return q.getResultList();
    }
    
    @Override
    public List<Products> getTop3ProductMostViewed(){
        String sql = "SELECT p FROM Products p WHERE p.status = 1 ORDER BY p.productViews DESC";
        Query q = getEntityManager().createQuery(sql, Products.class).setMaxResults(3);
        
        return q.getResultList();
    }
    
    @Override
    public ProductColors findProductColorByColorID(int colorID){
        ProductColors productColor = getEntityManager().find(ProductColors.class, colorID);
        return productColor;
    }
}
