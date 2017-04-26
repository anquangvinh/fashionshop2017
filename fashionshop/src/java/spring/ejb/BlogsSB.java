/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.security.Principal;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import spring.entity.BlogCategories;
import spring.entity.Blogs;

/**
 *
 * @author Phan
 */
@Stateless
public class BlogsSB implements BlogsSBLocal {

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEntityManager() {
        return em;
    }

    @Override
    public List<Blogs> getAllBlogs() {
        Query q = getEntityManager().createQuery("SELECT b FROM Blogs b", Blogs.class);
        return q.getResultList();
    }
    
    @Override
    public List<Blogs> getListBlogsByCategory(int blogCateID){
        BlogCategories blogcategories = getEntityManager().find(BlogCategories.class, blogCateID);
        return blogcategories.getBlogList();
    }

    @Override
    public boolean blogAdd(Blogs newBlogs) {
        try {
            em.persist(newBlogs);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public Blogs findBlogsByID(int id) {
        Query q = em.createQuery("SELECT b FROM Blogs b WHERE b.blogID = :blogID", Blogs.class);
        q.setParameter("blogID", id);
        return (Blogs) q.getSingleResult();
    }

    @Override
    public boolean editBlogs(Blogs targetBlogs) {
    try {
            em.merge(targetBlogs);
            return true;
        } catch (Exception e) {
            return false;
        }    }

}
