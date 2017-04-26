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
public interface UsersStateLessBeanLocal {

    List<Users> getAllUsers();

    Users findUserByEmail(String email); 
    
    int addUsers(Users users, String phone, String address) ; //kiểu trả vẻ: int hoặc string. nếu dùng int: int error_code; nếu error_code = 1 => insert thành công, error_code = 2 => username này bị trùng, error_code = 0=> có lỗi xãy ra

    Users getUserByID(int userID);
    
    void addUserAddress(UserAddresses newUserAddress);
    
    boolean updateStatusUser(int userID, short status);
    
//    int updateUserPass(Users user,String pass, String repass);
    
    int updateUser(Users user);
    
    int login(String email, String pass);
    
    int checkLoginUser(String email, String pass);
    void changePass(int userID, String newpass);
//    boolean changePass(int userID, String pass, String repass);
}
