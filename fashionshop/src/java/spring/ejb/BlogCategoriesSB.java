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
import spring.entity.BlogCategories;

/**
 *
 * @author Phan
 */
@Stateless
public class BlogCategoriesSB implements BlogCategoriesSBLocal {
    @PersistenceContext
    private EntityManager em;
    
      public EntityManager getEm() {
        return em;
    }

    @Override
    public List<BlogCategories> getBlogCategoriesList() {
        Query q = em.createQuery("SELECT b FROM BlogCategories b", BlogCategories.class);
        return q.getResultList();
    }

    @Override
    public int addNewBlogCategories(BlogCategories newBlogCate) {
        int errorCode;
        if(findCategoriesByName(newBlogCate.getBlogCateName()) == 1){
            errorCode = 2; //Category Đã tồn tại
        } else {
            try {
                em.persist(newBlogCate);
                errorCode = 0;  //add mới thành công
            } catch (Exception e) {
                errorCode = 1;  //Lỗi đã xảy ra.
            }
        }
        return errorCode;
    }

    @Override
    public boolean updateCategories(BlogCategories cate) {
          try {
            em.merge(cate);
            return true; //Update thành công
        } catch (Exception e) {
            return false;  //Lỗi đã xảy ra
        }
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public int findCategoriesByName(String blogCateName) {
                Query q = em.createQuery("SELECT b FROM BlogCategories b WHERE b.blogCateName = :blogCateName", BlogCategories.class);
        q.setParameter("blogCateName", blogCateName);
        int count = q.getResultList().size();
        return count;
    }

    @Override
    public BlogCategories findCategoryByID(int blogCateID) {
  BlogCategories targetBlogCategories = em.find(BlogCategories.class, blogCateID);
        return targetBlogCategories;
    }
    
    
}
