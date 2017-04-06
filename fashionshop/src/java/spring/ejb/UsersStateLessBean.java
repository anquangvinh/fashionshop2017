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
import spring.entity.UserAddresses;
import spring.entity.Users;

/**
 *
 * @author hoang
 */
@Stateless
public class UsersStateLessBean implements UsersStateLessBeanLocal {

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }

    public void setEm(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Users> getAllUsers() {
        return getEm().createQuery("SELECT u FROM Users u", Users.class).getResultList();
    }

    @Override
    public Users findUserByEmail(String email) {
        Query q = getEm().createQuery("SELECT u FROM Users u WHERE u.email = :email", Users.class);
        q.setParameter("email", email);
        try {
            return (Users) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void addUserAddress(UserAddresses newUserAddress) {
        getEm().persist(newUserAddress);
    }

    @Override
    public int addUsers(Users users, String phone, String address) {
        int error;
        Users findE = findUserByEmail(users.getEmail());
        if (findE != null) {
            error = 2; //email tồn tại
        } else {
            try {
                getEm().persist(users);

                if (!"".equals(phone) && !"".equals(address)) {
                    getEm().flush();

                    UserAddresses newUserAddress = new UserAddresses();
                    newUserAddress.setUser(users);
                    newUserAddress.setAddress(address);
                    newUserAddress.setPhoneNumber(phone);

                    addUserAddress(newUserAddress);
                }else if(phone.equals("") || address.equals("")){
                    String ee = "Input phone and Address";
                    error = 3;
                }

                error = 1;  //add mới thành công
            } catch (Exception e) {
                error = 0;  //Lỗi đã xảy ra
            }
        }
        return error;
    }

    @Override
    public Users getUserByID(int userID) {
        return em.find(Users.class, userID);
    }

    @Override
    public boolean updateStatusUser(int userID, short status) {
        Users targetUser = getUserByID(userID);
        
        if(targetUser == null){
            return false;
        }
        
        targetUser.setStatus(status);
        getEm().merge(targetUser);
        
        return true; 
    }

    @Override
    public int updateUser(Users user, String repass) {
        int error;
        Users findEmail = findUserByEmail(user.getEmail());
        if(findEmail != null){
            error = 2; // email đã có
        }
        try {
            if(repass.equals("")){
                String a = "Input Repass";
                error = 3; 
            }else{
                if(repass.equals(user.getPassword())){
                }
                getEm().merge(user);
                error = 1;
            }
        } catch (Exception e) {
            error = 0;
        }
        return error;
    }

    
    @Override
    public boolean login(String email, String pass, int roleID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    
}
