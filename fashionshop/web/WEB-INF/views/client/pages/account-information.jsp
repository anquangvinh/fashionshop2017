<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-8">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Change Your Personal Details</h4>                                                                  
                    <div class="account-form">
<!--                        <form id="shipping-zip-form">                                           
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-6">
                                    <label >First Name <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label >Last Name <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label >Email <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>                                                
                                <li class="col-md-6 col-sm-6">
                                    <label >Phone Number <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label>Fax</label>
                                    <input type="text" class="input-text">
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span><span>Update</span></span></button>
                            </div>
                        </form>-->
                        <form:form class="form-update-user" method="POST" action="user/account-information/${findUsersID}.html" modelAttribute="updateUser" enctype="multipart/form-data">      
                            ${error}
                            <ul class="form-list row">
                                <li class="col-md-12 col-sm-12">
                                    <label><i class="fa fa-envelope"></i> Email <em>*</em></label>
                                    <form:input path="email" cssClass="input-text"/>
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
                                    <label><i class="fa fa-venus-mars"></i> Gender</label>
                                    <br>
                                    <div class="text-center fs-login-gender">
                                        <label>
                                            <form:radiobutton path="gender" value="1" checked="checked" /><i class="fa fa-male"></i> Male 
                                        </label>
                                        &nbsp;&nbsp;&nbsp;
                                        <label>
                                            <form:radiobutton path="gender" value="0" /><i class="fa fa-female"></i> Female 
                                        </label>
                                    </div>
                                </li>
                                <li class="col-md-6 col-sm-12">  
                                    <label><i class="fa fa-birthday-cake"></i> Birthday</label>
                                    <form:input path="birthday" id="txtBirthday" cssClass="input-text" />
                                </li>
<!--                                
                                <li class="col-md-12 col-sm-12">
                                    <label>Phone <em>*</em></label>
                                    <input type="text" name="phoneNumber" />
                                </li>

                                <li class="col-md-12 col-sm-12">
                                    <label>Address <em>*</em></label>
                                    <input type="text" name="address" />
                                </li>-->

                                <li class="col-md-12 col-sm-12">
                                    <label>Avatar <em>*</em></label>
                                    <input type="file" id="upImage" name="upImage" class="input-text fs-login-file-input">
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span>Update Account</span></button>
                            </div>
                        </form:form>
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