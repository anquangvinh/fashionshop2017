/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.admin.controller;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.RolesStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.functions.SharedFunctions;

@Controller
public class LoginController {

    RolesStateLessBeanLocal rolesStateLessBean = lookupRolesStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();

    @Autowired
    SharedFunctions sharedFunc;

    @RequestMapping(value = "/admin/login", method = RequestMethod.GET)
    public String login() {
        return "admin/login";
    }

    @RequestMapping(value = "/admin/login", method = RequestMethod.POST)
    public String login(ModelMap model,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            HttpSession session,
            HttpServletRequest request,
            RedirectAttributes redirectAttributes) {
        int error = usersStateLessBean.login(email, sharedFunc.encodePassword(password));
        if (error == 1) {
            session.setAttribute("email", email);
//            Object a = session.getAttribute("urlLogin");
//            if (session.getAttribute("request_url").equals(a)) {
//                return "redirect:/admin/user/list.html";
//            } else {
                return "redirect:" + session.getAttribute("request_url");
//            }
        } else if (error == 2) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">FAILED!. Error Email Wrong!</div>");
//            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error Email Wrong!</div>");
        } else if (error == 3) {
            model.addAttribute("error", "<div class=\"alert alert-danger\">FAILED!. Error Wrong!</div>");
//            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error Wrong!</div>");
        } else {
//            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error Password Wrong!</div>");
            model.addAttribute("error", "<div class=\"alert alert-danger\">FAILED!. Error Password Wrong!</div>");
        }
        return "admin/login";
    }

    @RequestMapping(value = "/admin/logout")
    public String logOut(HttpSession session){
        session.removeAttribute("email");
        
        return "redirect:/admin/login.html";
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
