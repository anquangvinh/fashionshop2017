/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package spring.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 *
 * @author hoang
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String ctx = request.getContextPath();
        String uri = request.getRequestURI();
        String base = uri.substring(ctx.length());
        session.setAttribute("request_url", base);
        
        if (session.getAttribute("email") != null) {
            return true;
        } else {
            response.sendRedirect(request.getContextPath() + "/admin/login.html");
            //request.getContextPath(): get lấy đường link gốc (contextPath) của request. ở đây là http://localhost:8080/fashionshop
            return false;
        }
    }

}
