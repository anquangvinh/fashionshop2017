<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />


<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-8">
                <!-- HTML -->
                <div id="accordion">
                    <h4 class="accordion-toggle"><span>01</span>Account</h4>
                    <div class="accordion-content default">                                    
                        <div class="details-box">
                            <ul>
                                <li>                                                
                                    <a href="account-information.html"> <i class="fa fa-edit"></i> Edit your account information</a>
                                </li>
                                <li>                                               
                                    <a href="cng-pw.html"> <i class="fa fa-edit"></i> Change your password</a>
                                </li>
                                <li>                                              
                                    <a href="address-book.html"> <i class="fa fa-edit"></i> Modify your address book entries</a>
                                </li>
                            </ul>
                        </div>                                    
                    </div>
                    <div class="clearfix"></div>
                    <h4 class="accordion-toggle"><span>02</span>order and review</h4>
                    <div class="accordion-content">                                    
                        <div class="details-box">
                            <ul>
                                <li>
                                    <a href="order-history.html"> <i class="fa fa-edit"></i> View your order history</a>
                                </li>
                                <li>
                                    <a href="review-rating.html"> <i class="fa fa-edit"></i> Your reviews and ratings</a>
                                </li>
                                <li>
                                    <a href="return.html"> <i class="fa fa-edit"></i> View your retun requests</a>
                                </li>
                            </ul>
                        </div>                                    
                    </div>
                    <h4 class="accordion-toggle"><span>03</span>Newsletter</h4>
                    <div class="accordion-content">
                        <div class="details-box">
                            <ul>
                                <li>
                                    <a href="newsletter.html"> <i class="fa fa-edit"></i> Subscribe / unsubscribe to newsletter</a>
                                </li>                                           
                            </ul>
                        </div>
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