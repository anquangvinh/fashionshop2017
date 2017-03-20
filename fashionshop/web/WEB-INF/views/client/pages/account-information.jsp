<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
                        <form id="shipping-zip-form">                                           
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