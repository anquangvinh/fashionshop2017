package spring.client.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
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

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String login(ModelMap model,
            @RequestParam("email") String email, @RequestParam("password") String password,
            HttpSession session, RedirectAttributes redirectAttributes) {
        int error = usersStateLessBean.checkLoginUser(email, sharedFunc.encodePassword(password));
        if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "ok"); // sửa lại thông báo
            session.setAttribute("emailUser", email);
            Users userfindUserID = usersStateLessBean.findUserByEmail(email);
            session.setAttribute("findUsersID", userfindUserID.getUserID());
            return "redirect:http://localhost:8080/fashionshop/";
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "sai email");
        } else {
            redirectAttributes.addFlashAttribute("error", "sai pass");
        }
        return "redirect:/user/login.html";
    }

    @RequestMapping(value = "register", method = RequestMethod.POST)
    public String createUser(@ModelAttribute("users") Users newUser,
            @RequestParam("upImage") MultipartFile image,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("address") String address,
            RedirectAttributes redirectAttributes,
            ModelMap model, HttpSession session) {
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
        if (error == 3) {
            model.addAttribute("ee", "Input Phone and Address or blank ");
            return "redirect:/user/register.html";
        } else if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-success\">Create New User Successfully!</div>");
            session.setAttribute("emailUser", newUser.getEmail());
//            Users userfindID = usersStateLessBean.getUserByID(newUser.getUserID());
            Users userfindUserID = usersStateLessBean.findUserByEmail(newUser.getEmail());
            session.setAttribute("findUsersID", userfindUserID.getUserID());
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Error was happened!</div>");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Users Exitsted!</div>");
        }

        return "redirect:/user/login.html";
    }

    @RequestMapping(value = "change-password/{userID}", method = RequestMethod.GET)
    public String changePass(ModelMap model, @PathVariable("userID") int userID) {
        return "client/pages/changepassword";
    }

    @RequestMapping(value = "change-password/{userID}", method = RequestMethod.POST)
    public String changePass(@PathVariable("userID") int userID, @RequestParam("password") String password,
            @RequestParam("repassword") String repassword,@RequestParam("oldpassword") String oldpassword,
            RedirectAttributes redirectAttributes) {
        Users findOldUserID = usersStateLessBean.getUserByID(userID);
//        int error = usersStateLessBean.updateUserPass(findUserID, sharedFunc.encodePassword(oldpassword), sharedFunc.encodePassword(password));
        
        if(!findOldUserID.getPassword().equals(sharedFunc.encodePassword(oldpassword))){
            redirectAttributes.addFlashAttribute("error", "nhập pass cũ sai");
        }else if(password.equals(repassword)){
            usersStateLessBean.changePass(userID, sharedFunc.encodePassword(password));
            redirectAttributes.addFlashAttribute("error", "ok");
        }else if (!password.equals(repassword)) {
            //Users findUserID = usersStateLessBean.getUserByID(userID);
            redirectAttributes.addFlashAttribute("error", "hãy nhập pass thay đổi");   
        } 

//        if (error == 1) {
//            redirectAttributes.addFlashAttribute("error", "OK");
//        } else if (error == 3) {
//            redirectAttributes.addFlashAttribute("error", "giữ cũ");
//        } else if (error == 4) {
//            redirectAttributes.addFlashAttribute("error", "pass sai");
//        } else if (error == 5) {
//            redirectAttributes.addFlashAttribute("error", "hãy nhập pass thay đổi");
//        } else if(!password.equals(repassword)){
//            redirectAttributes.addFlashAttribute("error", "nhập lại sai");
//        }

        return "redirect:/user/change-password/" + userID + ".html";
    }

    @RequestMapping(value = "address-add/{userID}", method = RequestMethod.GET)
    public String addressAdd(@PathVariable("userID") int userID, ModelMap model) {
        UserAddresses userAddress = new UserAddresses();
        model.addAttribute("userAddress", userAddress);
        return "client/pages/address-user-add";
    }

    @RequestMapping(value = "address-add/{userID}", method = RequestMethod.POST)
    public String addressAdd(@PathVariable("userID") int userID, @ModelAttribute("userAddress") UserAddresses userAddress,
            RedirectAttributes redirectAttributes) {
        int error = userAddressesStateLessBean.addAddressUser(userAddress, userID);
        if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "Phone or Address trùng");
        } else if (error == 3) {
            redirectAttributes.addFlashAttribute("error", "Nhập cả 2");
        } else if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "OK");
        }
        return "redirect:/user/address-add/" + userID + ".html";
    }

    @RequestMapping(value = "address-list/{userID}")
    public String addresslist(ModelMap model, @PathVariable("userID") int userID){
        List<UserAddresses> ualist = userAddressesStateLessBean.AddressListUser(userID);
        model.addAttribute("ualist", ualist);
        
        return "client/pages/address-list";
    }
    
    @RequestMapping(value = "address-book/{addressID}-{userID}", method = RequestMethod.GET)
    public String addressbook(ModelMap model, @PathVariable("userID") int userID, 
            @PathVariable("addressID") int addressID) {
        UserAddresses userAddresses = userAddressesStateLessBean.findID(userID);
        UserAddresses userAddresses1 = userAddressesStateLessBean.findAddressID(addressID);
//        model.addAttribute("userAddresses", userAddresses);
        model.addAttribute("userAddresses", userAddresses1);
        return "client/pages/address-book";
    }

    @RequestMapping(value = "address-book/{addressID}-{userID}", method = RequestMethod.POST)
    public String addressbook(ModelMap model, @ModelAttribute("userAddresses") UserAddresses userAddresses,
            RedirectAttributes redirectAttributes, @PathVariable("userID") int userID,
            @PathVariable("addressID") int addressID) {
        int error;
        addressID = userAddresses.getAddressID();
        model.addAttribute("addressID", addressID);
        error = userAddressesStateLessBean.editAddressUser(userAddresses, userID);
        if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "Trùng");
        } else if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "ok");
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "lỗi");
        }
