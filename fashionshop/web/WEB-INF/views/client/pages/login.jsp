<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>

<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-6">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Login</h4>                                                                  
                    <div class="account-form">
                        <form class="form-login">                                        
                            <ul class="form-list row">
                                <li class="col-md-12 col-sm-12">
                                    <label >User name or email <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label >Your password <em>*</em></label>
                                    <input required type="password" class="input-text">
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
                                <button class="btn-black" type="submit"><span>Create Account</span></button>
                            </div>
                        </form>
                    </div>                                    
                </div>
            </div>

            <div class="col-sm-6 col-md-6">
                <!-- HTML -->
                <div id="account-id2">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>More Information</h4>                                                                  
                    <div class="account-form create-new-account">
                        <h3 class="block-title">Signup Today and You'll be able to</h3>
                        <ul>
                            <li> <i class="fa fa-edit"></i> Online Order Status</li>
                            <li> <i class="fa fa-edit"></i> See Ready Hot Deals</li>
                            <li> <i class="fa fa-edit"></i> Love List</li>
                            <li> <i class="fa fa-edit"></i> Sign up to receive exclusive news and private sales</li>
                            <li> <i class="fa fa-edit"></i> Quick Buy Stuffs</li>
                        </ul>
                    </div>                                    
                </div>
            </div>

            <div class="col-sm-6 col-md-6">
                <!-- HTML -->
                <div id="account-create-new">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Create New Account</h4>                                                                  
                    <div class="account-form">
                        <form class="form-login">                                        
                            <ul class="form-list row">
                                <li class="col-md-12 col-sm-12">
                                    <label>Email <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label>Password <em>*</em></label>
                                    <input required type="password" class="input-text">
                                </li> 
                                <li class="col-md-12 col-sm-12">
                                    <label>Retype Password <em>*</em></label>
                                    <input required type="password" class="input-text">
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label>First Name <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label>LastName <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-12">  
                                    <label>Gender:</label>
                                    <br>
                                    <label>
                                        <input type="radio" name="optradio" checked>Male 
                                    </label>
                                    &nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" name="optradio">Female 
                                    </label>
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label>Phone <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>

                                <li class="col-md-12 col-sm-12">
                                    <label>Address <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span>Create Account</span></button>
                            </div>
                        </form>
                    </div>                                    
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>