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
        try {
            Users u = findUserID(userID);
            userAddresses.setUser(u);
            u.getUserAddressList().add(userAddresses);
            getEm().persist(userAddresses);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public UserAddresses findAddress(int userID) {
        Query q = getEm().createQuery("SELECT ua.address, ua.phoneNumber FROM UserAddresses ua WHERE ua.user.userID = :userID", UserAddresses.class);
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
        q.setParameter("userID", userID);
        try {
            return (UserAddresses) q.getSingleResult();
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public int editAddressUser(UserAddresses userAddresses, int userID) {
        int error;
        
            try {
                    Users user = findUserID(userID);
                    userAddresses.setUser(user);
                    userAddresses.getAddressID();
                    getEm().merge(userAddresses);
                    error = 1;
                
            } catch (Exception e) {
                error = 0;
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

    @Override
    public void deleteAddress(int addressID) {
        UserAddresses findUseraddress = findAddressID(addressID);
        findUserID(findUseraddress.getUser().getUserID()).getUserAddressList().remove(findUseraddress);
        getEm().remove(findUseraddress);
        
    }

}
