<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- TOPBAR -->
<div class="top_bar">
    <div class="container">
        <div class="row">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="tb_left pull-left">
                        <p>Welcome to our online store !</p>
                    </div>
                    <div class="tb_center pull-left">
                        <ul>
                            <li><i class="fa fa-phone"></i> Hotline: <a href="#">(+800) 2307 2509 8988</a></li>
                            <li><i class="fa fa-envelope-o"></i> <a href="#">online support@smile.com</a></li>
                        </ul>
                    </div>
                    <div class="tb_right pull-right">
                        <ul>
                            <li>
                                <div class="tbr-info">
                                    <span>Account <i class="fa fa-caret-down"></i></span>
                                    <div class="tbr-inner">
                                        <a href="my-account.html">My Account</a>
                                        <a href="#">My Wishlist</a>
                                        <a href="#">Checkout</a>
                                        <a href="login-page.html">Login</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="tbr-info">
                                    <span><img src="assets/images/basic/flag1.png" alt=""/>&nbsp;English <i class="fa fa-caret-down"></i></span>
                                    <div class="tbr-inner">
                                        <a href="#"><img src="assets/images/basic/flag1.png" alt=""/>English</a>
                                        <a href="#"><img src="assets/images/basic/flag2.png" alt=""/>French</a>
                                        <a href="#"><img src="assets/images/basic/flag3.png" alt=""/>German</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="tbr-info">
                                    <span>US Dollar <i class="fa fa-caret-down"></i></span>
                                    <div class="tbr-inner">
                                        <a href="#">&euro; Euro</a>
                                        <a href="#">&pound; Pound</a>
                                        <a href="#">&yen; Yen</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- HEADER -->
<header>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="row">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!-- Logo -->
                    <a class="navbar-brand" href="./index.html"><img src="assets/images/basic/logo.png" class="img-responsive" alt=""/></a>
                </div>
                <!-- Cart & Search -->
                <div class="header-xtra pull-right">
                    <div class="topcart">
                        <div id="cart">

                        </div>
                        <!--                        <span><i class="fa fa-shopping-cart"></i></span>
                                                <div class="cart-info">
                                                    <small>You have <em class="highlight">${cart.showCart().size()} item(s)</em> in your shopping bag</small>
                                                    <div id="cart">
                        
                                                    </div>
                                                    c:forEach items="${cartList}" var="item"
                                                        <div class="ci-item">
                                                            <img src="assets/images/products/${item.getProduct().getUrlImg()}" width="80" alt=""/>
                                                            <div class="ci-item-info">
                                                                <h5>
                                                                    <a href="${item.getProduct().productID}-${item.getProduct().productColorList[0].colorID}-${item.getProduct().productNameNA}.html">
                        ${item.getProduct().productName}
                    </a>
                </h5>
                <p>&nbsp Size: ${item.getSizesByColor().getProductSize()} 
                    <img fs-color="${item.getSizesByColor().getColor().colorID}" 
                         src="assets/images/products/colors/${item.getSizesByColor().getColor().getUrlColorImg()}" 
                         class="img-responsive" 
                         alt="${item.getSizesByColor().getColor().urlColorImg}" 
                         title="${item.getSizesByColor().getColor().getColor()}"
                         style="width: 20px; height: 20px;"/>
                </p>
                <p>&nbsp ${item.quantity} &nbsp x $${item.getProduct().getPrice()}</p>
                <div class="ci-edit">
                    <a href="#" class="edit fa fa-edit"></a>
                    <a href="orders/deleteitemCart/${item.getProduct().productID}.html" class="edit fa fa-trash"></a>
                </div>
            </div>
        </div>
    /c:forEach
    <div class="ci-total">Subtotal: $750.00</div>
    <div class="cart-btn">
        <a href="orders/shoppingcart.html">View Bag</a>
        <a href="#">Checkout</a>
    </div>
