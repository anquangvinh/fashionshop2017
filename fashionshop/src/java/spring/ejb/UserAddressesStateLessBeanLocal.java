/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.ejb;

import java.util.List;
import javax.ejb.Local;
import spring.entity.UserAddresses;
import spring.entity.Users;

/**
 *
 * @author hoang
 */
@Local
public interface UserAddressesStateLessBeanLocal {
    
    List<UserAddresses> getAddressUser();
    
    int addAddressUser(UserAddresses userAddresses, int userID);
    
    UserAddresses findAddress(String address);
    
    UserAddresses findPhone(String phone);
    
    int editAddressUser(UserAddresses userAddresses, int userID);
    
    Users findUserID(int userID);
    
    void addUser(Users user);
}
