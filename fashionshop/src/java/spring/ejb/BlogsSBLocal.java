/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Local;
import spring.entity.Blogs;

/**
 *
 * @author Phan
 */
@Local
public interface BlogsSBLocal {
    public List<Blogs> getAllBlogs();
    List<Blogs> getListBlogsByCategory(int blogCateID);
     boolean blogAdd(Blogs newBlogs);
     Blogs findBlogsByID(int id);
}
