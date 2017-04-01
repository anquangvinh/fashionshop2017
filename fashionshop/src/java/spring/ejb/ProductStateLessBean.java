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
    public int createNewSubCategory(SubCategories newSubCate){
        int errorCode;
        
        List<SubCategories> listSubCateByCategory = newSubCate.getCategory().getSubCateList();
//        int count = 0;
//        for (SubCategories subCate : listSubCateByCategory) {
//            if(subCate.getSubCateName().equalsIgnoreCase(newSubCate.getSubCateName())){
//                count++;
//                break;
//            }
//        }
//
//        if(count == 0) { //=> Chưa có SubCategory trong Category đó.
//            errorCode = 1;
//        } else {//=> đã có SubCategory trong Category đó rồi.
//            errorCode = 2;
//        }
        return listSubCateByCategory.size();
    }
    
    /*========================================================================
     *                                                                       *
     *                          PRODUCT TREATMENT                            *
     *                                                                       *
     ========================================================================*/
    @Override
    public List<Products> productList() {
        Query q = getEntityManager().createQuery("SELECT p FROM Products p ORDER BY p.productID DESC", Products.class);
        return q.getResultList();
    }
}
