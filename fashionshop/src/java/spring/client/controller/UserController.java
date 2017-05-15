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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import spring.ejb.ProductStateLessBeanLocal;
import spring.ejb.RolesStateLessBeanLocal;
import spring.ejb.UserAddressesStateLessBeanLocal;
import spring.ejb.UsersStateLessBeanLocal;
import spring.entity.Categories;
import spring.entity.UserAddresses;
import spring.entity.Users;
import spring.functions.SharedFunctions;

@Controller
@RequestMapping(value = "/user/")
public class UserController {

    UserAddressesStateLessBeanLocal userAddressesStateLessBean = lookupUserAddressesStateLessBeanLocal();
    RolesStateLessBeanLocal rolesStateLessBean = lookupRolesStateLessBeanLocal();
    UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
    ProductStateLessBeanLocal productStateLessBean = lookupProductStateLessBeanLocal();

    @Autowired
    SharedFunctions sharedFunc;
    @Autowired
    ServletContext app;

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String login(ModelMap model
    //            , HttpSession session, HttpServletRequest request
    ) {
//        Users user = checkCookie(request);
//        if (user == null) {
//            return "client/pages/index";
//        } else {
//            int error = usersStateLessBean.checkLoginUser(user.getEmail(), sharedFunc.encodePassword(user.getPassword()));
//            if (error == 1) {
//                session.setAttribute("emailUser", user.getEmail());
//            } else if (error == 2) {
//                return "client/pages/index";
//
//            } else {
//                return "client/pages/index";
//
//            }
//        }
        Users users = new Users();
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        model.addAttribute("users", users);
//        return "client/pages/login";
//        return "client/blocks/loginModal";

        return "client/pages/index";
    }

    @ResponseBody
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String login(ModelMap model,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "checkremember", required = false) Short checkremember,
            HttpSession session, RedirectAttributes redirectAttributes,
            HttpServletResponse response
    //            HttpServletRequest request, 
    ) {
        String err = "";
        int error = usersStateLessBean.checkLoginUser(email, sharedFunc.encodePassword(password));
        if (error == 1) {
            session.setAttribute("emailUser", email);
            err = (String) session.getAttribute("emailUser");
            Users userfindUserID = usersStateLessBean.findUserByEmail(email);
            session.setAttribute("findUsersID", userfindUserID.getUserID());
            session.setAttribute("USfirstname", userfindUserID.getFirstName() + " " + userfindUserID.getLastName());

            if (checkremember != null && checkremember == 1) {
                Cookie ckEmail = new Cookie("emailU", email);
                ckEmail.setMaxAge(3600);
                response.addCookie(ckEmail);
                Cookie ckPassword = new Cookie("passwordU", sharedFunc.encodePassword(password));
                ckPassword.setMaxAge(3600);
                response.addCookie(ckPassword);
            }
            return err;
        } else if (error == 2) {
            return "2";
        } else if (error == 3) {
            return "4";
        } else {
            return "3";
        }
    }

