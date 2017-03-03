/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/admin/user/")
public class User_Controller {
    
    @RequestMapping(value = "list")
    public String userList() {
        return "admin/pages/user-list";
    }
    
    @RequestMapping(value = "role")
    public String userRole(){
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
}
