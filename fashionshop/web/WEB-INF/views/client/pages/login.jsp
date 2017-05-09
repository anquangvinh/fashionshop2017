<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>
<style>
    .ui-datepicker {
        height: auto !important;
        width: 19em;
    }
</style>
<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-8" id="fs-form-area">
                <!-- HTML -->
                <div id="account-id">
                    ${error}
                    <h4 class="account-title">
                        <span class="fa fa-chevron-right"></span>Login
                    </h4>                                                                  
                    <div class="account-form">
                        <form action="user/login.html" method="post" class="form-login"> 
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-12"> 
                                    <a href="#" class="btn facebook"><i class="fa fa-facebook"></i>Sign in with Facebook</a>
                                </li>
                                <li class="col-md-6 col-sm-12"> 
                                    <a href="#" class="btn twitter"><i class="fa fa-twitter"></i>Sign in with Twitter</a>
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label >User name or email <em>*</em></label>
                                    <input type="email" name="email" class="input-text" autofocus value="laurel@yahoo.com">
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label >Your password <em>*</em></label>
                                    <input type="password" name="password" class="input-text" value="123456">
                                </li> 
                                <li class="col-md-6 col-sm-12">                                                
                                    <input class="input-chkbox" type="checkbox">
                                    <label >Remember me</label>
                                </li>
                                <li class="col-md-6 col-sm-12 pwd text-right">
                                    <label > <a href="#"> forgot password? </a> </label>                                               
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span>login</span></button>
                            </div>
                        </form>
                    </div>                                    
                </div>

                <!-- HTML -->
                <div id="account-create-new">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Create New Account</h4>                                                                  
                    <div class="account-form">
                        <form:form class="form-login" method="POST" action="user/register.html" modelAttribute="users" enctype="multipart/form-data">      
                            
                            <ul class="form-list row">
                                <li class="col-md-12 col-sm-12">
                                    <label>Email <em>*</em></label>
                                    <form:input path="email" cssClass="input-text"/>
                                </li>
                                <li class="col-md-6 col-sm-12">
                                    <label>Password <em>*</em></label>
                                    <form:password path="password" cssClass="input-text" id="password" />
                                </li> 
                                <li class="col-md-6 col-sm-12">
                                    <label>Retype Password <em>*</em></label>
                                    <input type="password" name="Repassword" class="input-text" id="Repassword" />
                                </li>
                                <li class="col-md-6 col-sm-12">
                                    <label>First Name <em>*</em></label>
                                    <form:input path="firstName" cssClass="input-text" />
                                </li>
                                <li class="col-md-6 col-sm-12">
                                    <label>LastName <em>*</em></label>
                                    <form:input path="lastName" cssClass="input-text" />
                                </li>
                                <li class="col-md-6 col-sm-12">  
                                    <label>Gender</label>
                                    <br>
                                    <div class="text-center fs-login-gender">
                                        <label>
                                            <form:radiobutton path="gender" value="1" checked="checked" />Male 
                                        </label>
                                        &nbsp;&nbsp;&nbsp;
                                        <label>
                                            <form:radiobutton path="gender" value="0" />Female 
                                        </label>
                                    </div>
                                </li>
                                <li class="col-md-6 col-sm-12">  
                                    <label>Birthday</label>
                                    <form:input path="birthday" id="txtBirthday" cssClass="input-text" />
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label>Phone <em>*</em></label>
                                    <input type="text" name="phoneNumber" />
                                </li>

                                <li class="col-md-12 col-sm-12">
                                    <label>Address <em>*</em></label>
                                    <input type="text" name="address" />
                                </li>

                                <li class="col-md-12 col-sm-12">
                                    <label>Avatar <em>*</em></label>
                                    <input type="file" id="upImage" name="upImage" class="input-text fs-login-file-input">
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span>Create Account</span></button>
                            </div>
                        </form:form>
                    </div>                                    
                </div>
            </div>

            <div class="col-sm-4 col-md-4">
                <!-- HTML -->
                <div id="account-id2">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Create New Account</h4>                                                                  
                    <div class="account-form create-new-account">
                        <h3 class="block-title">Signup and You'll be able to</h3>
                        <ul>
                            <li> <i class="fa fa-edit"></i> Online Order Status</li>
                            <li> <i class="fa fa-edit"></i> See Ready Hot Deals</li>
                            <li> <i class="fa fa-edit"></i> Love List</li>

                            <li> <i class="fa fa-edit"></i> Quick Buy Stuffs</li>
                        </ul>
                        <div class="buttons-set">
                            <button class="btn-black" id="btnCreate" type="button">
                                <span>Create Account</span></button>
                        </div>
                    </div>                                    
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>