<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-9">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Change Your Address</h4>                                                                  
                    <div class="account-form">
                        <form:form id="shipping-zip-form" action="user/address-book/${addressID}-${findUsersID}.html" method="post" modelAttribute="userAddresses">                                        
                            ${error}
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-6">
                                    <label >Address 1 <em>*</em></label>
                                    <form:input path="address" cssClass="input-text" />
                                </li>

                                <li class="col-md-6 col-sm-6">
                                    <label >Phone Number <em>*</em></label>
                                    <form:input path="phoneNumber" cssClass="input-text" />
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span><span>Update</span></span></button>
                            </div>
                        </form:form>
                    </div>                                    
                </div>
            </div>

            <div class="col-sm-4 col-md-3  checkout-steps">
                <!-- USER-RIGHT-MENU -->
                <jsp:include page="../blocks/user-right-menu.jsp" flush="true" />
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>
