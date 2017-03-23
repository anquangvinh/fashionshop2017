/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.Roles;
import spring.entity.Users;

@Controller
@RequestMapping(value = "/admin/user/")
public class User_Controller {
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    
    @RequestMapping(value = "list")
    public String userList(Model model) {
        List<Users> ulist = usersStateLessBean.getAllUsers();
        model.addAttribute("ulist", ulist);
        return "admin/pages/user-list";
    }
    
    @RequestMapping(value = "role")
    public String userRole(Model model){
        List<Users> rlist = usersStateLessBean.getAllUsers();
        model.addAttribute("rlist", rlist);
        return "admin/pages/user-role-list";
    }
    
    @RequestMapping(value = "role/create")
    public String userRoleAdd(){
        return "admin/pages/user-role-add";
    }
    
    @RequestMapping(value = "role/edit")
    public String userRoleUpdate(){
        return "admin/pages/user-role-update";
    }

    private UsersStateLessBeanLocal lookupUsersStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (UsersStateLessBeanLocal) c.lookup("java:global/fashionshop/UsersStateLessBean!spring.ejb.UsersStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
