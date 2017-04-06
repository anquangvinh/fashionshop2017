package spring.client.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.RolesStateLessBeanLocal;
import spring.ejb.UserAddressesStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.UserAddresses;
import spring.entity.Users;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/user/")
public class UserController {
    UserAddressesStateLessBeanLocal userAddressesStateLessBean = lookupUserAddressesStateLessBeanLocal();
    RolesStateLessBeanLocal rolesStateLessBean = lookupRolesStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();

    @Autowired
    SharedFunctions sharedFunc;
    @Autowired
    ServletContext app;

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String login(ModelMap model) {
        Users users = new Users();
        model.addAttribute("users", users);
        return "client/pages/login";
    }

    @RequestMapping(value = "register", method = RequestMethod.POST)
    public String createUser(@ModelAttribute("users") Users newUser,
            @RequestParam("upImage") MultipartFile image,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("address") String address,
            RedirectAttributes redirectAttributes,
            ModelMap model) {
        newUser.setPassword(sharedFunc.encodePassword(newUser.getPassword()));
        if (image.isEmpty()) {
            newUser.setAvatar("default_user.jpg");
        } else {
            try {
                newUser.setAvatar(image.getOriginalFilename());
                String path = app.getRealPath("/assets/images/") + "/" + newUser.getAvatar();
                image.transferTo(new File(path));

            } catch (IOException | IllegalStateException ex) {
                Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        try {
            newUser.setRegistrationDate(new Date());
            newUser.setStatus(Short.parseShort("1"));
            newUser.setRole(rolesStateLessBean.findRoles(3));
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }

        int error = usersStateLessBean.addUsers(newUser, phoneNumber, address);

        if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-success\">Create New User Successfully!</div>");
            
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Error was happened!</div>");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Users Exitsted!</div>");
        }else if(error == 3){
           model.addAttribute("ee","Input Phone and Address or blank ");
           return "redirect:/user/register.html";
        }

        return "redirect:/user/login.html";
    }

    @RequestMapping(value = "change-password/{userID}" , method = RequestMethod.GET)
    public String changePass(@PathVariable("userID") Integer userID,
           ModelMap model) {
        Users users = usersStateLessBean.getUserByID(userID);
        model.addAttribute(users);
        return "client/pages/changepassword";
    }
    
    @RequestMapping(value = "change-password/{userID}")
    public String changePass(@RequestParam("password") String password,
            @RequestParam("passwords") String passwords, @PathVariable("userID") Integer userID,
            RedirectAttributes redirectAttributes) {
        Users users = usersStateLessBean.getUserByID(userID);
        users.setPassword(sharedFunc.encodePassword(users.getPassword()));
        int error = usersStateLessBean.updateUser(users, passwords);
        
        if(error == 3){
            redirectAttributes.addFlashAttribute("error", "Input Repass");
        }else if(error == 1){
            redirectAttributes.addFlashAttribute("error", "Save");
        }
        return "redirect:/user/change-password/" + userID + ".html";
    }

    @RequestMapping(value = "address-book/{userID}", method = RequestMethod.GET)
    public String addressbook(ModelMap model, @PathVariable("userID") Integer userID) {
        Users userAddresses = userAddressesStateLessBean.findUserID(userID);
//        model.addAttribute(userAddresses, "userAddresses");
        return "client/pages/address-book";
    }
    
    @RequestMapping(value = "address-book/{userID}", method = RequestMethod.POST)
    public String addressbook(ModelMap model, @ModelAttribute("userAddresses") UserAddresses userAddresses,
            RedirectAttributes redirectAttributes, @PathVariable("userID") int userID){
        int error;
        error = userAddressesStateLessBean.addAddressUser(userAddresses, userID);
        if(error == 2){
            redirectAttributes.addFlashAttribute("error", "Trùng");
        }else if(error == 3){
            redirectAttributes.addFlashAttribute("error", "thiếu");
        }else if(error == 1){
            redirectAttributes.addFlashAttribute("error", "ok");
        }else if(error == 0){
            redirectAttributes.addFlashAttribute("error", "lỗi");
        }
//        model.addAttribute(userAddresses, "ua");
        return "redirect:/user/address-book/" + userID +".html";
    }

    @RequestMapping(value = "account-information/{userID}", method = RequestMethod.GET)
    public String accountinfo(ModelMap model, @PathVariable("userID") int userID) {
        Users user = usersStateLessBean.getUserByID(userID);
        model.addAttribute(user);
        return "client/pages/account-information";
    }

    @RequestMapping(value = "account-information/{userID}", method = RequestMethod.POST)
    public String accountinfo(@PathVariable("userID") int userID ,
            @ModelAttribute("user") Users user, @RequestParam("repass") String repass,
            RedirectAttributes redirectAttributes) {
        int error = usersStateLessBean.updateUser(user, repass);
        if(error == 1){
            redirectAttributes.addFlashAttribute("error", "thành công");
        }else if(error == 2){
            redirectAttributes.addFlashAttribute("error","trùng email" );
        }else if(error == 3){
            repass = user.getPassword();
        }else if(error == 0){
            redirectAttributes.addFlashAttribute("error", "lỗi");
        }
        return "redirect:/user/account-information/" + userID + ".html";
    } 
    @RequestMapping(value = "order-history")
    public String orderhistory() {
        return "client/pages/order-history";
    }

    @RequestMapping(value = "myaccount")
    public String checkOut() {
        return "client/pages/my-account";
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

    private UserAddressesStateLessBeanLocal lookupUserAddressesStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (UserAddressesStateLessBeanLocal) c.lookup("java:global/fashionshop/UserAddressesStateLessBean!spring.ejb.UserAddressesStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

}
