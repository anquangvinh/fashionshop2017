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
public class UserAddressesStateLessBean implements UserAddressesStateLessBeanLocal {

    @PersistenceContext
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }

    public void setEm(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<UserAddresses> getAddressUser() {
        return getEm().createQuery("SELECT a FROM UserAddresses a", UserAddresses.class).getResultList();
    }

    @Override
    public void addAddressUser(UserAddresses userAddresses, int userID) {
//        int error;

//        Users user = findUserID(userID);
//        UserAddresses findAD = findAddress(user.getUserID());
//        UserAddresses findP = findPhone(user.getUserID());
//        if (findAD != null && findP != null) {
//            error = 2; // phone hoặc address bị trùng
//        } else {
        try {
//                for(){
            Users u = findUserID(userID);
//                Users u = findUserID(userID);
//                    if (u != null) {
            userAddresses.setUser(u);
//                    }
            getEm().persist(userAddresses);
//                error = 1;
//                }
        } catch (Exception e) {
            e.printStackTrace();
//                error = 0;
        }
//        }
//        return error;
    }

    @Override
    public UserAddresses findAddress(int userID) {
        Query q = getEm().createQuery("SELECT ua.address FROM UserAddresses ua WHERE ua.user.userID = :userID", UserAddresses.class);
//        q.setParameter("userID", userID);
        q.setParameter("userID", userID);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public UserAddresses findPhone(int userID) {
        Query q = getEm().createQuery("SELECT ua.phoneNumber FROM UserAddresses ua WHERE ua.user.userID = :userID", UserAddresses.class);
//        q.setParameter("userID", userID);
        q.setParameter("userID", userID);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }

    }

//    @Override
//    public int editAddressUser(UserAddresses userAddresses, int userID) {
//        int error;
//        UserAddresses findADOld = findAddress(userAddresses.getAddress());
//        UserAddresses findADNew = findAddress(userAddresses.getAddress());
//        UserAddresses findPOld = findPhone(userAddresses.getPhoneNumber());
//        UserAddresses findPNew = findPhone(userAddresses.getPhoneNumber());
//        
//        if(findADOld.getAddress().equals(userAddresses.getAddress()) || 
//                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber()) ||
//                (findADOld.getAddress().equals(userAddresses.getAddress()) && 
//                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber()))){ // không thay đổi userAddress hoặc phone, cả 2 cùng không thay đổi
//                try {
//                    Users user = findUserID(userID);
//                    userAddresses.setUser(user);
//                    
//                    getEm().merge(userAddresses);
//                    error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        }else{    
//            if (findADNew != null || findPNew != null || findADNew != null && findPNew != null) {
//            error = 2; // phone hoặc address bị trùng, hoặc cả hai cùng bị trùng
//        } else {
//            try {
//                    Users user = findUserID(userID);
////                    if(!email.equals("")){
////                        u.setEmail(email);
////                        error = 4;
////                    }else{
//                    userAddresses.setUser(user);
//                    userAddresses.getAddressID();
//                    getEm().merge(userAddresses);
//                    error = 1;
////                    }
//                
//            } catch (Exception e) {
//                error = 0;
//            }
//        }
//        }
//        return error;
//    }
//    @Override
//    public int editAddressUser(UserAddresses userAddresses, int userID) {
//        int error;
//        Users user = findUserID(userID);
//        UserAddresses findOld = findAddressID(userAddresses.getAddressID());
//        for (UserAddresses userAdd : user.getUserAddressList()) {
//            if (userAddresses.getAddress().equals(findOld.getAddress())
//                    && userAddresses.getPhoneNumber().equals(findOld.getPhoneNumber())) {
//                error = 3; // ca hai deu khong thay doi
//            } else {
//                try {
////                    userAdd.getAddressID();
//                    userAddresses.setUser(user);
//                    getEm().merge(userAddresses);
//                    error = 1;
//                } catch (Exception e) {
//                    error = 0;
//                }
//            }
//        }
//        UserAddresses findADNew = findAddress(userAddresses.getAddress(), userID);
//        UserAddresses findFNew = findPhone(userAddresses.getPhoneNumber(), userID);
//        
//        if((findADNew != null || findFNew != null) || (findADNew != null && findFNew != null)){
//            error = 2; // trung address va phone hoac 1 trong 2 bi trung cua userID do
//        }else{
//            try {
//                userAddresses.setUser(user);
//                getEm().merge(userAddresses);
//                error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        }
//        
//        return error;
//    }
    @Override
    public Users findUserID(int userID) {
        return getEm().find(Users.class, userID);
    }

    @Override
    public void addUser(Users user) {
        getEm().persist(user);
    }

    @Override
    public UserAddresses findID(int userID) {
        Query q = getEm().createQuery("SELECT ua FROM UserAddresses ua WHERE ua.user.userID = :userID", UserAddresses.class);
        q.setParameter("userID", userID);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<UserAddresses> AddressListUser(int userID) {
        Query q = getEm().createQuery("SELECT ua FROM UserAddresses ua WHERE ua.user.userID = :userID", UserAddresses.class);
        q.setParameter("userID", userID);
        return q.getResultList();
    }

    @Override
    public UserAddresses findAddressID(int addressID) {
        return getEm().find(UserAddresses.class, addressID);
    }

//    @Override
//    public int editAddress(int userID, int addressID) {
//        UserAddresses addressess = findAddressID(addressID);
//        int error;
//        UserAddresses findADOld = findAddress(addressess.getAddress());
//        UserAddresses findADNew = findAddress(addressess.getAddress());
//        UserAddresses findPOld = findPhone(addressess.getPhoneNumber());
//        UserAddresses findPNew = findPhone(addressess.getPhoneNumber());
//
//        if (findADOld.getAddress().equals(addressess.getAddress())
//                || findPOld.getPhoneNumber().equals(addressess.getPhoneNumber())
//                || findADOld.getAddress().equals(addressess.getAddress())
//                && findPOld.getPhoneNumber().equals(addressess.getPhoneNumber())) { // không thay đổi userAddress hoặc phone, cả 2 cùng không thay đổi
//            try {
//                Users user = findUserID(userID);
//                addressess.setUser(user);
//                addressess.setAddressID(addressID);
////                    addressID = addressess.getAddressID();
////                    addressess.setAddressID(addressID);
//                getEm().merge(addressess);
//                error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        } else {
//            if (findADNew != null || findPNew != null || findADNew != null && findPNew != null) {
//                error = 2; // phone hoặc address bị trùng, hoặc cả hai cùng bị trùng
//            } else {
//                try {
//                    Users user = findUserID(userID);
////                    if(!email.equals("")){
////                        u.setEmail(email);
////                        error = 4;
////                    }else{
//                    addressess.setUser(user);
//                    addressess.setAddressID(addressID);
////                    addressID = addressess.getAddressID();
////                    addressess.setAddressID(addressID);
////                    userAddresses.getAddressID();
//                    getEm().merge(addressess);
//                    error = 1;
////                    }
//
//                } catch (Exception e) {
//                    error = 0;
//                }
//            }
//        }
//        return error;
//    }
//    @Override
//    public int editAddressUser(UserAddresses userAddresses, int userID) {
//        int error;
//        
//        UserAddresses findADOld = findAddress(userAddresses.getAddress());
//        UserAddresses findADNew = findAddress(userAddresses.getAddress());
//        UserAddresses findPOld = findPhone(userAddresses.getPhoneNumber());
//        UserAddresses findPNew = findPhone(userAddresses.getPhoneNumber());
//        
//        if((findADOld.getAddress().equals(userAddresses.getAddress()) || 
//                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber())) || (
//                findADOld.getAddress().equals(userAddresses.getAddress()) && 
//                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber()))){
//            try {
//                Users users = findUserID(userID);
//                userAddresses.setUser(users);
//                getEm().merge(userAddresses);
//                error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        }
//        else{
//        
//        if((findADNew != null || findPNew != null) || (
//                findADNew != null && findPNew != null)){
//            error = 2; //trung
//        }else{
//            try {
//                Users users = findUserID(userID);
//                userAddresses.setUser(users);
//                getEm().merge(userAddresses);
//                error = 1;
//            } catch (Exception e) {
//                error = 0;
//            }
//        }
//        }
//        return error;
//    }
    @Override
    public int editAddress(int userID, int addressID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int editAddressUser(UserAddresses userAddresses, int userID) {
        return 1;
    }

}
