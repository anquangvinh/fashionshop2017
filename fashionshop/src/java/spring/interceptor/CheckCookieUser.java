/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.interceptor;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import spring.ejb.UsersStateLessBeanLocal;

/**
 *
 * @author hoang
 */
public class CheckCookieUser extends HandlerInterceptorAdapter{

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
        Cookie[] cki = request.getCookies();
        if(cki != null){
            String email = "";
            String pass = "";
            for(Cookie ck : cki){
              if(ck.getName().equals("emailU"))  {
                  email = ck.getValue();
              }
              
              if(ck.getName().equals("passwordU")){
                  pass = ck.getValue();
              }
            }
            
            if(email != "" && pass != ""){
                int error = usersStateLessBean.checkLoginUser(email, pass);
                if(error == 1){
                    session.setAttribute("emailUser", email);
                    return true;
                }else{
                    return false;
                }
            }else {
                return true;
            }
        }else{
//            response.sendRedirect(request.getContextPath() + "/user/login.html");
            return true;
        }
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
}
