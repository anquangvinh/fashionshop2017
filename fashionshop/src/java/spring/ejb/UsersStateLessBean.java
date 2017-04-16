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
                } else if (phone.equals("") || address.equals("")) {
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

        if (targetUser == null) {
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
//        if (findEmail != null) {
//            error = 2; // email đã có
//        } else if (findEmail == null) {
//            try {
//                getEm().merge(user);
//                error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        } else {
//            try {
//                Users finduID = getUserByID(user.getUserID());
//                if (repass.equals("")) {
//                    String a = "Input Repass";
//                    error = 3;
//                } else {
//                    if (repass.equals(user.getPassword())) {
//                    }
//                    finduID.setPassword(repass);
//                    getEm().merge(finduID);
//                    error = 4;
//                }
//            } catch (Exception e) {
//                error = 5;
//            }
//        }
        if(findEmail != null){
            error = 2; // email đã có
        }else{
            Users finduserID = getUserByID(user.getUserID());
            try {
                getEm().merge(user);
                error = 1; // cập nhật thành công
                if(!repass.equals("")){
                    finduserID.setPassword(repass);
                    getEm().merge(finduserID);
                    error = 2; // cập nhật pass ok
                }else if(finduserID.getPassword().equals(repass)){
                    error = 3 ; // không đổi pass
                }else if(repass.equals("")){
                    error = 4; //  để trống pass
                }
            } catch (Exception e) {
                error = 0;
            }
        }
        return error;
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
                    error = 1; // => admin or moderator
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
        if(userfindEmail == null){
            error = 2; // sai email
        }else{
            if(userfindEmail.getPassword().equals(pass)){
                error = 1 ; // login thành công
            }else {
                error = 0; // sai password
            }
        }
        return error;
    }

}
