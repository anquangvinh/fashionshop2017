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
                if (userAddresses.getAddress() == "" || userAddresses.getPhoneNumber() == "") {
                    String a = "Input address and phone or blank adress and phone";
                    error = 3;
                } else {
                    Users u = findUserID(userID);
                    if (u != null) {
                        userAddresses.setUser(u);
                    }
                    getEm().persist(userAddresses);
                    error = 1;
                }
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
    public int editAddressUser(UserAddresses userAddresses) {
        int error;
        UserAddresses findAD = findAddress(userAddresses.getAddress());
        UserAddresses findP = findPhone(userAddresses.getPhoneNumber());
        if (findAD != null || findP != null) {
            error = 2; // phone hoặc address bị trùng
        } else {
            try {
                if (userAddresses.getAddress() == "" || userAddresses.getPhoneNumber() == "") {
                    String a = "Input address and phone or blank adress and phone";
                    error = 3;
                } else {
                    getEm().merge(userAddresses);
                    error = 1;
                }
            } catch (Exception e) {
                error = 0;
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

}
