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
import spring.entity.Users;

/**
 *
 * @author hoang
 */
@Stateless
public class UsersStateLessBean implements UsersStateLessBeanLocal {

    @PersistenceContext(unitName = "Final_ProjectPU")
    private EntityManager em;

    @Override
    public List<Users> getAllUsers() {
        return em.createQuery("SELECT u FROM Users u", Users.class).getResultList();
    }

    @Override
    public int findEmail(String email){
        Query q = em.createQuery("SELECT u FROM Users u WHERE u.email = :email" , Users.class);
        q.setParameter("email", email);
        int fid = q.getResultList().size();
        return fid;
    }
    @Override
    public int addUsers(Users users) {
        int errorCode;
        if(findEmail(users.getEmail()) == 1){
            errorCode = 2; //email tồn tại
        } else {
            try {
                em.persist(users);
                errorCode = 0;  //add mới thành công
            } catch (Exception e) {
                errorCode = 1;  //Lỗi đã xảy ra
            }
        }
        return errorCode;
    }

    @Override
    public Users getUserID(String userID) {
       return em.find(Users.class, userID);
    }

}