</div>-->
                    </div>
                    <div class="topsearch">
                        <span>
                            <i class="fa fa-search"></i>
                        </span>
                        <form class="searchtop">
                            <input type="text" placeholder="Search entire store here.">
                        </form>
                    </div>
                </div>
                <!-- Navmenu -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="./index.html" class="dropdown-toggle active" data-toggle="dropdown" role="button" aria-expanded="false">Home</a>
                            <ul class="dropdown-menu submenu" role="menu">
                                <li><a href="./index.html">Home - Style 1</a>
                                <li><a href="./index2.html">Home - Style 2</a>
                                <li><a href="./index3.html">Home - Style 3</a>
                                <li><a href="./index4.html">Home - Style 4</a>
                                <li><a href="./index5.html">Home - Style 5</a>
                            </ul>
                        </li>
                        <li class="dropdown mmenu">
                            <a href="./categories-grid.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Women</a>
                            <ul class="mega-menu dropdown-menu" role="menu">
                                <li>
                                    <div>
                                        <h5>Sample Title</h5>
                                        <a href="#">Nam ipsum est</a>
                                        <a href="#">Volutpat</a>
                                        <a href="#">In efficitur in</a>
                                        <a href="#">Accumsan eget <span class="mm-badge-sale">Sale</span></a>
                                        <a href="#">Odio</a>
                                        <a href="#">Curabitur</a>
                                        <a href="#">Phasellus <span class="mm-badge-new">New</span></a>
                                        <a href="#">Dapibus elit</a>
                                        <a href="#">Nurna ullamcorper</a>
                                        <a href="#">Lobortis</a>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h5>Sample Title</h5>
                                        <a href="#">Nam ipsum est</a>
                                        <a href="#">Volutpat</a>
                                        <a href="#">In efficitur in</a>
                                        <a href="#">Accumsan eget</a>
                                        <a href="#">Odio</a>
                                        <a href="#">Curabitur</a>
                                        <a href="#">Phasellus</a>
                                        <a href="#">Dapibus elit</a>
                                        <a href="#">Nurna ullamcorper</a>
                                        <a href="#">Lobortis</a>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h5>Sample Title</h5>
                                        <a href="#">Nam ipsum est</a>
                                        <a href="#">Volutpat</a>
                                        <a href="#">In efficitur in</a>
                                        <a href="#">Accumsan eget</a>
                                        <a href="#">Odio</a>
                                        <a href="#">Curabitur</a>
                                        <a href="#">Phasellus</a>
                                        <a href="#">Dapibus elit</a>
                                        <a href="#">Nurna ullamcorper</a>
                                        <a href="#">Lobortis</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="./categories-grid.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu submenu" role="menu">
                                <li><a href="./categories-grid.html">Shop - Grid 1</a>
                                <li><a href="./categories-list.html">Shop - Grid 2</a>
                                <li><a href="./single-product.html">Shop - Single</a></li>
                                <li><a href="./shoppingcart.html">Shopping Cart</a></li>
                                <li><a href="./checkout.html">Checkout 1</a></li>
                                <li><a href="./checkout-2.html">Checkout 2</a></li>
                                <li><a href="./checkout-2-leftside.html">Checkout Left Sidebar</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Blog</a>
                            <ul class="dropdown-menu submenu" role="menu">
                                <li><a href="./blog.html">Blog Posts</a>
                                <li><a href="./blog-single.html">Blog Single</a>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Get inspired</a>
                            <ul class="dropdown-menu submenu" role="menu">
                                <li><a href="#">Nam ipsum est</a>
                                <li><a href="#">Volutpat</a>
                                <li><a href="#">In efficitur in</a></li>
                                <li><a href="#">Accumsan eget</a></li>
                                <li><a href="#">Odio</a></li>
                                <li><a href="#">Curabitur</a></li>
                                <li><a href="#">Phasellus</a></li>
                                <li><a href="#">Dapibus elit</a></li>
                                <li><a href="#">Nurna ullamcorper</a></li>
                                <li><a href="#">Lobortis</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Technology</a>
                            <ul class="dropdown-menu submenu" role="menu">
                                <li><a href="#">Nam ipsum est</a>
                                <li><a href="#">Volutpat</a>
                                <li><a href="#">In efficitur in</a></li>
                                <li><a href="#">Accumsan eget</a></li>
                                <li><a href="#">Odio</a></li>
                                <li><a href="#">Curabitur</a></li>
                                <li><a href="#">Phasellus</a></li>
                                <li><a href="#">Dapibus elit</a></li>
                                <li><a href="#">Nurna ullamcorper</a></li>
                                <li><a href="#">Lobortis</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Pages</a>
                            <ul class="dropdown-menu submenu" role="menu">                                         
                                <li><a href="contact-1.html">Contact Style 1</a></li>
                                <li><a href="contact-2.html">Contact Style 2</a></li>
                                <li><a href="account-information.html"> Account Information </a></li>
                                <li><a href="my-account.html">My Account</a></li>                                        
                                <li><a href="cng-pw.html">Change Password</a></li>
                                <li><a href="address-book.html">Address Books</a></li>
                                <li><a href="order-history.html">Order History</a></li>
                                <li><a href="review-rating.html">Reviews and Ratings</a></li>
                                <li><a href="return.html">Returns Requests</a></li>
                                <li><a href="newsletter.html">Newsletter</a></li>
                                <li><a href="myaccount-leftsidebar.html">Left Sidebar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</header>
<script type="text/javascript">
    function deleteItem(productId, sizeId, colorId) {
        $(".topcart").remove("#cart");
        $(".topcart").add("<div id=\"cart\"></div>");
        var productid = productId;
        var sizeid = sizeId;
        var colorid = colorId;
        $.ajax({
            url: "orders/deleteitemCartInHeader.html",
            method: "POST",
            data: {productID: productid, sizeID: sizeid, colorID: colorid},
            dataType: 'html',
            success: function (response) {
                $("#cart").html(response);
            }
        });
    }
</script>