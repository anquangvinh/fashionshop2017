/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BlogController {

    @RequestMapping(value = "/blog")
    public String blog() {
        return "client/pages/blog";
    }
    
    @RequestMapping(value = "/blog/detail")
    public String blogdetail(){
        return "client/pages/blog-details";
    }
}
