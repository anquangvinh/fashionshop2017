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
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String ctx = request.getContextPath();
        String uri = request.getRequestURI();
        String base = uri.substring(ctx.length());
        session.setAttribute("request_url", base);
        UsersStateLessBeanLocal usersStateLessBean = lookupUsersStateLessBeanLocal();
//        Cookie[] ck = request.getCookies();
//        if (ck != null) {
//            String email = "";
//            String pass = "";
//            for (Cookie c : ck) {
//                if (c.getName().equals("emailA")) { //kiểm tra có cookie tên là email ko
//                    email = c.getValue(); // nếu có thì lấy giá trị của ck email đó, gán cho thằng String email ở trên
//                }
//
//                if (c.getName().equals("passwordA")) { // kiểm tra có cookie tên là password ko
//                    pass = c.getValue(); // nếu có thì lấy giá trị ck password đó, gán cho thằng String pass ở trên
//                }
//            }
//
//            if (email != "" && pass != "") { //Sau khi lặp, nếu cả 2 cùng khác rỗng => nó có lưu cookie
//                int error = usersStateLessBean.login(email, pass); // lúc này kiểm tra đăng nhập.
//                if (error == 1) { //Nếu đăng nhập thành công
//                    session.setAttribute("email", email); //tạo ra session email. tới đây tương tự như controller.
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                return false;
//            }
//        } else {
            if (session.getAttribute("email") != null) {
//            if(session.getAttribute("request_url").equals(request.getContextPath() + "/admin/login.html")){
//                response.sendRedirect(request.getContextPath() + "/admin/user/list.html");
//                return true;
//            }
                return true;
            } else {
                response.sendRedirect(request.getContextPath() + "/admin/login.html");
//            session.setAttribute("urlLogin", request.getContextPath() + "/admin/login.html");
//            session.setAttribute("a", request.getContextPath() + "/admin/login.html");
                //request.getContextPath(): get lấy đường link gốc (contextPath) của request. ở đây là http://localhost:8080/fashionshop
                return false;
            }
//        }

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
