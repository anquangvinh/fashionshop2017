<%@page contentType="text/html" pageEncoding="UTF-8"%>

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
                        <form id="shipping-zip-form">                                        
                            <ul class="form-list row">
                                <li class="col-md-6 col-sm-6">
                                    <label >Address 1 <em>*</em></label>
                                    <input required type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label >Address 2</label>
                                    <input type="text" class="input-text">
                                </li>
                                <li class="col-md-6 col-sm-6">
                                    <label>Country</label>
                                    <select>
                                        <option>Country 1</option>
                                        <option>Country 2</option>
                                        <option>Country 3</option>
                                    </select>
                                </li>                                                
                                <li class="col-md-6 col-sm-6">
                                    <label>City</label>
                                    <select>
                                        <option>City 1</option>
                                        <option>City 2</option>
                                        <option>City 3</option>
                                    </select>
                                </li>                                               
                                <li class="col-md-6 col-sm-6">
                                    <label >Zip/Postal Code <em>*</em></label>
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
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit"><span><span>Update</span></span></button>
                            </div>
                        </form>
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
