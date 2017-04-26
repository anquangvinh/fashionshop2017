/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.RolesStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.Roles;
import spring.entity.UserAddresses;
import spring.entity.Users;

@Controller
@RequestMapping(value = "/admin/user/")
public class User_Controller {

    RolesStateLessBeanLocal rolesStateLessBean = lookupRolesStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    
    @RequestMapping(value = "list")
    public String userList(Model model) {
        List<Users> ulist = usersStateLessBean.getAllUsers();
        model.addAttribute("ulist", ulist);
        return "admin/pages/user-list";
    }

    @RequestMapping(value = "role")
    public String roleList(Model model) {
        List<Roles> rlist = rolesStateLessBean.getRole();
        model.addAttribute("rlist", rlist);
        return "admin/pages/user-role-list";
    }

    @RequestMapping(value = "role/create", method = RequestMethod.GET)
    public String userRoleAdd(ModelMap model) {
        Roles role = new Roles();
        model.addAttribute("role", role);
        return "admin/pages/user-role-add";
    }

    @RequestMapping(value = "role/create", method = RequestMethod.POST)
    public String userRoleAdd(@ModelAttribute("role") Roles newRole,
            RedirectAttributes redirectAttributes) {

        int error = rolesStateLessBean.addRoles(newRole);

        if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-success\">Create New Roles Successfully!</div>");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Roles Exitsted! </div>");
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error was happened!</div>");
        }
        redirectAttributes.addFlashAttribute("role", newRole);
        return "redirect:/admin/user/role/create.html";

    }

    @ResponseBody
    @RequestMapping(value = "updateStatus", method = RequestMethod.POST)
    public String userStatusUpdate(@RequestParam("userID") Integer userID,
            @RequestParam("status") Short status) {
        if (usersStateLessBean.updateStatusUser(userID, status)) {
            return "ok";
        } else {
            return "fail";
        }
    }

    @ResponseBody
    @RequestMapping(value = "usersrole/edit", method = RequestMethod.POST)
    public String userRoleUpdate(ModelMap model, @RequestParam("userID") Integer userID,
            @RequestParam("roleID") Integer roleID) {
        if (rolesStateLessBean.editRolesForUsers(userID, roleID)) {
            return "thành công";
        }
        return "thất bại";
    }

    @RequestMapping(value = "role/edit/{roleID}", method = RequestMethod.GET)
    public String userRoleUpdate(ModelMap model, @PathVariable("roleID") int roleID) {
        model.addAttribute("roleupdate", rolesStateLessBean.findRoles(roleID));
        return "admin/pages/user-role-update";
    }

    @RequestMapping(value = "role/edit/{roleID}", method = RequestMethod.POST)
    public String userRoleUpdate(ModelMap model, @PathVariable("roleID") int roleID,
            RedirectAttributes redirectAttributes, @ModelAttribute("roleupdate") Roles roleupdate) {
        int error = rolesStateLessBean.editRoles(roleupdate);
        if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-success\">Update Roles Successfully!</div>");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Roles Exitsted! </div>");
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error was happened!</div>");
        }
        redirectAttributes.addFlashAttribute("roleupdate", roleupdate);
        return "redirect:/admin/user/role/edit/" + roleID + ".html";
    }
    
    @ResponseBody //Annotation này: dùng để trả về string nguyên thủy, ko trả về view.
    @RequestMapping(value = "ajax/getUserAddress", method = RequestMethod.POST)
    public String getUserAddress(@RequestParam("userID") Integer userID){
        List<UserAddresses> userAddressList = usersStateLessBean.getUserByID(userID).getUserAddressList();
        
        ObjectMapper om = new ObjectMapper();
        String json = om.writeValueAsString(userAddressList); //Chuyển list sang chuỗi JSON (com.fasterxml.jackson.databind.ObjectMapper;)
        
        return json;
    }
    
    @ModelAttribute("roles")
    public List<Roles> getRole() {
        return rolesStateLessBean.getRole();
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

    private RolesStateLessBeanLocal lookupRolesStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (RolesStateLessBeanLocal) c.lookup("java:global/fashionshop/RolesStateLessBean!spring.ejb.RolesStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

}
