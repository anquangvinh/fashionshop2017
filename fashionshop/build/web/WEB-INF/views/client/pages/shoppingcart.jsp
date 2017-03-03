<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<div class="space10"></div>

<!-- MAIN CONTENT -->
<div class="shop-single shopping-cart">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <table class="cart-table">
                    <tr>
                        <th>Remove</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Edit</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                    </tr>
                    <tr>
                        <td><i class="fa fa-trash-o"></i></td>
                        <td><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></td>
                        <td>
                            <h4><a href="./single-product.html">Product fashion</a></h4>
                            <p>Size: M</p>
                            <p>Color: White</p>
                        </td>
                        <td><i class="fa fa-edit"></i></td>
                        <td>
                            <select>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-trash-o"></i></td>
                        <td><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></td>
                        <td>
                            <h4><a href="./single-product.html">Product fashion</a></h4>
                            <p>Size: M</p>
                            <p>Color: White</p>
                        </td>
                        <td><i class="fa fa-edit"></i></td>
                        <td>
                            <select>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-trash-o"></i></td>
                        <td><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></td>
                        <td>
                            <h4><a href="./single-product.html">Product fashion</a></h4>
                            <p>Size: M</p>
                            <p>Color: White</p>
                        </td>
                        <td><i class="fa fa-edit"></i></td>
                        <td>
                            <select>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                        <td>
                            <div class="item-price">$ 99.00</div>
                        </td>
                    </tr>
                </table>
                <div class="table-btn">
                    <a href="#" class="btn-black pull-left">Continue Shopping</a>
                    <a href="#" class="btn-black pull-right">Update Shopping Cart</a>
                </div>
                <div class="clearfix space20"></div>
                <div class="row shipping-info-wrap">
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="shipping">
                            <h2>Estimate Shipping and Tax</h2>
                            <div class="shipping-form">
                                <form id="shipping-zip-form">
                                    <p>Enter your destination to get a shipping estimate.</p>
                                    <ul class="form-list">
                                        <li>
                                            <label class="required"><em>*</em>Country</label>
                                            <input class="input-text" type="text">
                                        </li>
                                        <li>
                                            <label>State/Province</label>
                                            <input class="input-text" type="text">
                                        </li>
                                        <li>
                                            <label>Zip/Postal Code</label>
                                            <input class="input-text" type="text">
                                        </li>
                                    </ul>
                                    <div class="buttons-set">
                                        <button type="button" class="btn-black"><span><span>Get a Quote</span></span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <form id="discount-coupon-form">
                            <div class="discount">
                                <h2>Discount Codes</h2>
                                <div class="form-list">
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
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="totals">
                            <table id="shopping-cart-totals-table">
                                <tfoot>
                                    <tr>
                                        <td style="" class="a-right" colspan="1">
                                            <strong>Grand Total</strong>
                                        </td>
                                        <td style="" class="a-right">
                                            <strong><span class="price">$1000.00</span></strong>
                                        </td>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <td style="" class="a-right" colspan="1">
                                            Subtotal    
                                        </td>
                                        <td style="" class="a-right">
                                            <span class="price">$1000.00</span>    
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul class="checkout-types">
                                <li class="space10"><button type="button" class="btn-color">Proceed to checkout</button></li>
                                <li><a href="#">Checkout with Multiple Addresses</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="space40"></div>
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <span class="heading-small">YOU MAY BE INTERESTED IN THE FOLLOWING ITEM(S)</span>
                        <div class="space30"></div>
                        <div class="product-carousel3">
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/fashion/15.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/accessories/8.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/fashion/18.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/fashion/10.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <img src="assets/images/products/accessories/5.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product fashion</a></h4>
                                        <span class="product-price">$99.00 <em>- Pre order</em></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>

<!-- MODAL -->
<jsp:include page="../blocks/modal.jsp" flush="true" />