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
    public int addAddressUser(UserAddresses userAddresses, int userID) {
        int error;
        UserAddresses findAD = findAddress(userAddresses.getAddress());
        UserAddresses findP = findPhone(userAddresses.getPhoneNumber());
        if (findAD != null || findP != null) {
            error = 2; // phone hoặc address bị trùng
        } else {
            try {
              
                    Users u = findUserID(userID);
//                    if (u != null) {
                        userAddresses.setUser(u);
//                    }
                    getEm().persist(userAddresses);
                    error = 1;
            
            } catch (Exception e) {
                error = 0;
            }
        }
        return error;
    }

    @Override
    public UserAddresses findAddress(String address) {
        Query q = getEm().createQuery("SELECT ua FROM UserAddresses ua WHERE ua.address = :address", UserAddresses.class);
        q.setParameter("address", address);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserAddresses findPhone(String phone) {
        Query q = getEm().createQuery("SELECT ua FROM UserAddresses ua WHERE ua.phoneNumber = :phone", UserAddresses.class);
        q.setParameter("phone", phone);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public int editAddressUser(UserAddresses userAddresses, int userID) {
        int error;
        UserAddresses findADOld = findAddress(userAddresses.getAddress());
        UserAddresses findADNew = findAddress(userAddresses.getAddress());
        UserAddresses findPOld = findPhone(userAddresses.getPhoneNumber());
        UserAddresses findPNew = findPhone(userAddresses.getPhoneNumber());
        
        if(findADOld.getAddress().equals(userAddresses.getAddress()) || 
                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber()) ||
                findADOld.getAddress().equals(userAddresses.getAddress()) && 
                findPOld.getPhoneNumber().equals(userAddresses.getPhoneNumber())){ // không thay đổi userAddress hoặc phone, cả 2 cùng không thay đổi
                try {
                    Users user = findUserID(userID);
                    userAddresses.setUser(user);
                    
                    getEm().merge(userAddresses);
                    error = 1;
            } catch (Exception e) {
                error = 0;
            }
        }else{    
            if (findADNew != null || findPNew != null || findADNew != null && findPNew != null) {
            error = 2; // phone hoặc address bị trùng, hoặc cả hai cùng bị trùng
        } else {
            try {
                    Users user = findUserID(userID);
//                    if(!email.equals("")){
//                        u.setEmail(email);
//                        error = 4;
//                    }else{
                    userAddresses.setUser(user);
                    userAddresses.getAddressID();
                    getEm().merge(userAddresses);
                    error = 1;
//                    }
                
            } catch (Exception e) {
                error = 0;
            }
        }
        }
        return error;
    }

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

}