//        model.addAttribute(userAddresses, "ua");
        return "redirect:/user/address-book/" + addressID + "-" + userID + ".html";
    }

    @RequestMapping(value = "account-information/{userID}", method = RequestMethod.GET)
    public String accountinfo(@PathVariable("userID") int userID, ModelMap model) {
        Users updateUser = usersStateLessBean.getUserByID(userID);

        //Change normal date to string
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = updateUser.getBirthday();
        String formattedDate = dateFormat.format(date);
        model.addAttribute("formattedDate", formattedDate);

        model.addAttribute("updateUser", updateUser);
        return "client/pages/account-information";
    }

    @RequestMapping(value = "account-information/{userID}", method = RequestMethod.POST)
    public String accountinfo(@PathVariable("userID") int userID,
            @ModelAttribute("updateUser") Users updateUser,
            RedirectAttributes redirectAttributes, @RequestParam("upImage") MultipartFile image) {
        Users oldUser = usersStateLessBean.getUserByID(userID); // thong tin user chua chinh sua
       
        try {
            if (!image.isEmpty()) {
                updateUser.setAvatar(image.getOriginalFilename());
                String path = app.getRealPath("/assets/images/") + "/" + updateUser.getAvatar();
                image.transferTo(new File(path));
            } else {
                updateUser.setAvatar(oldUser.getAvatar());
            }
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }
   
        try {
            updateUser.setRegistrationDate(oldUser.getRegistrationDate());
            updateUser.setStatus(oldUser.getStatus());
            updateUser.setRole(oldUser.getRole());
            updateUser.setPassword(oldUser.getPassword());
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }
        int error = usersStateLessBean.updateUser(updateUser);

        if (error == 1) {
            Users afterUpdateUser = usersStateLessBean.getUserByID(userID);
            //Change normal date to string
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date date = afterUpdateUser.getBirthday();
            String formattedDate = dateFormat.format(date);
            redirectAttributes.addFlashAttribute("formattedDate", formattedDate);
            redirectAttributes.addFlashAttribute("updateUser", afterUpdateUser);
            redirectAttributes.addFlashAttribute("error", "thành công");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "trùng email");
        } else if (error == 0) {
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
    
    @RequestMapping(value = "logout")
    public String logOut(HttpSession session){
        session.removeAttribute("emailUser");
        
        return "redirect:/user/login.html";
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
