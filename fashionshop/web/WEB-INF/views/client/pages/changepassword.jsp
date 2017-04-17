<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>


<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-8">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Change Your Password</h4>                                                                 
                    <div class="account-form">
                        <form id="shipping-zip-form" action="user/change-password.html">                                      
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-6">
                                    <label >Password <em>*</em></label>
                                    <input required name="password" type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label> Password Confirm <em>*</em></label>
                                    <input required name="repassword" type="text" class="input-text">
                                </li>                                               
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span><span>Update</span></span></button>
                            </div>
                        </form>
                    </div>                                 
                </div>
            </div>

            <div class="col-md-3 col-sm-4 checkout-steps">
                <!-- USER-RIGHT-MENU -->
                <jsp:include page="../blocks/user-right-menu.jsp" flush="true" />
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>