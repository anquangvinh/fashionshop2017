/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
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

        if (targetUser == null) {
            return false;
        }

        targetUser.setStatus(status);
        getEm().merge(targetUser);

        return true;
    }

    @Override
    public void changePass(int userID,String newpass){
        Users findID = getUserByID(userID);
        findID.setPassword(newpass);
        getEm().merge(findID);
    }
    
    @Override
    public int login(String email, String pass) {
        int error;
        Users userfindemail = findUserByEmail(email);
        if (userfindemail == null) {
            error = 2; // sai email
        } else {
            if (userfindemail.getPassword().equals(pass)) { //trường hợp này được login => kiểm tra role ở đây
                if (userfindemail.getRole().getRoleID() == 1 || userfindemail.getRole().getRoleID() == 2) {
                    if(userfindemail.getStatus() == 1){
                    error = 1; // => admin or moderator
                    }else {
                        error = 4; // moderator bị block
                    }
                } else {
                    error = 3; // => user
                }
            } else {
                error = 0;// sai pass
            }
        }
        return error;
    }

    @Override
    public int checkLoginUser(String email, String pass) {
        int error;
        Users userfindEmail = findUserByEmail(email);
        if (userfindEmail == null) {
            error = 2; // sai email
        } else {
            if (userfindEmail.getPassword().equals(pass)) {
                if(userfindEmail.getStatus() == 1){
                error = 1; // login thành công
                }else {
                    error = 3; // users bị block
                }
            } else {
                error = 0; // sai password
            }
        }
        return error;
    }

    @Override
    public int updateUser(Users user) {
        int error;
        Users findID = getUserByID(user.getUserID());
//        if(findEmail == null){
        if(findID.getEmail().equals(user.getEmail())){ // không thay đổi email
            try {
                getEm().merge(user);
                error = 1;
            } catch (Exception e) {
                error = 0;
            }
        }
        else{
        if (findID.getEmail() != null) {
            error = 2;// email đã có
        } else {
            try {
                getEm().merge(user);
                error = 1; // update thành công
            } catch (Exception e) {
                error = 0; // lỗi
            }
        }
        }
        return error;
    }

    @Override
    public List<Users> getAllUserID(int userID) {
        Query q = getEm().createQuery("SELECT u FROM Users u WHERE u.userID = :userID", Users.class);
        q.setParameter("userID", userID);
        return q.getResultList();
    }

    @Override
    public List<Users> getAllEmail() {
        Query q = getEm().createQuery("SELECT u.email FROM Users u", Users.class);
        return q.getResultList();
    }

    

}
