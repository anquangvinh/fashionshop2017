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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.RolesStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.Users;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/user/")
public class UserController {

    RolesStateLessBeanLocal rolesStateLessBean = lookupRolesStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();

    @Autowired
    SharedFunctions sharedFunc;
    @Autowired
    ServletContext app;

    @RequestMapping(value = "login")
    public String login() {
        return "client/pages/login";
    }

    @RequestMapping(value = "create-user", method = RequestMethod.GET)
    public String createUser(ModelMap model) {
        Users users = new Users();
        model.addAttribute("users", users);
        return "client/pages/create-users";
    }

    @RequestMapping(value = "create-user", method = RequestMethod.POST)
    public String createUser(@ModelAttribute("users") Users newUser, //create user
            @RequestParam("upImage") MultipartFile image,
            RedirectAttributes redirectAttributes) {
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
//            Date date = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
            newUser.setRegistrationDate(new Date()); //coi lại hàm date này sao ko new Date(); mà lại phải xài String date = new....
            newUser.setStatus(Short.parseShort("1"));
            newUser.setRole(rolesStateLessBean.findRoles(3));
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }

//        if (usersStateLessBean.addUsers(newUser)) 
//        if(){
//            redirectAttributes.addFlashAttribute("status", "<div class=\"col-md-5  alert alert-success\">Create New User Successfully!</div>"); //create new role
//        } else {
//            redirectAttributes.addFlashAttribute("status", "<div class=\"col-md-5  alert alert-danger\">Create New User FAILED!. Error was happened!</div>"); //create new role
//            //dùng col-md-12  nên nó bành trường hết cả luôn. nát theme =))
//        }

        return "redirect:/user/create-user.html";
    }
    // 4 lỗi hả =))
    @RequestMapping(value = "change-password")
    public String changePass() {
        return "client/pages/changepassword";
    }

    @RequestMapping(value = "address-book")
    public String addressbook() {
        return "client/pages/address-book";
    }

    @RequestMapping(value = "account-information")
    public String accountinfo() {
        return "client/pages/account-information";
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

}
