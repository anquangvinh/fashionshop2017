package spring.client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GeneralController {

    @RequestMapping(value = "/index")
    public String index(){
        return "client/pages/index";
    }

}
