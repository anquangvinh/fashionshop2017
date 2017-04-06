<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true"/>

<div class="space10"></div>
<!-- MAIN CONTENT -->
<div class="shop-single">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-md-5 col-sm-6" id="fs-product-detail-slide-img">                                    
                        <div class="owl-carousel prod-slider sync1" >
                            <c:forEach items="${targetColor.productSubImgsList}" var="subImg">
                                <div class="item"> 
                                    <img src="assets/images/products/subImg/${subImg.urlImg}" alt="${subImg.urlImg}">
                                    <a href="assets/images/products/subImg/${subImg.urlImg}" rel="prettyPhoto[gallery2]" title="Product" class="caption-link"><i class="fa fa-arrows-alt"></i></a>
                                </div>
                            </c:forEach>
                        </div>

                        <div  class="owl-carousel sync2">
                            <c:forEach items="${targetColor.productSubImgsList}" var="subImg">
                                <div class="item">
                                    <img src="assets/images/products/subImg/${subImg.urlImg}" alt="${subImg.urlImg}">
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-6">
                        <div class="product-single">
                            <div class="ps-header">
                                <h3>${targetProduct.productName}</h3>
                                <div class="ps-price"><h1>$ ${targetProduct.price}0</h1></div>
                            </div>
                            <div class="ps-stock">
                                Available: <a href="#">In Stock</a>
                            </div>
                            <div class="sep"></div>
                            <div class="ps-color fs-product-color">
                                <p>Color<span>*</span></p>
                                <c:forEach items="${targetProduct.productColorList}" var="color">
                                    <div class="fs-product-color-border">
                                        <img fs-color="${color.colorID}" src="assets/images/products/colors/${color.urlColorImg}" class="img-responsive" alt="${color.urlColorImg}" title="${color.color}"/>
                                    </div>
                                </c:forEach>
                            </div>
                            <div class="fs-clear-fix"></div>
                            <div class="space10"></div>
                            <div class="row select-wraps">
                                <div class="col-md-7 col-sm-7">
                                    <p>Size<span>*</span></p>

                                    <div id="fs-product-size">
                                        <c:forEach items="${targetColor.sizeList}" var="size">
                                            <c:if test="${size.status != 0}">
                                                <div class="fs-particular-size" fs-size="${size.sizeID}">${size.productSize}</div>
                                            </c:if>
                                        </c:forEach>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-5">
                                    <p>Quantity<span>*</span></p>
                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            <div class="space20"></div>
                            <div class="share">
                                <span>
                                    <a href="#" class="fa fa-heart-o"></a>
                                    <a href="#" class="fa fa-signal"></a>
                                    <a href="#" class="fa fa-envelope-o"></a>
                                </span>
                                <div class="addthis_native_toolbox"></div>
                            </div>
                            <div class="space20"></div>
                            <div class="sep"></div>
                            <a class="addtobag" href="#">Add to Bag</a>
                        </div>
                    </div>
                </div>
                <div class="clearfix space40"></div>
                <div role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Product Description</a></li>
                        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Customer Review</a></li>
                        <!--<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Product Tags</a></li>-->
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="home">
                            ${targetProduct.productDescription}
                        </div>
                        <div role="tabpanel" class="tab-pane" id="profile">
                            <div class="reviews-tab">
                                <p><b>Smile Nguyen</b>, 23 July 2014</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                <div class="ratings">
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                </div>
                                <div class="sep"></div>
                                <p><b>Smile Nguyen</b>, 23 July 2014</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                <div class="ratings">
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                    <span class="act fa fa-star"></span>
                                </div>
                                <div class="sep"></div>
                                <form>
                                    <h5>Write a Review</h5>
                                    <label>Your Name *</label>
                                    <input type="text">
                                    <div class="space20"></div>
                                    <label>Your Review *</label>
                                    <textarea></textarea>
                                    <br>
                                    <div class="clearfix space20"></div>
                                    <span class="pull-left">Rating*&nbsp;&nbsp;</span>
                                    <div class="ratings">
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                    <div class="clearfix space20"></div>
                                    <button type="submit" class="btn-black">Submit</button>
                                </form>
                            </div>
                        </div>
                        <!--                        <div role="tabpanel" class="tab-pane" id="messages">
                                                    <p>Add Your Tags:</p>
                                                    <form class="form-tags">
                                                        <input type="text"><br>
                                                        <span>Use spaces to separate tags. Use single quotes (') for phrases.</span><br>
                                                        <button type="submit" class="btn-black">Add Tag</button>
                                                    </form>
                                                </div>-->
                    </div>
                </div>
                <div class="clearfix space40"></div>
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <h5 class="heading space40"><span>Recently Products</span></h5>
                        <div class="product-carousel3">
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <span class="badge new">New</span>
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
                                        <div class="item-colors">
                                            <a href="#" class="brown"></a>
                                            <a href="#" class="white"></a>
                                            <a href="#" class="litebrown"></a>
                                        </div>
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
                                        <div class="item-colors">
                                            <a href="#" class="red"></a>
                                            <a href="#" class="darkgrey"></a>
                                            <a href="#" class="litebrown"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pc-wrap">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <span class="badge offer">-50%</span>
                                        <img src="assets/images/products/accessories/8.jpg" class="img-responsive" alt=""/>
                                        <div class="overlay-rmore fa fa-search quickview" data-toggle="modal" data-target="#myModal"></div>
                                        <div class="product-overlay">
                                            <a href="#" class="addcart fa fa-shopping-cart"></a>
                                            <a href="#" class="compare fa fa-signal"></a>
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title"><a href="./single-product.html">Product accessories</a></h4>
                                        <span class="product-price"><small class="cutprice">$ 200.00</small> $99.00 <em>- Pre order</em></span>
                                        <div class="item-colors">
                                            <a href="#" class="black"></a>
                                            <a href="#" class="darkgrey"></a>
                                            <a href="#" class="red"></a>
                                        </div>
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
                                        <div class="item-colors">
                                            <a href="#" class="black"></a>
                                            <a href="#" class="liteblue"></a>
                                            <a href="#" class="litebrown"></a>
                                        </div>
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
                                        <div class="item-colors">
                                            <a href="#" class="black"></a>
                                            <a href="#" class="darkgrey"></a>
                                            <a href="#" class="litebrown"></a>
                                        </div>
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
                                        <div class="item-colors">
                                            <a href="#" class="brown"></a>
                                            <a href="#" class="white"></a>
                                            <a href="#" class="litebrown"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix space20"></div>
                <!--                <div class="row">
                                    <div class="col-md-12 col-sm-12">
                                        <div class="related-posts">
                                            <h5>Recently Viewed</h5>
                                            <ul>
                                                <li><a href="./single-product.html"><img src="assets/images/products/fashion/1.jpg" class="img-responsive" alt=""/></a></li>
                                                <li><a href="./single-product.html"><img src="assets/images/products/fashion/2.jpg" class="img-responsive" alt=""/></a></li>
                                                <li><a href="./single-product.html"><img src="assets/images/products/fashion/3.jpg" class="img-responsive" alt=""/></a></li>
                                                <li><a href="./single-product.html"><img src="assets/images/products/fashion/4.jpg" class="img-responsive" alt=""/></a></li>
                                                <li><a href="./single-product.html"><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>-->
            </div>
        </div>
    </div>
</div>

<div class="clearfix space20"></div>

<!-- BREADCRUMBS -->
<jsp:include page="../blocks/modal.jsp" flush="true"/>