<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>

<div class="space10"></div>

<!-- MAIN CONTENT -->
<div class="shop-single">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-8">
                <!-- HTML -->
                <div>
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Checkout Method</h4>
                    <div class="account-form">
                        <form id="shipping-zip-form" method="POST" action="orders/checkout.html">
                            <ul class="form-list row">
                                <c:forEach items="${userAddressList}" var="userAddress">
                                    <li class="col-md-6 col-sm-6">
                                        <input type="radio" id="diff-address" name="address-chose" value="${userAddress.addressID}" onclick="differenceAddress();"/>
                                        <label>Ship to: &nbsp ${userAddress.getUser().firstName} &nbsp ${userAddress.getUser().lastName}<br/>
                                            ${userAddress.address}<br/>
                                            Phone: &nbsp ${userAddress.phoneNumber}
                                        </label>
                                    </li>
                                </c:forEach>
                                <!--editor-fold defaultstate="collapsed" desc="">
                                    <li class="col-md-12 col-sm-12">
                                        <label>Country <em>*</em></label>
                                        <select required>
                                            <option value="">Country 1</option>
                                            <option value="1">Country 2</option>
                                            <option value="2">Country 3</option>
                                        </select>
                                    </li> 
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
                                    <li class="clearfix"></li>
                                    <li class="col-md-6 col-sm-6">
                                        <label>State</label>
                                        <select>
                                            <option>State 1</option>
                                            <option>State 2</option>
                                            <option>State 3</option>
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
                                    <li class="col-md-12 col-sm-12">
                                        <input id="create-act" type="checkbox" class="input-chkbox">
                                        <label> Create an account?</label>
                                    </li>
                                    <li class="col-md-12 col-sm-12 create-account">
                                        <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                        <label > Account password <em>*</em></label>
                                        <input required type="text" class="input-text">
                                    </li>
                            </editor-fold-->
                                <li class="col-md-12 col-sm-12">
                                    <input id="diff-address" name="address-chose" value="difference" type="radio" class="input-chkbox" onclick="differenceAddress();"/>
                                    <label> Ship to a different address?</label>
                                </li>
                                <li class="col-md-12 col-sm-12 shipping-address">
                                    <ul class="form-list row">
                                        <li class="col-md-6 col-sm-6">
                                            <label>First Name <em>*</em></label>
                                            <input type="text" class="input-text" name="diffFirstname" value=""/>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <label>Last Name <em>*</em></label>
                                            <input type="text" class="input-text" name="diffLastname" value=""/>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <label>Phone Number <em>*</em></label>
                                            <input type="text" class="input-text" name="diffPhone" value=""/>
                                        </li>
                                        <li class="col-md-6 col-sm-6 form-group">
                                            <label>Province/City</label>
                                            <select name="diffProvince">
                                                <option value="">Choose Province/City</option>
                                                <option value="Ho Chi Minh City">Ho Chi Minh City</option>
                                                <option value="Ha Noi">Ha Noi</option>
                                                <option value="Da Nang">Da Nang</option>
                                                <option value="An Giang">An Giang</option>
                                                <option value="Ba Ria - Vung Tau">Ba Ria - Vung Tau</option>
                                                <option value="Bac Giang">Bac Giang</option>
                                                <option value="Bac Kan">Bac Kan</option>
                                                <option value="Bac Lieu">Bac Lieu</option>
                                                <option value="Bac Ninh">Bac Ninh</option>
                                                <option value="Ben Tre">Ben Tre</option>
                                                <option value="Binh Duong">Binh Duong</option>
                                                <option value="Binh Phuoc">Binh Phuoc</option>
                                                <option value="Binh Thuan">Binh Thuan</option>
                                                <option value="Binh Dinh">Binh Dinh</option>
                                                <option value="Ca Mau">Ca Mau</option>
                                                <option value="Can Tho">Can Tho</option>
                                                <option value="Cao Bang">Cao Bang</option>
                                                <option value="Gia Lai">Gia Lai</option>
                                                <option value="Ha Giang">Ha Giang</option>
                                                <option value="Ha Nam">Ha Nam</option>
                                                <option value="Ha Tinh">Ha Tinh</option>
                                                <option value="Hai Duong">Hai Duong</option>
                                                <option value="Hai Phong">Hai Phong</option>
                                                <option value="Hau Giang">Hau Giang</option>
                                                <option value="Hoa Binh">Hoa Binh</option>
                                                <option value="Hung Yen">Hung Yen</option>
                                                <option value="Khanh Hoa">Khanh Hoa</option>
                                                <option value="Kien Giang">Kien Giang</option>
                                                <option value="Kon Tum">Kon Tum</option>
                                                <option value="Lai Chau">Lai Chau</option>
                                                <option value="Lam Dong">Lam Dong</option>
                                                <option value="Lang Son">Lang Son</option>
                                                <option value="Lao Cai">Lao Cai</option>
                                                <option value="Long An">Long An</option>
                                                <option value="Nam Dinh">Nam Dinh</option>
                                                <option value="Nghe An">Nghe An</option>
                                                <option value="Ninh Binh">Ninh Binh</option>
                                                <option value="Ninh Thuan">Ninh Thuan</option>
                                                <option value="Phu Tho">Phu Tho</option>
                                                <option value="Phu Yen">Phu Yen</option>
                                                <option value="Quang Binh">Quang Binh</option>
                                                <option value="Quang Nam">Quang Nam</option>
                                                <option value="Quang Ngai">Quang Ngai</option>
                                                <option value="Quang Ninh">Quang Ninh</option>
                                                <option value="Quang Tri">Quang Tri</option>
                                                <option value="Soc Trang">Soc Trang</option>
                                                <option value="Son La">Son La</option>
                                                <option value="Tay Ninh">Tay Ninh</option>
                                                <option value="Thai Binh">Thai Binh</option>
                                                <option value="Thai Nguyen">Thai Nguyen</option>
                                                <option value="Thanh Hoa">Thanh Hoa</option>
                                                <option value="Thua Thien Hue">Thua Thien Hue</option>
                                                <option value="Tien Giang">Tien Giang</option>
                                                <option value="Tra Vinh">Tra Vinh</option>
                                                <option value="Tuyen Quang">Tuyen Quang</option>
                                                <option value="Vinh Long">Vinh Long</option>
                                                <option value="Vinh Phuc">Vinh Phuc</option>
                                                <option value="Yen Bai">Yen Bai</option>
                                                <option value="Dak Lak">Dak Lak</option>
                                                <option value="Dak Nong">Dak Nong</option>
                                                <option value="Dien Bien">Dien Bien</option>
                                                <option value="Dong Nai">Dong Nai</option>
                                                <option value="Dong Thap">Dong Thap</option>
                                            </select>
                                        </li>
                                        <li class="col-md-12 col-sm-12">
                                            <label >Address <em>*</em></label>
                                            <input type="text"  class="input-text" name="diffAddress" value=""/>
                                        </li>
                                        <li class="clearfix"></li>
                                    </ul>
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <input id="diff-discount" type="checkbox" class="input-chkbox"/>
                                    <label> You have discount code?</label>
                                </li>
                                <li class="col-md-12 col-sm-12 discount-code">
                                    <ul class="form-list row discount-ul">
                                        <li class="col-md-6 col-sm-6 discount-inputs">
                                            <label>Your Discount Code</label>
                                            <div class="input-box">
                                                <p class="help-block" id="fs-checkout-discountvou-error"></p>
                                                <input class="input-text" id="coupon_code" name="coupon_code" value=""/>
                                            </div>
                                        </li>
                                        <li class="col-md-6 col-sm-6 discount-buttons" style="padding-top: 27px;">
                                            <div class="buttons-set">
                                                <button style="height: 40px;" type="button" title="Apply Discount Code" class="btn-black" id="discount-order" onclick="discountClick();"><span><span>Apply Discount Code</span></span></button>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li class="col-md-12 col-sm-12">
                                    <label >Note (Eg: deliver during office hours)</label>
                                    <input type="text"  class="input-text" name="note"/>
                                </li>
                            </ul>
                            <div class="buttons-set">
                                <input class="btn-black" type="submit" value="Place Order"/>
                            </div>
                        </form>
                    </div>
                    <div class="clearfix"></div>   
                </div>
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
                                </tr>
                            </c:forEach>
                            <tfoot class="foot">
                                <tr>
                                    <th>Discount</th>
                                    <td>
                                        <div class="">$0.0</div>
                                    </td> 
                                </tr>
                                <tr>
                                    <th>Order Total</th>
                                    <td>
                                        <div class="grandTotal">$${grandTotal}</div>
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
<script type="text/javascript">
    function differenceAddress() {
        var checked = $('#diff-address:checked').val();
        if (checked === "difference") {
            $('.shipping-address').toggle("slow");
        } else {
            $('.shipping-address').prop("style", false);
        }
    }
    ;
    function enterDiscountAgain() {
        $(".discount-ul").removeClass(".discount-inputs");
        $(".discount-ul").hide().html("<li class=\"col-md-6 col-sm-6 discount-inputs\">\n"
                + "<label>Your Discount Code</label>\n"
                + "<div class=\"input-box\">\n"
                + "<p class=\"help-block\" id=\"fs-checkout-discountvou-error\"></p>\n"
                + "<input class=\"input-text\" id=\"coupon_code\" name=\"coupon_code\" value=\"\"/>\n"
                + "</div>\n"
                + "</li>\n"
                + "<li class=\"col-md-6 col-sm-6 discount-buttons\" style=\"padding-top: 27px;\">\n"
                + "<div class=\"buttons-set\">\n"
                + "<button style=\"height: 40px;\" type=\"button\" title=\"Apply Discount Code\" class=\"btn-black\" id=\"discount-order\" onclick=\"discountClick();\"><span><span>Apply Discount Code</span></span></button>\n"
                + "</div></li>").fadeIn(1000);
        $.get("orders/ajax/nodiscount.html", function (responsenodiscount) {
            $(".foot").hide().html(responsenodiscount).fadeIn(1000);
        });
    }
    ;
    function discountClick() {
        $(".cart-table").remove(".foot");
        $(".cart-table").add("<tfoot class=\"foot\"></tfoot>");
        var discountCode = $("#coupon_code").val();
        if (discountCode === "") {
            $("#fs-checkout-discountvou-error").text("You must enter your discount code!");
        } else {
            $.ajax({
                url: "orders/ajax/discount.html",
                method: "POST",
                data: {discountCode: discountCode},
                dataType: 'html',
                success: function (response) {
                    if (response !== "error" && response !== "empty") {
                        $(".discount-ul").removeClass(".discount-inputs");
                        $(".discount-ul").removeClass(".discount-buttons");
                        $(".discount-ul").hide().html("<li class=\"col-md-6 col-sm-6 discount-inputs\"><div class=\"discountShow\" style=\"padding-bottom: 15px;\">\n"
                                + "<input type=\"hidden\" id=\"discount-code-input\" name=\"discount-code-input\" value=\"" + discountCode + "\"/>\n"
                                + "<b>Your Discount Code: " + discountCode + "</b>&nbsp<button class=\"fa fa-times\" id=\"cancel-discount\"  onclick=\"enterDiscountAgain();\"></button>\n"
                                + "</div></li>").fadeIn(1000);
                        $(".foot").hide().html(response).fadeIn(1000);
                    } else {
                        $.get("orders/ajax/nodiscount.html", function (responsenodiscount) {
                            if (response === "error") {
                                $("#fs-checkout-discountvou-error").text("Discount Code not existed!");
                                $(".foot").hide().html(responsenodiscount).fadeIn(1000);
                            } else if (response === "empty") {
                                $("#fs-checkout-discountvou-error").text("Your Discount Code is out of quantity");
                                $(".foot").hide().html(responsenodiscount).fadeIn(1000);
                            }
                        });
                    }
                }
            });
        }
    }
    ;
</script>
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
