<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="fa fa-times"></i>
            </button>
            <div class="row">
                <div class="col-md-5 col-sm-6">
                    <div class="owl-carousel sync1 fs-main-product-img">

                        <div class="item">
                            <img src="assets/images/products/single/1.jpg" alt="">
                        </div>         
                        <div class="item">
                            <img src="assets/images/products/single/2.jpg" alt="">
                        </div>
                        <div class="item"> <img src="assets/images/products/single/3.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/4.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/1.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/2.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/3.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/4.jpg" alt=""> </div>

                    </div>

                    <div class="owl-carousel sync2 fs-main-product-img">
                        <div class="item">
                            <img src="assets/images/products/single/1.jpg" alt="">
                        </div>
                        <div class="item">
                            <img src="assets/images/products/single/2.jpg" alt="">
                        </div>
                        <div class="item"> <img src="assets/images/products/single/3.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/4.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/1.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/2.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/3.jpg" alt=""> </div>
                        <div class="item"> <img src="assets/images/products/single/4.jpg" alt=""> </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-6">
                    <div class="product-single fs-modal-product">
                        <div class="ps-header">
                            <h3 class="fs-product-name">Product Fashion</h3>
                            <div class="ps-price fs-product-price">$ 99.00</div>
                        </div>

                        <div class="ps-stock">
                            Available: <a href="#">In Stock</a>
                        </div>
                        <div class="sep"></div>
                        <div class="ps-color fs-product-color">
                            <p>Color<span>*</span></p>
                            
                            <div class="fs-product-color-border">
                                <img fs-color="${color.colorID}" src="assets/images/products/colors/" class="img-responsive" alt="" title=""/>     
                            </div>
                            
                        </div>
                        <div class="fs-clear-fix"></div>
                        <div class="space10"></div>
                        <div class="row select-wraps">
                            <div class="col-md-7 col-sm-7">
                                <p>Size<span>*</span></p>
                                <div id="fs-product-size">
                                    
                                    <div class="fs-particular-size" fs-size="">s</div>
                                    
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
                                <a href="#" class="fa fa-heart-o" onclick="return false;"></a>
                                <a href="#" class="fa fa-signal" onclick="return false;"></a>
                                <a href="#" class="fa fa-envelope-o" onclick="return false;"></a>
                            </span>
                            <div class="addthis_native_toolbox"></div>
                        </div>
                        <div class="space20"></div>
                        <div class="sep"></div>
                        <a class="btn-color" href="#">Add to Bag</a>
                        <a class="btn-black" href="#">Go to Details</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>