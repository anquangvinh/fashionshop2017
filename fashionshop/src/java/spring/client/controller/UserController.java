package spring.client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user/")
public class UserController {

    @RequestMapping(value = "login")
    public String login() {
        return "client/pages/login";
    }

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

    @RequestMapping(value = "my-account")
    public String myaccount() {
        return "client/pages/my-account";
    }

    @RequestMapping(value = "review-rating")
    public String reviewrating() {
        return "client/pages/review-rating";
    }

    @RequestMapping(value = "return-product")
    public String returnproduct() {
        return "client/pages/return";
    }

    @RequestMapping(value = "order-history")
    public String orderhistory() {
        return "client/pages/order-history";
    }

    @RequestMapping(value = "newsletter")
    public String newsletter() {
        return "client/pages/newsletter";
    }
}
