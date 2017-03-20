package spring.client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/orders/")
public class OrdersController {

    @RequestMapping(value = "checkout")
    public String checkout() {
        return "client/pages/checkout";
    }
    
    @RequestMapping(value = "shoppingcart")
    public String shoppingcart(){
        return "client/pages/shoppingcart";
    }
}