//    public Users checkCookie(HttpServletRequest request) {
//        Cookie[] cookies = request.getCookies();
//        Users users = null;
//        String email = "", password = "";
//        for (Cookie ck : cookies) {
//            if (ck.getName().equalsIgnoreCase("email")) {
//                email = ck.getValue();
//            }
//            if (ck.getName().equalsIgnoreCase("password")) {
//                password = ck.getValue();
//            }
//        }
//        if (!email.isEmpty() && !password.isEmpty()) {
//            users = new Users();
//        }
//
//        return users;
//    }
    @ResponseBody
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public String createUser(
            @RequestParam("email") String email, @RequestParam("password") String password,
            @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
            @RequestParam("gender") short gender, @RequestParam("birthday") Date birthday,
            @RequestParam(value = "upImage", required = false) MultipartFile image,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "address", required = false) String address,
            RedirectAttributes redirectAttributes,
            ModelMap model, HttpSession session) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd_HH_mm_ss");
        Users newUser = new Users();
        newUser.setEmail(email);
        newUser.setPassword(sharedFunc.encodePassword(password));
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setGender(gender);
        newUser.setBirthday(birthday);
        newUser.setStatus(Short.parseShort("1"));
        newUser.setRole(rolesStateLessBean.findRoles(3));
        try {
            newUser.setRegistrationDate(new Date());
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }

        if (image.isEmpty()) {
            newUser.setAvatar("default_user.jpg");
        } else {
            try {
                newUser.setAvatar(simpleDateFormat.format(new Date()) + sharedFunc.changeText(image.getOriginalFilename()));
//                newUser.setAvatar(image.getOriginalFilename());
                String path = app.getRealPath("/assets/images/avatar/") + "/" + newUser.getAvatar();
                image.transferTo(new File(path));

            } catch (IOException | IllegalStateException ex) {
                Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        if (phoneNumber == null) {
            phoneNumber = "";
        }

        if (address == null) {
            address = "";
        }

        int error = usersStateLessBean.addUsers(newUser, phoneNumber, address);
        if (error == 1) {
            session.setAttribute("emailUser", newUser.getEmail());
            Users userfindUserID = usersStateLessBean.findUserByEmail(newUser.getEmail());
            session.setAttribute("findUsersID", userfindUserID.getUserID());
            session.setAttribute("USfirstname", userfindUserID.getFirstName() + " " + userfindUserID.getLastName());
            return "1";
        } else if (error == 2) {
            return "2";
        } else {
            return "0";
        }
    }

    @RequestMapping(value = "change-password/{userID}", method = RequestMethod.GET)
    public String changePass(ModelMap model, @PathVariable("userID") int userID) {
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        return "client/pages/changepassword";
    }

    @RequestMapping(value = "change-password/{userID}", method = RequestMethod.POST)
    public String changePass(@PathVariable("userID") int userID, @RequestParam("password") String password,
            @RequestParam("repassword") String repassword, @RequestParam("oldpassword") String oldpassword,
            RedirectAttributes redirectAttributes) {
        Users findOldUserID = usersStateLessBean.getUserByID(userID);

        if (!findOldUserID.getPassword().equals(sharedFunc.encodePassword(oldpassword))) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Error Current Password wrong!</div>");
        } else if (password.equals(repassword)) {
            usersStateLessBean.changePass(userID, sharedFunc.encodePassword(password));
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-success\">Update Password Successfully!</div>");
        } else if (!password.equals(repassword)) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-5  alert alert-danger\">FAILED!. Error was happened, Password and Repassword is wrong!</div>");
        }

        return "redirect:/user/change-password/" + userID + ".html";
    }

