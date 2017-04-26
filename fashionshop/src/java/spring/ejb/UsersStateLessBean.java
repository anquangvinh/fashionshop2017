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

//    @Override
//    public int updateUserPass(Users user, String pass, String repass) {
//        int error = 0;
//        Users findEmail = findUserByEmail(user.getEmail());
//        if (findEmail != null) {
//            error = 2; // email đã có
//            if (!findEmail.getPassword().equals(pass)) {
//                error = 4;
//            } else {
//                if (findEmail.getPassword().equals(repass)) {
//                    error = 3;
//                } else if (!repass.equals("")) {
//                    findEmail.setPassword(repass);
//                    getEm().merge(findEmail);
//                    error = 1;
//                } else if (repass.equals("")) {
//                    error = 5;
//                }
//
//            }
////        }else{
////            
////            try {
////                getEm().merge(user);
////                error = 1; // cập nhật thành công
//////                Users finduserID = getUserByID(user.getUserID());
//////                if(finduserID == null){
//////                //
//////                }else{
//////                if(!pass.equals("")){
//////                    finduserID.setPassword(pass);
//////                    getEm().merge(finduserID);
//////                    error = 2; // cập nhật pass ok
//////                }else if(finduserID.getPassword().equals(pass)){
//////                    error = 3 ; // không đổi pass
//////                }
////////                else if(!finduserID.getPassword().equals(user.getPassword())){
////////                    error = 4; //  sai pass cũ
////////                }
//////                else if(pass.equals("")){
//////                    error = 5; // repass để trống
//////                }
//////                }
////            } catch (Exception e) {
////                error = 0;
////            }
////        }
//        }
//        return error;
//
//    }

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
        if (userfindEmail == null) {
            error = 2; // sai email
        } else {
            if (userfindEmail.getPassword().equals(pass)) {
                error = 1; // login thành công
            } else {
                error = 0; // sai password
            }
        }
        return error;
    }

//    @Override
//    public int updateUser(Users user, String pass, String repass) {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }
    @Override
    public int updateUser(Users user) {
        int error;
        Users findEmailOld = findUserByEmail(user.getEmail());
        Users findEmailNew = findUserByEmail(user.getEmail());
        if(findEmailOld.getEmail().equals(user.getEmail())){ // không thay đổi email
            try {
                getEm().merge(user);
                error = 1;
            } catch (Exception e) {
                error = 0;
            }
        }
        else{
        if (findEmailNew != null) {
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

}
