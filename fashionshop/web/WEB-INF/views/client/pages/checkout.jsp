<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>

<div class="space10"></div>

<!-- MAIN CONTENT -->
<div class="shop-single">
    <div class="container">
        <div class="row">
            <!--                        <div class="col-md-12 col-sm-12">
                                        <div class="redirect-login">
                                            <i class="fa fa-edit"></i> &nbsp; &nbsp; <span> Returning customer? </span>
                                            &nbsp; &nbsp;<a class="showlogin" href="login-page.html">Click here to login</a>
                                        </div>
                                    </div>-->

            <!--                        <div class="col-md-12 col-sm-12">
                                        <div class="redirect-login">
                                            <i class="fa fa-edit"></i> &nbsp; &nbsp; <span> Have a coupon? </span>
                                            &nbsp; &nbsp;<a class="showlogin"  data-toggle="modal" href="#coupon-code">Click here to enter your code</a>
                                        </div>
                                    </div>-->

            <div class="col-md-9 col-sm-8">
                <!-- HTML -->
                <div>
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Checkout Method</h4>
                    <div class="account-form">
                        <!--<form id="shipping-zip-form" method="POST" action="#">-->    
                        <form:form name="checkout-form" 
                                   action="" 
                                   method="POST" modelAttribute="">
                            <ul class="form-list row">
                                <c:forEach items="${userAddressList}" var="userAddress">
                                    <li class="col-md-6 col-sm-6">
                                        <form:radiobutton path="" value="${userAddress.addressID}" id="${userAddress.addressID}"/>
                                        <p></p>
                                    </li>
                                </c:forEach>

                                <!--                                            <li class="col-md-12 col-sm-12">
                                                                                <label>Country <em>*</em></label>
                                                                                <select required>
                                                                                    <option value="">Country 1</option>
                                                                                    <option value="1">Country 2</option>
                                                                                    <option value="2">Country 3</option>
                                                                                </select>
                                                                            </li> -->
                                <!--                                <li class="col-md-6 col-sm-6">
                                                                    <label>First Name <em>*</em></label>
                                                                    <input type="text" class="input-text" required>
                                                                </li>
                                                                <li class="col-md-6 col-sm-6">
                                                                    <label>Last Name <em>*</em></label>
                                                                    <input type="text" class="input-text" required>
                                                                </li>-->

                                <!--                                <li class="col-md-6 col-sm-6">
                                                                    <label >Address <em>*</em></label>
                                                                    <input required type="text" class="input-text">
                                                                </li>
                                                                                                            <li class="col-md-6 col-sm-6">
                                                                                                                <label >Address 2</label>
                                                                                                                <input type="text" class="input-text">
                                                                                                            </li>
                                                                                                            <li class="col-md-6 col-sm-6">
                                                                                                                <label >Company Name</label>
                                                                                                                <input type="text" class="input-text">
                                                                                                            </li>
                                                                <li class="col-md-6 col-sm-6">
                                                                    <label>Province/City</label>
                                                                    <select>
                                                                        <option value="">Choose Province/City</option>
                                                                        <option value="294">Ho Chi Minh</option>
                                                                        <option value="297">Ha Noi</option>
                                                                        <option value="291">Da Nang</option>
                                                                        <option value="278">An Giang</option>
                                                                        <option value="280">Ba Ria - Vung Tau</option>
                                                                        <option value="282">Bac Giang</option>
                                                                        <option value="281">Bac Kan</option>
                                                                        <option value="279">Bac Lieu</option>
                                                                        <option value="283">Bac Ninh</option>
                                                                        <option value="284">Ben Tre</option>
                                                                        <option value="285">Binh Duong</option>
                                                                        <option value="286">Binh Phuoc</option>
                                                                        <option value="287">Binh Thuan</option>
                                                                        <option value="316">Binh Dinh</option>
                                                                        <option value="289">Ca Mau</option>
                                                                        <option value="290">Can Tho</option>
                                                                        <option value="288">Cao Bang</option>
                                                                        <option value="293">Gia Lai</option>
                                                                        <option value="295">Ha Giang</option>
                                                                        <option value="296">Ha Nam</option>
                                                                        <option value="299">Ha Tinh</option>
                                                                        <option value="300">Hai Duong</option>
                                                                        <option value="301">Hai Phong</option>
                                                                        <option value="319">Hau Giang</option>
                                                                        <option value="302">Hoa Binh</option>
                                                                        <option value="320">Hung Yen</option>
                                                                        <option value="321">Khanh Hoa</option>
                                                                        <option value="322">Kien Giang</option>
                                                                        <option value="323">Kon Tum</option>
                                                                        <option value="304">Lai Chau</option>
                                                                        <option value="306">Lam Dong</option>
                                                                        <option value="305">Lang Son</option>
                                                                        <option value="324">Lao Cai</option>
                                                                        <option value="325">Long An</option>
                                                                        <option value="326">Nam Dinh</option>
                                                                        <option value="327">Nghe An</option>
                                                                        <option value="307">Ninh Binh</option>
                                                                        <option value="328">Ninh Thuan</option>
                                                                        <option value="329">Phu Tho</option>
                                                                        <option value="308">Phu Yen</option>
                                                                        <option value="309">Quang Binh</option>
                                                                        <option value="310">Quang Nam</option>
                                                                        <option value="311">Quang Ngai</option>
                                                                        <option value="330">Quang Ninh</option>
                                                                        <option value="312">Quang Tri</option>
                                                                        <option value="313">Soc Trang</option>
                                                                        <option value="331">Son La</option>
                                                                        <option value="332">Tay Ninh</option>
                                                                        <option value="333">Thai Binh</option>
                                                                        <option value="334">Thai Nguyen</option>
                                                                        <option value="335">Thanh Hoa</option>
                                                                        <option value="303">Thua Thien Hue</option>
                                                                        <option value="336">Tien Giang</option>
                                                                        <option value="314">Tra Vinh</option>
                                                                        <option value="315">Tuyen Quang</option>
                                                                        <option value="337">Vinh Long</option>
                                                                        <option value="338">Vinh Phuc</option>
                                                                        <option value="339">Yen Bai</option>
                                                                        <option value="292">Dak Lak</option>
                                                                        <option value="340">Dak Nong</option>
                                                                        <option value="341">Dien Bien</option>
                                                                        <option value="317">Dong Nai</option>
                                                                        <option value="318">Dong Thap</option>
                                                                    </select>
                                                                </li>
                                                                <li class="clearfix"></li>-->
                                <!--                                <li class="col-md-6 col-sm-6">
                                                                    <label>State</label>
                                                                    <select>
                                                                        <option>State 1</option>
                                                                        <option>State 2</option>
                                                                        <option>State 3</option>
                                                                    </select>
                                                                </li> -->
                                <!--                                            <li class="col-md-6 col-sm-6">
                                                                                <label >Zip/Postal Code <em>*</em></label>
                                                                                <input required type="text" class="input-text">
                                                                            </li>-->
                                <!--                                            <li class="col-md-6 col-sm-6">
                                                                                <label >Email <em>*</em></label>
                                                                                <input required type="text" class="input-text">
                                                                            </li>-->
                                <!--                                <li class="col-md-6 col-sm-6">
                                                                    <label >Phone Number <em>*</em></label>
                                                                    <input required type="text" class="input-text">
                                                                </li>-->
                                <!--                                            <li class="col-md-12 col-sm-12">
                                                                                <input id="create-act" type="checkbox" class="input-chkbox">
                                                                                <label> Create an account?</label>
                                                                            </li>
                                                                            <li class="col-md-12 col-sm-12 create-account">
                                                                                <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                                                                <label > Account password <em>*</em></label>
                                                                                <input required type="text" class="input-text">
                                                                            </li>-->
                                <li class="col-md-12 col-sm-12">
                                    <input id="diff-address" type="checkbox" class="input-chkbox">
                                    <label> Ship to a different address?</label>
                                </li>
                                <li class="col-md-12 col-sm-12 shipping-address">
                                    <ul class="form-list row">
                                        <!--                                                    <li class="col-md-12 col-sm-12">
                                                                                                <label>Country <em>*</em></label>
                                                                                                <select required>
                                                                                                    <option value="">Country 1</option>
                                                                                                    <option value="1">Country 2</option>
                                                                                                    <option value="2">Country 3</option>
                                                                                                </select>
                                                                                            </li> -->
                                        <li class="col-md-6 col-sm-6">
                                            <label>First Name <em>*</em></label>
                                            <input type="text" class="input-text" required>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <label>Last Name <em>*</em></label>
                                            <input type="text" class="input-text" required>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <label >Address <em>*</em></label>
                                            <input required type="text" class="input-text">
                                        </li>
                                        <!--                                                    <li class="col-md-6 col-sm-6">
                                                                                                <label >Address 2</label>
                                                                                                <input type="text" class="input-text">
                                                                                            </li>-->
                                        <!--                                                    <li class="col-md-6 col-sm-6">
                                                                                                <label >Company Name</label>
                                                                                                <input type="text" class="input-text">
                                                                                            </li>-->
                                        <li class="col-md-6 col-sm-6">
                                            <label>Province/City</label>
                                            <select>
                                                <option value="">Choose Province/City</option>
                                                <option value="294">Ho Chi Minh</option>
                                                <option value="297">Ha Noi</option>
                                                <option value="291">Da Nang</option>
                                                <option value="278">An Giang</option>
                                                <option value="280">Ba Ria - Vung Tau</option>
                                                <option value="282">Bac Giang</option>
                                                <option value="281">Bac Kan</option>
                                                <option value="279">Bac Lieu</option>
                                                <option value="283">Bac Ninh</option>
                                                <option value="284">Ben Tre</option>
                                                <option value="285">Binh Duong</option>
                                                <option value="286">Binh Phuoc</option>
                                                <option value="287">Binh Thuan</option>
                                                <option value="316">Binh Dinh</option>
                                                <option value="289">Ca Mau</option>
                                                <option value="290">Can Tho</option>
                                                <option value="288">Cao Bang</option>
                                                <option value="293">Gia Lai</option>
                                                <option value="295">Ha Giang</option>
                                                <option value="296">Ha Nam</option>
                                                <option value="299">Ha Tinh</option>
                                                <option value="300">Hai Duong</option>
                                                <option value="301">Hai Phong</option>
                                                <option value="319">Hau Giang</option>
                                                <option value="302">Hoa Binh</option>
                                                <option value="320">Hung Yen</option>
                                                <option value="321">Khanh Hoa</option>
                                                <option value="322">Kien Giang</option>
                                                <option value="323">Kon Tum</option>
                                                <option value="304">Lai Chau</option>
                                                <option value="306">Lam Dong</option>
                                                <option value="305">Lang Son</option>
                                                <option value="324">Lao Cai</option>
                                                <option value="325">Long An</option>
                                                <option value="326">Nam Dinh</option>
                                                <option value="327">Nghe An</option>
                                                <option value="307">Ninh Binh</option>
                                                <option value="328">Ninh Thuan</option>
                                                <option value="329">Phu Tho</option>
                                                <option value="308">Phu Yen</option>
                                                <option value="309">Quang Binh</option>
                                                <option value="310">Quang Nam</option>
                                                <option value="311">Quang Ngai</option>
                                                <option value="330">Quang Ninh</option>
                                                <option value="312">Quang Tri</option>
                                                <option value="313">Soc Trang</option>
                                                <option value="331">Son La</option>
                                                <option value="332">Tay Ninh</option>
                                                <option value="333">Thai Binh</option>
                                                <option value="334">Thai Nguyen</option>
                                                <option value="335">Thanh Hoa</option>
                                                <option value="303">Thua Thien Hue</option>
                                                <option value="336">Tien Giang</option>
                                                <option value="314">Tra Vinh</option>
                                                <option value="315">Tuyen Quang</option>
                                                <option value="337">Vinh Long</option>
                                                <option value="338">Vinh Phuc</option>
                                                <option value="339">Yen Bai</option>
                                                <option value="292">Dak Lak</option>
                                                <option value="340">Dak Nong</option>
                                                <option value="341">Dien Bien</option>
                                                <option value="317">Dong Nai</option>
                                                <option value="318">Dong Thap</option>
                                            </select>
                                        </li> 
                                        <li class="clearfix"></li>
                                        <!--                                        <li class="col-md-6 col-sm-6">
                                                                                    <label>State</label>
                                                                                    <select>
                                                                                        <option>State 1</option>
                                                                                        <option>State 2</option>
                                                                                        <option>State 3</option>
                                                                                    </select>
                                                                                </li> -->
                                        <!--                                                    <li class="col-md-6 col-sm-6">
                                                                                                <label >Zip/Postal Code <em>*</em></label>
                                                                                                <input required type="text" class="input-text">
                                                                                            </li>-->
                                    </ul>
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <input id="diff-discount" type="checkbox" class="input-chkbox">
                                    <label> You have discount code?</label>
                                </li>
                                <li class="col-md-12 col-sm-12 discount-code">
                                    <ul class="form-list row">
                                        <li class="col-md-6 col-sm-6">
                                            <label>Your Discount Code</label>
                                            <input name="remove" id="remove-coupone" value="0" type="hidden">
                                            <div class="input-box" >
                                                <input class="input-text" id="coupon_code" name="coupon_code" value="">
                                            </div>
                                            <div class="buttons-set">
                                                <button type="button" title="Apply Coupon" class="btn-black"><span><span>Apply Coupon</span></span></button>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <button class="btn-black" type="submit">Place Order</button>
                            </div>
                            <!--</form>-->
                        </form:form>
                    </div>
                    <div class="clearfix"></div>   
                </div>
                <!--                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <form id="discount-coupon-form">
                                        <div class="discount">
                                            <h4 class="account-title"><span class="fa fa-chevron-right"></span>Discount Codes</h4>
                                            <div class="account-form">
                                                <label for="coupon_code">Enter your coupon code if you have one.</label>
                                                <input name="remove" id="remove-coupone" value="0" type="hidden">
                                                <div class="input-box">
                                                    <input class="input-text" id="coupon_code" name="coupon_code" value="">
                                                </div>
                                                <div class="buttons-set">
                                                    <button type="button" title="Apply Coupon" class="btn-black"><span><span>Apply Coupon</span></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>-->
            </div>
            <div class="col-md-3 col-sm-4">
                <div class="side-widget space50">
                    <h3> <span> Your order </span></h3>
                    <div>
                        <table class="cart-table"> 
                            <tbody></tbody>
                            <c:forEach items="${cartList}" var="item">
                                <tr>                                              
                                    <td colspan="2">
                                        <div class="item-img col-md-5 col-sm-5">
                                            <a href="${item.getProduct().productID}-${item.getProduct().productColorList[0].colorID}-${item.getProduct().productNameNA}.html">
                                                <img src="assets/images/products/${item.getProduct().getUrlImg()}" class="img-responsive" alt=""/>
                                            </a>
                                        </div>
                                        <div class="item-info col-md-7 col-sm-7">
                                            <h4>${item.getProduct().productName}</h4>
                                            <p>
                                                &nbsp Size: ${item.getSizesByColor().getProductSize()} 
                                                <img fs-color="${item.getSizesByColor().getColor().colorID}" 
                                                     src="assets/images/products/colors/${item.getSizesByColor().getColor().getUrlColorImg()}" 
                                                     class="img-responsive" 
                                                     alt="${item.getSizesByColor().getColor().urlColorImg}" 
                                                     title="${item.getSizesByColor().getColor().getColor()}"
                                                     style="width: 20px; height: 20px; border: 2px;"/> 
                                            </p>
                                            <p>&nbsp ${item.quantity} &nbsp x $${item.getProduct().getPrice()}</p>
                                        </div>
                                    </td>  
                                    <!--                                    <td>
                                                                            <a href="#"> <i class="fa fa-trash-o"></i> </a>
                                                                        </td>                                            -->
                                </tr>
                            </c:forEach>
                            <tfoot>
                                <tr>
                                    <th>Discount</th>
                                    <td>
                                        <div class="">$0.0</div>
                                    </td> 
                                </tr>
                                <!--                                <tr>
                                                                    <th>Shipping and Handling</th>
                                                                    <td>
                                                                        <div class="">Free Shipping</div>
                                                                    </td> 
                                                                </tr>-->
                                <tr>
                                    <th>Order Total</th>
                                    <td>
                                        <div class="">$${grandTotal}</div>
                                    </td> 
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="clearfix space20"></div>

<!-- ============================== COUPON CODE MODAL ===================================== -->
<!--<div class="modal fade" id="coupon-code" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">                   
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>  
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <form class="shipping-info-wrap" id="discount-coupon-form">
                            <div class="discount">
                                <h2>Discount Codes</h2>
                                <div class="form-list">
                                    <label for="coupon_code">Enter your coupon code if you have one.</label>
                                    <input type="hidden" value="0" id="remove-coupone" name="remove">
                                    <div class="input-box">
                                        <input value="" name="coupon_code" id="coupon_code" class="input-text">
                                    </div>
                                    <div class="buttons-set">
                                        <button class="btn-black" title="Apply Coupon" type="button"><span><span>Apply Coupon</span></span></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>                            
                </div>
            </div>
        </div>
    </div>
</div>-->