//    @RequestMapping(value = "address-add/{userID}", method = RequestMethod.GET)
//    public String addressAdd(@PathVariable("userID") int userID, ModelMap model) {
//        List<UserAddresses> listAddress = usersStateLessBean.getUserByID(userID).getUserAddressList();
//        if (listAddress.size() < 20) {
//            //2 dòng này thêm để render ra menu chính
//            List<Categories> cateList = productStateLessBean.categoryList();
//            model.addAttribute("cateList", cateList);
//
////            return "client/pages/address-user-add";
//            return "client/pages/address-list";
//        } else {
//            model.addAttribute("message", "Không thể thêm AddressUser");
//            return "redirect:/user/myaccount.html";
//        }
//
//    }
    @RequestMapping(value = "address-add/{userID}", method = RequestMethod.POST)
    public String addressAdd(@PathVariable("userID") int userID, @ModelAttribute("userAddress") UserAddresses userAddress,
            RedirectAttributes redirectAttributes) {

        List<UserAddresses> listAddress = usersStateLessBean.getUserByID(userID).getUserAddressList();
        for (UserAddresses list : listAddress) {
            if (list.getAddress().equals(userAddress.getAddress()) && list.getPhoneNumber().equals(userAddress.getPhoneNumber())) {
                redirectAttributes.addFlashAttribute("error", "bị trùng");
                return "redirect:/user/address-add/" + userID + ".html";
            }
            break;
        }
        userAddressesStateLessBean.addAddressUser(userAddress, userID);
        redirectAttributes.addFlashAttribute("error", "OK");
        return "redirect:/user/address-list/" + userID + ".html";
    }

    @RequestMapping(value = "address-list/{userID}")
    public String addresslist(ModelMap model, @PathVariable("userID") int userID) {
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        List<UserAddresses> ualist = userAddressesStateLessBean.AddressListUser(userID);
        model.addAttribute("ualist", ualist);
        model.addAttribute("userAddress", new UserAddresses());
        return "client/pages/address-list";
    }

    @RequestMapping(value = "address-book/{userID}-{addressID}", method = RequestMethod.GET)
    public String addressbook(ModelMap model, @PathVariable("userID") int userID,
            @PathVariable("addressID") int addressID) {
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);

        UserAddresses userAddresses = userAddressesStateLessBean.findID(userID);
        UserAddresses userAddresses1 = userAddressesStateLessBean.findAddressID(addressID);
        
        model.addAttribute("userAddresses", userAddresses1);
        return "client/pages/address-book";

    }

    @RequestMapping(value = "address-book/{userID}-{addressID}", method = RequestMethod.POST)
    public String addressbook(ModelMap model, @ModelAttribute("userAddresses") UserAddresses userAddresses,
            RedirectAttributes redirectAttributes, @PathVariable("userID") int userID,
            @PathVariable("addressID") int addressID) {
        int error;
        model.addAttribute("addressID", userAddresses.getAddressID());
        error = userAddressesStateLessBean.editAddressUser(userAddresses, userID);
        if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "Trùng");
        } else if (error == 1) {
            redirectAttributes.addFlashAttribute("error", "ok");
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "lỗi");
        }
        return "redirect:/user/address-book/" + userID + "-" + addressID + ".html";
    }

    @RequestMapping(value = "deleteAddress")
    public String deleteaddress(@RequestParam("addressID") int addressID, ModelMap model) {
        UserAddresses usa = userAddressesStateLessBean.findAddressID(addressID);
        userAddressesStateLessBean.deleteAddress(usa.getAddressID());
        return "";

    }

    @RequestMapping(value = "account-information/{userID}", method = RequestMethod.GET)
    public String accountinfo(@PathVariable("userID") int userID, ModelMap model) {
        Users updateUser = usersStateLessBean.getUserByID(userID);

        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);

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
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-success\">Update Account Successfully!</div>");
        } else if (error == 2) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Email Exitsted! </div>");
        } else if (error == 0) {
            redirectAttributes.addFlashAttribute("error", "<div class=\"col-md-12  alert alert-danger\">FAILED!. Error was happened!</div>");
        }
        return "redirect:/user/account-information/" + userID + ".html";
    }

    @RequestMapping(value = "myaccount")
    public String checkOut(ModelMap model) {
        //2 dòng này thêm để render ra menu chính
        List<Categories> cateList = productStateLessBean.categoryList();
        model.addAttribute("cateList", cateList);
        return "client/pages/my-account";
    }

    @RequestMapping(value = "logout")
    public String logOut(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        //Remove Session
        session.removeAttribute("emailUser");
        session.removeAttribute("findUsersID");
        session.removeAttribute("USfirstname");

        //Remove cookie
        for (Cookie ck : request.getCookies()) {
            if (ck.getName().equalsIgnoreCase("emailU")) {
                ck.setMaxAge(0);
                response.addCookie(ck);
            }
            if (ck.getName().equalsIgnoreCase("passwordU")) {
                ck.setMaxAge(0);
                response.addCookie(ck);
            }
        }

        return "redirect:/index.html";
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

    private ProductStateLessBeanLocal lookupProductStateLessBeanLocal() {
        try {
            Context c = new InitialContext();
            return (ProductStateLessBeanLocal) c.lookup("java:global/fashionshop/ProductStateLessBean!spring.ejb.ProductStateLessBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
