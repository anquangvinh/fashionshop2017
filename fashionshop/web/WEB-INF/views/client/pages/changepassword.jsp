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
                        <form id="shipping-zip-form" action="user/change-password/${findUsersID}.html" method="post">    
                            ${error}
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-6 ">
                                    <label><i class="fa fa-key"></i>Current Password<em>*</em></label>
                                    <input required name="oldpassword" type="password" class="input-text">
                                    
                                </li>
                                <br/><br/><br/><br/>
                                <li class="col-md-6 col-sm-6">
                                    <div class="column form-row">
                                        <hr style="width: 100%; size: 50px; border-width: 1px; margin-left: -325px;
                                            border-style: double">
                                        <p class="" style="margin-left: -325px;"><strong>Please enter your new password.</strong></p>
                                    </div>
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <div class="column form-row" >
                                        <label><i class="fa fa-key"></i> Password <em>*</em></label>
                                        <input required name="password" type="password" class="input-text"><br/>
                                    <label><i class="fa fa-key"></i>PasswordConfirm<em>*</em></label>
                                    <input required name="repassword" type="password" class="input-text">
                                    </div>
                                </li>
<!--                                <li class="col-md-6 col-sm-6 ">
                                    <label> Password Confirm <em>*</em></label>
                                    <input required name="repassword" type="password" class="input-text">
                                </li>    -->

                            </ul>
                            <div class="buttons-set" style="margin-left: 80px;">
                                <button class="btn-black" type="submit"><span><span>Update</span></span></button>
                            </div>
                            <!--                            <div class="row text-center">
                                                            <p class="column font--bold">For security purposes, please enter your current password.</p>
                                                            <div class="column form-row">
                                                                <label for="l-Customer_CurrentPassword">Current Password</label><br/>
                                                                <input class="input--medium" id="l-Customer_CurrentPassword" type="password" name="oldpassword" required>
                                                            </div>
                                                            <div class="column form-row">
                                                                <hr class="border--primary">
                                                                <p><strong>Please enter your new password.</strong></p>
                                                            </div>
                                                            <div class="column form-row">
                                                                <label for="l-Customer_Password">New Password</label><br/>
                                                                <input class="input--medium" id="l-Customer_Password" type="password" name="password" required>
                                                            </div>
                                                            <div class="column form-row">
                                                                <label for="l-Customer_VerifyPassword">Confirm Password</label><br/>
                                                                <input class="input--medium" id="l-Customer_VerifyPassword" type="password" name="repassword" required>
                                                            </div>
                                                            <div class="column form-row h-align-right">
                                                                <input class="button button--medium font--uppercase cta-primary" type="submit" value="Submit" title="Submit">
                                                            </div>
                                                        </div>-->
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