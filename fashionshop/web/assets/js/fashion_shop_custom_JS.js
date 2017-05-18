/* 
 * 
 * MỌI NGƯỜI VIẾT JAVASCRIPT VÀO ĐÂY.
 * 
 * NHỚ LÀ: VIẾT CÁI GÌ, THÌ CHÚ THÍCH CÁI ĐÓ, CÔNG DỤNG ĐỂ LÀM GÌ
 * 
 */

$(document).ready(function () {
    /* --------------- BLOG ADMIN -------------------- */


    /* USER JS AREA */
    /* REGISTER FORM */
    $("#txtBirthday").datepicker({
        dateFormat: "dd/mm/yy",
        showAnim: "drop",
        changeMonth: true,
        changeYear: true,
        yearRange: "1960:1999"
        
    });
    
    /* --------------- PRODUCT INDEX -------------------- */
    /* LOAD IMG TO RECENT VIEW FROM LOCALSTORAGE */
    // Check browser support
    if (typeof (Storage) != "undefined") {
// Retrieve
        if (localStorage.getItem("productsArrLocal") != null) {
            var productsArrLocal = JSON.parse(localStorage.getItem("productsArrLocal"));
            productsArrLocal.reverse();
            var liProdStr = "";
            var liProdStrIndexPage = "";
            $.each(productsArrLocal, function (i, prod) {
                liProdStr += "<div>\n\
                                <a href=\"" + prod.productID + "-" + prod.productColorID + "-" + prod.productNameNA + ".html\">\n\
                                    <img style=\"width: 150px\" src=\"assets/images/products/" + prod.productImg + "\" class=\"img-responsive\" alt=\"" + prod.productImg + "\"/>\n\
                                </a>\n\
                            </div>";
            });
            console.log(productsArrLocal);
//            for(var i = productsArrLocal.length - 1; i > productsArrLocal.length - 4; i--){
//                liProdStrIndexPage += "<li>\n\
//                                        <div class=\"fw-thumb\">\n\
//                                            <img src=\"assets/images/products/"+ productsArrLocal[i].productImg +"\" alt=\""+ productsArrLocal[i].productImg +"\"/>\n\
//                                        </div>\n\
//                                            <div class=\"fw-info\">\n\
//                                                <h4>\n\
//                                                    <a href=\"" + productsArrLocal[i].productID + "-" + productsArrLocal[i].productColorID + "-" + productsArrLocal[i].productNameNA + ".html\">"+ productsArrLocal[i].productName +"</a>\n\
//                                                </h4>\n\
//                                                <span class=\"fw-price\">$ "+ productsArrLocal[i].price +".00</span>\n\
//                                            </div>\n\
//                                        </li>";
//            }
            $("#fs-recent-view-product").html(liProdStr);
            // $("#fs-recent-product-index-page").html(liProdStrIndexPage);
        }
    } else {
        $("#fs-localStorage-result").text("Sorry, your browser does not support Web Storage...");
    }

    $("#fs-recent-view-product").owlCarousel({
        items: 6,
        margin: 35,
        loop: true,
        navigation: true,
        autoPlay: 2500,
        stopOnHover: true

    });

    /* SLIDE PRODUCTS IN INDEX */
    $("#isotope").isotope({
        filter: '.isotope_to_all',
        sortBy: 'random'
    });
    /* INDEX - CHANGE IMG WHEN CHOOSE COLOR */
    $(".body").on("click", ".fs-index-color-img", function () {
        var colorID = $(this).attr("fs-index-color-img");
        var productID = $(this).attr("fs-product");
        //Change link of product Title to productDetail
        var elementProductLink = $(this).parent().siblings("h4").find("a");
        var productLink = elementProductLink.attr("href");
        var productLinkArray = productLink.split("-");
        productLinkArray[1] = colorID;
        var newLink = productLinkArray.join("-");
        elementProductLink.attr("href", newLink);
        //Change color attr of product Modal
        $(this).parent().parent().siblings("div.item-thumb").find("div.fs-product-modal").attr("fs-product-modal-color", colorID);
        //Call Ajax
        $.ajax({
            url: "ajax/color.html",
            method: "POST",
            data: {colorID: colorID},
            dataType: 'json',
            success: function (response) {
                $("img[fs-product-for-img=" + productID + "]")
                        .hide()
                        .attr("src", "assets/images/products/subImg/" + response.productSubImgsList[0].urlImg)
                        .attr("alt", response.productSubImgsList[0].urlImg)
                        .fadeIn(600);
            }
        });
    });
    /* FUNCTION FOR OWL CAROUSEL */
    function fsCreateOwlCarousel() {
        var sync1 = $(".sync1");
        var sync2 = $(".sync2");
        sync1.owlCarousel({
            singleItem: true,
            slideSpeed: 1000,
            navigation: true,
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
            navigationText: [
                "<i class='fa fa-chevron-left'></i>",
                "<i class='fa fa-chevron-right'></i>"
            ]
        });
        sync2.owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 2],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });
        function syncPosition(el) {
            var current = this.currentItem;
            $(".sync2")
                    .find(".owl-item")
                    .removeClass("synced")
                    .eq(current)
                    .addClass("synced");
            if ($(".sync2").data("owlCarousel") != undefined) {
                center(current);
            }
        }

        $(".sync2").on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });
        function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num == sync2visible[i]) {
                    found = true;
                }
            }

            if (found == false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 == -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num == sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num == sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1)
            }
        }

        // prettyPhoto
        // ---------------------------------------------------------------------------------------
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            slideshow: 5000,
            autoplay_slideshow: true
        });
    }

    /* AJAX CALL MODAL */
    $(".body").on("click", ".fs-product-modal", function () {
        var productID = $(this).attr("fs-product");
        var colorID = $(this).attr("fs-product-modal-color");
        var productModal = $("#productModal");
        $(".fs-modal-input-number").val(1);
        $(".fs-modal-btn-quantity-minus").attr("disabled", "disabled");
        $(".fs-modal-btn-quantity-plus").removeAttr("disabled");
        console.log("ProductID: " + productID + " colorID: " + colorID);
        $.ajax({
            url: "ajax/findProduct.html",
            data: {productID: productID},
            method: "POST",
            dataType: "json",
            success: function (response) {
                /* Init Name and Price */
                $("h3.fs-product-name").text(response.productName);
                $("h3.fs-product-name").attr("fs-product-modal-id", productID);
                $("div.fs-product-price").text("$ " + response.price + ".00");
                /* Init color img  */
                var colorImgStr = "<p>Color<span>*</span></p>";
                var sizeStr = "";
                var str_change_big_img = "";
                var str_change_small_img = "";
                $.each(response.productColorList, function (i, item) {
                    colorImgStr += "<div class=\"fs-product-modal-color-border\">\n\
                                        <img fs-color=\"" + item.colorID + "\" src=\"assets/images/products/colors/" + item.urlColorImg + "\" class=\"img-responsive\" alt=\"" + item.urlColorImg + "\" title=\"" + item.color + "\"/>\n\
                                    </div>";
                    if (item.colorID == colorID) {
                        /* Init size By ColorID */
                        $.each(item.sizeList, function (j, size) {
                            sizeStr += "<div class=\"fs-particular-size\" fs-size=\"" + size.sizeID + "\">" + size.productSize + "</div>";
                        });
                        /* Init product Image By Color*/
                        $.each(item.productSubImgsList, function (k, subImg) {
                            str_change_big_img += "<div class=\"item\"><img src=\"assets/images/products/subImg/" + subImg.urlImg + "\" alt=\"" + subImg.urlImg + "\"></div>";
                            str_change_small_img += "<div class=\"item\"><img src=\"assets/images/products/subImg/" + subImg.urlImg + "\" alt=\"" + subImg.urlImg + "\"></div>";
                        });
                    }
                });
                var finalStrToChangeImg = "<div class=\"owl-carousel sync1 fs-main-product-img\">" + str_change_big_img + "</div><div class=\"owl-carousel sync2 fs-main-product-img\">" + str_change_small_img + "</div>";
                $("div.fs-product-modal-color").html(colorImgStr);
                $("#fs-product-modal-size").html(sizeStr);
                $("#fs-product-modal-slide-img").html(finalStrToChangeImg);
                fsCreateOwlCarousel();
                $(".fs-product-modal-link-to-detail").attr("href", productID + "-" + colorID + "-" + response.productNameNA + ".html");
                //Call Modal
                productModal.modal("show");
            }
        });
    });
    /* MODAL - EVENT CLICK ON COLOR IMG */
    $("div.fs-product-modal-color").on("click", ".fs-product-modal-color-border", function () {
        $(".fs-modal-error").text("");
        $(".fs-product-modal-color-border").removeClass("fs-product-selected");
        $(this).addClass("fs-product-selected");
        var colorID = $(this).find("img").attr("fs-color");
        var oldLink = $(".fs-product-modal-link-to-detail").attr("href");
        var linkArray = oldLink.split("-");
        linkArray[1] = colorID;
        var newLink = linkArray.join("-");
        $(".fs-product-modal-link-to-detail").attr("href", newLink);
        $.ajax({
            url: "ajax/color.html",
            method: "POST",
            data: {colorID: colorID},
            dataType: "json",
            success: function (response) {

                /* Change Image */
                var str_change_big_img = "";
                var str_change_small_img = "";
                $.each(response.productSubImgsList, function (i, item) {
                    if (item.status != 0) {
                        str_change_big_img += "<div class=\"item\"><img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"></div>";
                        str_change_small_img += "<div class=\"item\"><img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"></div>";
                    }
                });
                var finalStrToChangeImg = "<div class=\"owl-carousel sync1 fs-main-product-img\">" + str_change_big_img + "</div><div class=\"owl-carousel sync2 fs-main-product-img\">" + str_change_small_img + "</div>";
                $("#fs-product-modal-slide-img").hide().html(finalStrToChangeImg).fadeIn(1000);
                fsCreateOwlCarousel();
                /* Change Size */
                var str_change_size = "";
                $.each(response.sizeList, function (i, item) {
                    if (item.quantity == 0) {
                        str_change_size += "<div class=\"fs-particular-size fs-unselectable\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    } else {
                        str_change_size += "<div class=\"fs-particular-size\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    }
                });
                $("#fs-product-modal-size").hide().html(str_change_size).fadeIn(1000);
            }
        });
    });
    /* EVENT INCREASE OR DECREASE QUANTITY */
    $(".fs-modal-btn-number").click(function () {
        $(".fs-modal-error").text("");
        var action = $(this).attr("data-type");
        var currentVal = parseInt($(".fs-modal-input-number").val());
        if (!isNaN(currentVal)) {
            if (action == "minus") {
                if (currentVal > $(".fs-modal-input-number").attr("min")) {
                    $(".fs-modal-input-number").val(currentVal - 1).change();
                }
                if (parseInt($(".fs-modal-input-number").val()) == $(".fs-modal-input-number").attr("min")) {
                    $(".fs-modal-btn-quantity-minus").attr("disabled", "disabled");
                }

            } else if (action == "plus") {
                if (currentVal < $(".fs-modal-input-number").attr("max")) {
                    $(".fs-modal-input-number").val(currentVal + 1).change();
                }
                if (parseInt($(".fs-modal-input-number").val()) == $(".fs-modal-input-number").attr("max")) {
                    $(".fs-modal-btn-quantity-plus").attr("disabled", "disabled");
                }
            }
        } else {
            $(".fs-modal-input-number").val(1);
        }
    });
    $(".fs-modal-input-number").focusin(function () {
        $(".fs-modal-error").text("");
        $(this).data("oldVal", $(this).val()); //Lấy value từ input, lưu vào key "oldValue"
    });
    $(".fs-modal-input-number").on("change", function () {
        $(".fs-modal-error").text("");
        var currentValue = parseInt($(".fs-modal-input-number").val());
        var minValue = parseInt($(".fs-modal-input-number").attr("min"));
        var maxValue = parseInt($(".fs-modal-input-number").attr("max"));
        if (currentValue >= minValue) {
            $(".fs-modal-btn-quantity-minus").removeAttr("disabled");
        } else {
            alert("Quantity must be at least 1!");
            $(this).val($(this).data('oldVal'));
        }

        if (currentValue <= maxValue) {
            $(".fs-modal-btn-quantity-plus").removeAttr("disabled");
        } else {
            alert("Quantity must be less than 10!");
            $(this).val($(this).data('oldVal'));
        }
    });
    $(".fs-modal-input-number").keydown(function (e) {
        $(".fs-modal-error").text("");
        var press = e.keyCode || e.which;
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(press, [46, 8, 9, 27, 190, 17]) != -1) {
            // let it happen, don't do anything
            return;
        }
        if (press == '13') {
            $(this).blur();
        }
        // Ensure that it is a number and stop the keypress
        if ((press < 48 || press > 57) && (press < 96 || press > 105) && (press < 112 || press > 123)) {
            e.preventDefault();
        }
    });
    /* ------------------ PRODUCT_DETAIL ------------------- */
    /* CHANGE DATA WHEN CHOOSE A COLOR */
    $(".fs-product-color-border").on("click", function () {
        $("#error-product-detail").html("").fadeOut(1000);
        $(".fs-product-color-border").removeClass("fs-product-selected");
        $(this).addClass("fs-product-selected");
        var colorID = $(this).find("img").attr("fs-color");
        $.ajax({
            url: "ajax/color.html",
            method: "POST",
            data: {colorID: colorID},
            dataType: "json",
            success: function (response) {

                /* Change Image */
                var str_change_big_img = "";
                var str_change_small_img = "";
                $.each(response.productSubImgsList, function (i, item) {
                    if (item.status != 0) {
                        str_change_big_img += "<div class=\"item\">\n\
                                                    <img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"/>\n\
                                                    <a href=\"assets/images/products/subImg/" + item.urlImg + "\" rel=\"prettyPhoto[gallery2]\" title=\"Product\" class=\"caption-link\">\n\
                                                        <i class=\"fa fa-arrows-alt\"></i>\n\
                                                    </a>\n\
                                                </div>";
                        str_change_small_img += "<div class=\"item\">\n\
                                                      <img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"/>\n\\n\
                                                   </div>";
                    }
                });
                var finalStr = "<div class=\"owl-carousel prod-slider sync1\">" + str_change_big_img + "</div><div class=\"owl-carousel sync2\">" + str_change_small_img + "</div>";
                $("#fs-product-detail-slide-img").hide().html(finalStr).fadeIn(1000);
                fsCreateOwlCarousel();
                /* Change Size */
                var str_change_size = "";
                $.each(response.sizeList, function (i, item) {
                    if (item.quantity == 0) {
                        str_change_size += "<div class=\"fs-particular-size fs-unselectable\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    } else {
                        str_change_size += "<div class=\"fs-particular-size\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    }
                });
                $("#fs-product-size").hide().html(str_change_size).fadeIn(1000);
            }
        });
    });
    /* EVENT CLICK WHEN CHOOSE SIZE */
    $(document).on("click", ".fs-particular-size", function () {
        $("#error-product-detail").html("").fadeOut(1000);
        $(".fs-modal-error").text("");
        var classList = $(this).attr("class").split(" ");
        var rs = $.inArray("fs-unselectable", classList);
        if (rs == -1) {
            $(".fs-particular-size").removeClass("fs-product-selected");
            $(this).addClass("fs-product-selected");
        }
    });
    /* EVENT INCREASE OR DECREASE QUANTITY */
    $(".fs-btn-number").click(function () {
        $("#error-product-detail").html("").fadeOut(1000);
        var action = $(this).attr("data-type");
        var currentVal = parseInt($(".fs-input-number").val());
        if (!isNaN(currentVal)) {
            if (action == "minus") {
                if (currentVal > $(".fs-input-number").attr("min")) {
                    $(".fs-input-number").val(currentVal - 1).change();
                }
                if (parseInt($(".fs-input-number").val()) == $(".fs-input-number").attr("min")) {
                    $(".fs-btn-quantity-minus").attr("disabled", "disabled");
                }

            } else if (action == "plus") {
                if (currentVal < $(".fs-input-number").attr("max")) {
                    $(".fs-input-number").val(currentVal + 1).change();
                }
                if (parseInt($(".fs-input-number").val()) == $(".fs-input-number").attr("max")) {
                    $(".fs-btn-quantity-plus").attr("disabled", "disabled");
                }
            }
        } else {
            $(".fs-input-number").val(1);
        }
    });

    $(".fs-input-number").focusin(function () {
        $("#error-product-detail").html("").fadeOut(1000);
        $(this).data("oldValue", $(this).val()); //Lấy value từ input, lưu vào key "oldValue"
    });
    $(".fs-input-number").on("change", function () {
        $("#error-product-detail").html("").fadeOut(1000);
        var currentValue = parseInt($(".fs-input-number").val());
        var minValue = parseInt($(".fs-input-number").attr("min"));
        var maxValue = parseInt($(".fs-input-number").attr("max"));
        if (currentValue >= minValue) {
            $(".fs-btn-quantity-minus").removeAttr("disabled");
        } else {
            alert("Quantity must be at least 1!");
            $(this).val($(this).data('oldValue'));
        }
        if (currentValue <= maxValue) {
            $(".fs-btn-quantity-plus").removeAttr("disabled");
        } else {
            alert("Quantity must be less than 10!");
            $(this).val($(this).data('oldValue'));
        }
    });

    $(".fs-input-number").keydown(function (e) {
        var press = e.keyCode || e.which;
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(press, [46, 8, 9, 27, 13, 190, 17]) !== -1) {
            // let it happen, don't do anything
            $(this).blur().focus();
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((press < 48 || press > 57) && (press < 96 || press > 105) && (press < 112 || press > 123)) {
            e.preventDefault();
        }
    });

    /* PRODUCT CATEGORY-GRID */
    /* AJAX PAGINATION */
    var colorFilterArr = [];
    var sizeFilterArr = [];

    /* AJAX ON CLICK PAGE */
    $("#fs-shop-content").on("click", ".fs-page-number", function () {
        if (!$(this).hasClass("fs-page-number-active")) {
            $(".fs-page-number").removeClass("fs-page-number-active");
            $(this).addClass("fs-page-number-active");
            var page = $(this).attr("fs-page-number");                              //Số trang hiện tại
            var itemPerPage = $("#fs-number-of-item-on-page").val();                //Số item trên 1 trang
            var cateID = $(this).attr("fs-category");                               //Category ID
            var numberOfProducts = parseInt($("#fs-number-of-products").text());    //Tổng số lượng Product
            var sortBy = $("#fs-sort-product-by").val();                            //1: Newest; 2: Low to High Price; 3: High to Low Price
            $(".fs-page-number[fs-page-number=" + page + "]").addClass("fs-page-number-active");
            var from = (page - 1) * itemPerPage + 1;                                //STT của sp đầu tiên của trang
            var to = (page - 1) * itemPerPage + parseInt(itemPerPage);              //STT của sp cuối cùng của trang
            if (to > numberOfProducts) {
                to = numberOfProducts;
            }
            var currentProductPageInfo = from + " - " + to;
            var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
            var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"

            $.ajax({
                url: "ajax/productPagination.html",
                method: "POST",
                data: {
                    cateID: cateID,
                    page: page,
                    itemPerPage: itemPerPage,
                    sortBy: sortBy,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    colorFilterArr: colorFilterArr,
                    sizeFilterArr: sizeFilterArr
                },
                dataType: 'JSON',
                beforeSend: function () {
                    $("#fs-ajax-loading").css("display", "block");
                },
                success: function (response) {
                    setTimeout(function () {
                        $("#fs-ajax-loading").css("display", "none");
                        if (response != "") {
                            $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                            //Change product content
                            var result = "";
                            $.each(response, function (i, prod) {
                                var renderColor = "";
                                if (prod.productColorList.length > 1) {
                                    $.each(prod.productColorList, function (j, color) {
                                        renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                + "              class=\"img-responsive fs-index-color-img\" \n"
                                                + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                + "              fs-product=\"" + prod.productID + "\" \n"
                                                + "              alt=\"" + color.urlColorImg + "\" \n"
                                                + "              title=\"" + color.color + "\"/>";
                                    });
                                }

                                if (prod.productDiscount == 0) {
                                    result += "<div class=\"col-md-4 col-sm-6\">\n"
                                            + "     <div class=\"product-item\">\n"
                                            + "          <div class=\"item-thumb\">\n"
                                            + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                            + "                    class=\"img-responsive\" \n"
                                            + "                    alt=\"" + prod.urlImg + "\"\n"
                                            + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                            + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                            + "                     data-toggle=\"modal\" \n"
                                            + "                     fs-product=\"" + prod.productID + "\" \n"
                                            + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                            + "                </div>\n"
                                            + "                <div class=\"product-overlay\">\n"
                                            + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                            + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                            + "                </div>\n"
                                            + "          </div>\n"
                                            + "      <div class=\"product-info\">\n"
                                            + "          <h4 class=\"product-title\">\n"
                                            + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                            + "                 " + prod.productName + "\n"
                                            + "              </a>\n"
                                            + "          </h4>\n"
                                            + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                            + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                            + renderColor
                                            + "          </div>\n"
                                            + "      </div>\n"
                                            + "    </div>\n"
                                            + "</div>";
                                } else {
                                    result += "<div class=\"col-md-4 col-sm-6\">\n"
                                            + "     <div class=\"product-item\">\n"
                                            + "          <div class=\"item-thumb\">\n"
                                            + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                            + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                            + "                    class=\"img-responsive\" \n"
                                            + "                    alt=\"" + prod.urlImg + "\"\n"
                                            + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                            + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                            + "                     data-toggle=\"modal\" \n"
                                            + "                     fs-product=\"" + prod.productID + "\" \n"
                                            + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                            + "                </div>\n"
                                            + "                <div class=\"product-overlay\">\n"
                                            + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                            + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                            + "                </div>\n"
                                            + "          </div>\n"
                                            + "      <div class=\"product-info\">\n"
                                            + "          <h4 class=\"product-title\">\n"
                                            + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                            + "                 " + prod.productName + "\n"
                                            + "              </a>\n"
                                            + "          </h4>\n"
                                            + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                            + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                            + renderColor
                                            + "          </div>\n"
                                            + "      </div>\n"
                                            + "    </div>\n"
                                            + "</div>";
                                }
                            });
                            $("#fs-change-data-here").html(result);
                        }
                    }, 400);
                }
            });

        }


    });

    /* AJAX ON CHANGE SORT PRODUCT BY  */
    $("#fs-shop-content").on("change", "#fs-sort-product-by", function () {
        var sortBy = $(this).val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var cateID = $(this).attr("fs-category");
        var page = 1;
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        $(".fs-page-number").removeClass("fs-page-number-active");
        $(".fs-page-number[fs-page-number='1']").addClass("fs-page-number-active");
        var numberOfProducts = parseInt($("#fs-number-of-products").text());
        var from = (page - 1) * itemPerPage + 1;
        var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
        if (to > numberOfProducts) {
            to = numberOfProducts;
        }
        var currentProductPageInfo = from + " - " + to;

        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến

        $.ajax({
            url: "ajax/productPagination.html",
            method: "POST",
            data: {
                cateID: cateID,
                page: page,
                itemPerPage: itemPerPage,
                sortBy: sortBy,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArr: colorFilterArr,
                sizeFilterArr: sizeFilterArr
            },
            dataType: 'JSON',
            beforeSend: function () {
                $("#fs-ajax-loading").css("display", "block");
            },
            success: function (response) {
                setTimeout(function () {
                    $("#fs-ajax-loading").css("display", "none");
                    if (response != 0) {
                        $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);

                        //Change product content
                        var result = "";
                        $.each(response, function (i, prod) {
                            var renderColor = "";
                            if (prod.productColorList.length > 1) {
                                $.each(prod.productColorList, function (j, color) {
                                    renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                            + "              class=\"img-responsive fs-index-color-img\" \n"
                                            + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                            + "              fs-product=\"" + prod.productID + "\" \n"
                                            + "              alt=\"" + color.urlColorImg + "\" \n"
                                            + "              title=\"" + color.color + "\"/>";
                                });
                            }

                            if (prod.productDiscount == 0) {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            } else {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            }
                        });
                        $("#fs-change-data-here").html(result);
                    }
                }, 400);
            }
        });
    });

    /* AJAX ON CHANGE NUMBER OF PRODUCT PER PAGE */
    $("#fs-shop-content").on("change", "#fs-number-of-item-on-page", function () {
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        var page = 1;
        var cateID = $(this).attr("fs-category");
        var numberOfProducts = parseInt($("#fs-number-of-products").text());
        var numberOfPages = Math.ceil(numberOfProducts / itemPerPage);

        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"

        //change productPageInfo
        var from = (page - 1) * itemPerPage + 1;
        var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
        if (to > numberOfProducts) {
            to = numberOfProducts;
        }
        var currentProductPageInfo = from + " - " + to;

        //Change pagination
        var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-category=\"" + cateID + "\">1</span></li>";

        if (numberOfPages > 1) {
            for (var i = 2; i <= numberOfPages; i++) {
                pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-category=\"" + cateID + "\">" + i + "</span></li>";
            }
        }

        //Change Product in page
        $.ajax({
            url: "ajax/productPagination.html",
            method: "POST",
            data: {
                cateID: cateID,
                page: page,
                itemPerPage: itemPerPage,
                sortBy: sortBy,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArr: colorFilterArr,
                sizeFilterArr: sizeFilterArr
            },
            dataType: 'JSON',
            beforeSend: function () {
                $("#fs-ajax-loading").css("display", "block");
            },
            success: function (response) {
                setTimeout(function () {
                    $("#fs-ajax-loading").css("display", "none");
                    if (response != 0) {
                        $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);

                        //Change pagination
                        $(".fs-ul-page-nav").html(pagination);

                        //Change product content
                        var result = "";
                        $.each(response, function (i, prod) {
                            var renderColor = "";
                            if (prod.productColorList.length > 1) {
                                $.each(prod.productColorList, function (j, color) {
                                    renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                            + "              class=\"img-responsive fs-index-color-img\" \n"
                                            + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                            + "              fs-product=\"" + prod.productID + "\" \n"
                                            + "              alt=\"" + color.urlColorImg + "\" \n"
                                            + "              title=\"" + color.color + "\"/>";
                                });
                            }

                            if (prod.productDiscount == 0) {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            } else {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            }
                        });
                        $("#fs-change-data-here").html(result);
                    }
                }, 400);
            }
        });
    });

    /* FILTER PRODUCT BY PRICE */
    $("#fs-shop-content").on("click", "#fs-btn-filter-price", function () {

        $(this).attr("fs-filter", "yes");
        var page = 1;
        var fromPrice = $("#fs-price-from").val();
        var toPrice = $("#fs-price-to").val();
        var cateID = $("#fs-price-from").attr("fs-category");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();

        if (fromPrice == "") {
            fromPrice = $("#fs-price-from-text").attr("fs-min-price");
        }

        if (toPrice == "") {
            toPrice = $("#fs-price-to-text").attr("fs-max-price");
        }

        if (fromPrice > toPrice) {
            $("#fs-filter-price-error").text("\"From\" Price must be less than \"To\" Price");
            $("#fs-price-from").val("");
            $("#fs-price-to").val("");
            $("#fs-price-from").focus();
        } else {
            if (fromPrice != "") {
                $("#fs-price-from-text").text(fromPrice);
            }

            if (toPrice != "") {
                $("#fs-price-to-text").text(toPrice);
            }
            $("#fs-filter-price-error").text("");
            $.ajax({
                url: "ajax/getNumberOfProductsByFilter_OfACategory.html",
                method: "POST",
                data: {
                    cateID: cateID,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    colorFilterArr: colorFilterArr,
                    sizeFilterArr: sizeFilterArr
                },
                success: function (numberOfProducts) {
                    $.ajax({
                        url: "ajax/productPagination.html",
                        method: "POST",
                        data: {
                            cateID: cateID,
                            page: page,
                            itemPerPage: itemPerPage,
                            sortBy: sortBy,
                            fromPrice: fromPrice,
                            toPrice: toPrice,
                            colorFilterArr: colorFilterArr,
                            sizeFilterArr: sizeFilterArr
                        },
                        dataType: 'JSON',
                        beforeSend: function () {
                            $("#fs-ajax-loading").css("display", "block");
                        },
                        success: function (response) {
                            setTimeout(function () {
                                $("#fs-ajax-loading").css("display", "none");
                                if (response.length == 0) {
                                    $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");
                                    //change productPageInfo
                                    var from = 0;
                                    var to = 0;
                                    var currentProductPageInfo = from + " - " + to;
                                    $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                    $(".fs-number-of-products").text(numberOfProducts);
                                } else {
                                    //Tổng số sản phẩm
                                    var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);

                                    //Change pagination
                                    var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-category=\"" + cateID + "\">1</span></li>";
                                    if (numberOfPages > 1) {
                                        for (var i = 2; i <= numberOfPages; i++) {
                                            pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-category=\"" + cateID + "\">" + i + "</span></li>";
                                        }
                                    }

                                    $(".fs-ul-page-nav").html(pagination);

                                    //change productPageInfo
                                    var from = (page - 1) * itemPerPage + 1;
                                    var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                    if (to > parseInt(numberOfProducts)) {
                                        to = parseInt(numberOfProducts);
                                    }
                                    var currentProductPageInfo = from + " - " + to;
                                    $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                    $(".fs-number-of-products").text(numberOfProducts);

                                    //Change product content
                                    var result = "";
                                    $.each(response, function (i, prod) {
                                        var renderColor = "";
                                        if (prod.productColorList.length > 1) {
                                            $.each(prod.productColorList, function (j, color) {
                                                renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                        + "              class=\"img-responsive fs-index-color-img\" \n"
                                                        + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                        + "              fs-product=\"" + prod.productID + "\" \n"
                                                        + "              alt=\"" + color.urlColorImg + "\" \n"
                                                        + "              title=\"" + color.color + "\"/>";
                                            });
                                        }

                                        if (prod.productDiscount == 0) {
                                            result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                    + "     <div class=\"product-item\">\n"
                                                    + "          <div class=\"item-thumb\">\n"
                                                    + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                    + "                    class=\"img-responsive\" \n"
                                                    + "                    alt=\"" + prod.urlImg + "\"\n"
                                                    + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                    + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                    + "                     data-toggle=\"modal\" \n"
                                                    + "                     fs-product=\"" + prod.productID + "\" \n"
                                                    + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                    + "                </div>\n"
                                                    + "                <div class=\"product-overlay\">\n"
                                                    + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                    + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                    + "                </div>\n"
                                                    + "          </div>\n"
                                                    + "      <div class=\"product-info\">\n"
                                                    + "          <h4 class=\"product-title\">\n"
                                                    + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                    + "                 " + prod.productName + "\n"
                                                    + "              </a>\n"
                                                    + "          </h4>\n"
                                                    + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                    + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                    + renderColor
                                                    + "          </div>\n"
                                                    + "      </div>\n"
                                                    + "    </div>\n"
                                                    + "</div>";
                                        } else {
                                            result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                    + "     <div class=\"product-item\">\n"
                                                    + "          <div class=\"item-thumb\">\n"
                                                    + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                    + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                    + "                    class=\"img-responsive\" \n"
                                                    + "                    alt=\"" + prod.urlImg + "\"\n"
                                                    + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                    + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                    + "                     data-toggle=\"modal\" \n"
                                                    + "                     fs-product=\"" + prod.productID + "\" \n"
                                                    + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                    + "                </div>\n"
                                                    + "                <div class=\"product-overlay\">\n"
                                                    + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                    + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                    + "                </div>\n"
                                                    + "          </div>\n"
                                                    + "      <div class=\"product-info\">\n"
                                                    + "          <h4 class=\"product-title\">\n"
                                                    + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                    + "                 " + prod.productName + "\n"
                                                    + "              </a>\n"
                                                    + "          </h4>\n"
                                                    + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                    + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                    + renderColor
                                                    + "          </div>\n"
                                                    + "      </div>\n"
                                                    + "    </div>\n"
                                                    + "</div>";
                                        }
                                    });
                                    $("#fs-change-data-here").html(result);

                                    $("#fs-price-from").val("");
                                    $("#fs-price-to").val("");
                                }
                            }, 400);
                        }
                    });
                }

            });

        }
    });

    /* FILTER PRODUCT BY COLOR */
    $("#fs-shop-content").on("change", ".fs-color-checkbox", function () {
        if (this.checked) { //Check
            colorFilterArr.push($(this).val());
        } else { //Bỏ Check
            var index = colorFilterArr.indexOf($(this).val());
            if (index > -1) {
                colorFilterArr.splice(index, 1);
            }
        }

        var page = 1;
        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"
        var cateID = $("#fs-price-from").attr("fs-category");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();

        $.ajax({
            url: "ajax/getNumberOfProductsByFilter_OfACategory.html",
            method: "POST",
            data: {
                cateID: cateID,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArr: colorFilterArr,
                sizeFilterArr: sizeFilterArr
            },
            success: function (numberOfProducts) {
                $.ajax({
                    url: "ajax/productPagination.html",
                    method: "POST",
                    data: {
                        cateID: cateID,
                        page: page,
                        itemPerPage: itemPerPage,
                        sortBy: sortBy,
                        fromPrice: fromPrice,
                        toPrice: toPrice,
                        colorFilterArr: colorFilterArr,
                        sizeFilterArr: sizeFilterArr
                    },
                    dataType: 'JSON',
                    beforeSend: function () {
                        $("#fs-ajax-loading").css("display", "block");
                    },
                    success: function (response) {

                        setTimeout(function () {
                            $("#fs-ajax-loading").css("display", "none");
                            if (response.length == 0) {
                                $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");

                                //change productPageInfo
                                var from = 0;
                                var to = 0;
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                            } else {
                                //Tổng số sản phẩm
                                var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);

                                //Change pagination
                                var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-category=\"" + cateID + "\">1</span></li>";
                                if (numberOfPages > 1) {
                                    for (var i = 2; i <= numberOfPages; i++) {
                                        pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-category=\"" + cateID + "\">" + i + "</span></li>";
                                    }
                                }

                                $(".fs-ul-page-nav").html(pagination);

                                //change productPageInfo
                                var from = (page - 1) * itemPerPage + 1;
                                var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                if (to > parseInt(numberOfProducts)) {
                                    to = parseInt(numberOfProducts);
                                }
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);

                                //Change product content
                                var result = "";
                                $.each(response, function (i, prod) {
                                    var renderColor = "";
                                    if (prod.productColorList.length > 1) {
                                        $.each(prod.productColorList, function (j, color) {
                                            renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                    + "              class=\"img-responsive fs-index-color-img\" \n"
                                                    + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                    + "              fs-product=\"" + prod.productID + "\" \n"
                                                    + "              alt=\"" + color.urlColorImg + "\" \n"
                                                    + "              title=\"" + color.color + "\"/>";
                                        });
                                    }

                                    if (prod.productDiscount == 0) {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    } else {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    }
                                });
                                $("#fs-change-data-here").html(result);
                            }
                        }, 400);
                    }
                });
            }
        });
    });

    /* FILTER PRODUCT BY SIZE */
    $("#fs-shop-content").on("change", ".fs-size-checkbox", function () {
        if (this.checked) { //Check
            sizeFilterArr.push($(this).val());
        } else { //Bỏ Check
            var index = sizeFilterArr.indexOf($(this).val());
            if (index > -1) {
                sizeFilterArr.splice(index, 1);
            }
        }

        var page = 1;
        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"
        var cateID = $("#fs-price-from").attr("fs-category");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();

        $.ajax({
            url: "ajax/getNumberOfProductsByFilter_OfACategory.html",
            method: "POST",
            data: {
                cateID: cateID,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArr: colorFilterArr,
                sizeFilterArr: sizeFilterArr
            },
            success: function (numberOfProducts) {
                $.ajax({
                    url: "ajax/productPagination.html",
                    method: "POST",
                    data: {
                        cateID: cateID,
                        page: page,
                        itemPerPage: itemPerPage,
                        sortBy: sortBy,
                        fromPrice: fromPrice,
                        toPrice: toPrice,
                        colorFilterArr: colorFilterArr,
                        sizeFilterArr: sizeFilterArr
                    },
                    dataType: 'JSON',
                    beforeSend: function () {
                        $("#fs-ajax-loading").css("display", "block");
                    },
                    success: function (response) {

                        setTimeout(function () {
                            $("#fs-ajax-loading").css("display", "none");
                            if (response.length == 0) {
                                $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");
                                //change productPageInfo
                                var from = 0;
                                var to = 0;
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                            } else {
                                //Tổng số sản phẩm
                                var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);

                                //Change pagination
                                var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-category=\"" + cateID + "\">1</span></li>";

                                if (numberOfPages > 1) {
                                    for (var i = 2; i <= numberOfPages; i++) {
                                        pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-category=\"" + cateID + "\">" + i + "</span></li>";
                                    }
                                }
                                $(".fs-ul-page-nav").html(pagination);

                                //change productPageInfo
                                var from = (page - 1) * itemPerPage + 1;
                                var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                if (to > parseInt(numberOfProducts)) {
                                    to = parseInt(numberOfProducts);
                                }
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);

                                //Change product content
                                var result = "";
                                $.each(response, function (i, prod) {
                                    var renderColor = "";
                                    if (prod.productColorList.length > 1) {
                                        $.each(prod.productColorList, function (j, color) {
                                            renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                    + "              class=\"img-responsive fs-index-color-img\" \n"
                                                    + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                    + "              fs-product=\"" + prod.productID + "\" \n"
                                                    + "              alt=\"" + color.urlColorImg + "\" \n"
                                                    + "              title=\"" + color.color + "\"/>";
                                        });
                                    }

                                    if (prod.productDiscount == 0) {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    } else {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    }
                                });
                                $("#fs-change-data-here").html(result);
                            }
                        }, 400);
                    }
                });
            }
        });
    });

    /* PRODUCT SUB-CATEGORY-GRID */
    /* AJAX PAGINATION */
    var colorFilterArrSubCate = [];
    var sizeFilterArrSubCate = [];

    /* AJAX ON CLICK PAGE */
    $("#fs-shop-content-sub-category").on("click", ".fs-page-number", function () {
        if (!$(this).hasClass("fs-page-number-active")) {
            $(".fs-page-number").removeClass("fs-page-number-active");
            $(this).addClass("fs-page-number-active");
            var page = $(this).attr("fs-page-number");                              //Số trang hiện tại
            var itemPerPage = $("#fs-number-of-item-on-page").val();                //Số item trên 1 trang
            var subCateID = $(this).attr("fs-subCategory");                               //Category ID
            var numberOfProducts = parseInt($("#fs-number-of-products").text());    //Tổng số lượng Product
            var sortBy = $("#fs-sort-product-by").val();                            //1: Newest; 2: Low to High Price; 3: High to Low Price
            $(".fs-page-number[fs-page-number=" + page + "]").addClass("fs-page-number-active");
            var from = (page - 1) * itemPerPage + 1; //STT của sp đầu tiên của trang
            var to = (page - 1) * itemPerPage + parseInt(itemPerPage); //STT của sp cuối cùng của trang
            if (to > numberOfProducts) {
                to = numberOfProducts;
            }
            var currentProductPageInfo = from + " - " + to;
            var fromPrice = $("#fs-price-from-text").text(); //Lọc giá Product "Từ"
            var toPrice = $("#fs-price-to-text").text(); //Lọc giá Product "Đến"

            $.ajax({
                url: "ajax/productPaginationForSubCate.html",
                method: "POST",
                data: {
                    subCateID: subCateID,
                    page: page,
                    itemPerPage: itemPerPage,
                    sortBy: sortBy,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    colorFilterArrSubCate: colorFilterArrSubCate,
                    sizeFilterArrSubCate: sizeFilterArrSubCate
                },
                dataType: 'JSON',
                beforeSend: function () {
                    $("#fs-ajax-loading").css("display", "block");
                },
                success: function (response) {
                    setTimeout(function () {
                        $("#fs-ajax-loading").css("display", "none");
                        if (response != "") {
                            $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                            //Change product content
                            var result = "";
                            $.each(response, function (i, prod) {
                                var renderColor = "";
                                if (prod.productColorList.length > 1) {
                                    $.each(prod.productColorList, function (j, color) {
                                        renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                + "              class=\"img-responsive fs-index-color-img\" \n"
                                                + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                + "              fs-product=\"" + prod.productID + "\" \n"
                                                + "              alt=\"" + color.urlColorImg + "\" \n"
                                                + "              title=\"" + color.color + "\"/>";
                                    });
                                }

                                if (prod.productDiscount == 0) {
                                    result += "<div class=\"col-md-4 col-sm-6\">\n"
                                            + "     <div class=\"product-item\">\n"
                                            + "          <div class=\"item-thumb\">\n"
                                            + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                            + "                    class=\"img-responsive\" \n"
                                            + "                    alt=\"" + prod.urlImg + "\"\n"
                                            + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                            + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                            + "                     data-toggle=\"modal\" \n"
                                            + "                     fs-product=\"" + prod.productID + "\" \n"
                                            + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                            + "                </div>\n"
                                            + "                <div class=\"product-overlay\">\n"
                                            + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                            + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                            + "                </div>\n"
                                            + "          </div>\n"
                                            + "      <div class=\"product-info\">\n"
                                            + "          <h4 class=\"product-title\">\n"
                                            + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                            + "                 " + prod.productName + "\n"
                                            + "              </a>\n"
                                            + "          </h4>\n"
                                            + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                            + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                            + renderColor
                                            + "          </div>\n"
                                            + "      </div>\n"
                                            + "    </div>\n"
                                            + "</div>";
                                } else {
                                    result += "<div class=\"col-md-4 col-sm-6\">\n"
                                            + "     <div class=\"product-item\">\n"
                                            + "          <div class=\"item-thumb\">\n"
                                            + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                            + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                            + "                    class=\"img-responsive\" \n"
                                            + "                    alt=\"" + prod.urlImg + "\"\n"
                                            + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                            + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                            + "                     data-toggle=\"modal\" \n"
                                            + "                     fs-product=\"" + prod.productID + "\" \n"
                                            + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                            + "                </div>\n"
                                            + "                <div class=\"product-overlay\">\n"
                                            + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                            + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                            + "                </div>\n"
                                            + "          </div>\n"
                                            + "      <div class=\"product-info\">\n"
                                            + "          <h4 class=\"product-title\">\n"
                                            + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                            + "                 " + prod.productName + "\n"
                                            + "              </a>\n"
                                            + "          </h4>\n"
                                            + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                            + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                            + renderColor
                                            + "          </div>\n"
                                            + "      </div>\n"
                                            + "    </div>\n"
                                            + "</div>";
                                }
                            });
                            $("#fs-change-data-here").html(result);
                        }
                    }, 400);
                }
            });
        }


    });
    /* AJAX ON CHANGE SORT PRODUCT BY  */
    $("#fs-shop-content-sub-category").on("change", "#fs-sort-product-by", function () {
        var sortBy = $(this).val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var subCateID = $(this).attr("fs-subCategory");
        var page = 1;
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        $(".fs-page-number").removeClass("fs-page-number-active");
        $(".fs-page-number[fs-page-number='1']").addClass("fs-page-number-active");
        var numberOfProducts = parseInt($("#fs-number-of-products").text());
        var from = (page - 1) * itemPerPage + 1;
        var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
        if (to > numberOfProducts) {
            to = numberOfProducts;
        }
        var currentProductPageInfo = from + " - " + to;
        var fromPrice = $("#fs-price-from-text").text(); //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text(); //Lọc giá Product "Đến

        $.ajax({
            url: "ajax/productPaginationForSubCate.html",
            method: "POST",
            data: {
                subCateID: subCateID,
                page: page,
                itemPerPage: itemPerPage,
                sortBy: sortBy,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArrSubCate: colorFilterArrSubCate,
                sizeFilterArrSubCate: sizeFilterArrSubCate
            },
            dataType: 'JSON',
            beforeSend: function () {
                $("#fs-ajax-loading").css("display", "block");
            },
            success: function (response) {
                setTimeout(function () {
                    $("#fs-ajax-loading").css("display", "none");
                    if (response != 0) {
                        $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                        //Change product content
                        var result = "";
                        $.each(response, function (i, prod) {
                            var renderColor = "";
                            if (prod.productColorList.length > 1) {
                                $.each(prod.productColorList, function (j, color) {
                                    renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                            + "              class=\"img-responsive fs-index-color-img\" \n"
                                            + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                            + "              fs-product=\"" + prod.productID + "\" \n"
                                            + "              alt=\"" + color.urlColorImg + "\" \n"
                                            + "              title=\"" + color.color + "\"/>";
                                });
                            }

                            if (prod.productDiscount == 0) {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            } else {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            }
                        });
                        $("#fs-change-data-here").html(result);
                    }
                }, 400);
            }
        });
    });
    /* AJAX ON CHANGE NUMBER OF PRODUCT PER PAGE */
    $("#fs-shop-content-sub-category").on("change", "#fs-number-of-item-on-page", function () {
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        var page = 1;
        var subCateID = $(this).attr("fs-subCategory");
        var numberOfProducts = parseInt($("#fs-number-of-products").text());
        var numberOfPages = Math.ceil(numberOfProducts / itemPerPage);
        var fromPrice = $("#fs-price-from-text").text(); //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text(); //Lọc giá Product "Đến"

        //change productPageInfo
        var from = (page - 1) * itemPerPage + 1;
        var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
        if (to > numberOfProducts) {
            to = numberOfProducts;
        }
        var currentProductPageInfo = from + " - " + to;
        //Change pagination
        var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-subCategory=\"" + subCateID + "\">1</span></li>";
        if (numberOfPages > 1) {
            for (var i = 2; i <= numberOfPages; i++) {
                pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-subCategory=\"" + subCateID + "\">" + i + "</span></li>";
            }
        }

        //Change Product in page
        $.ajax({
            url: "ajax/productPaginationForSubCate.html",
            method: "POST",
            data: {
                subCateID: subCateID,
                page: page,
                itemPerPage: itemPerPage,
                sortBy: sortBy,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArrSubCate: colorFilterArrSubCate,
                sizeFilterArrSubCate: sizeFilterArrSubCate
            },
            dataType: 'JSON',
            beforeSend: function () {
                $("#fs-ajax-loading").css("display", "block");
            },
            success: function (response) {
                setTimeout(function () {
                    $("#fs-ajax-loading").css("display", "none");
                    if (response != 0) {
                        $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                        //Change pagination
                        $(".fs-ul-page-nav").html(pagination);
                        //Change product content
                        var result = "";
                        $.each(response, function (i, prod) {
                            var renderColor = "";
                            if (prod.productColorList.length > 1) {
                                $.each(prod.productColorList, function (j, color) {
                                    renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                            + "              class=\"img-responsive fs-index-color-img\" \n"
                                            + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                            + "              fs-product=\"" + prod.productID + "\" \n"
                                            + "              alt=\"" + color.urlColorImg + "\" \n"
                                            + "              title=\"" + color.color + "\"/>";
                                });
                            }

                            if (prod.productDiscount == 0) {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            } else {
                                result += "<div class=\"col-md-4 col-sm-6\">\n"
                                        + "     <div class=\"product-item\">\n"
                                        + "          <div class=\"item-thumb\">\n"
                                        + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                        + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                        + "                    class=\"img-responsive\" \n"
                                        + "                    alt=\"" + prod.urlImg + "\"\n"
                                        + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                        + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                        + "                     data-toggle=\"modal\" \n"
                                        + "                     fs-product=\"" + prod.productID + "\" \n"
                                        + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                        + "                </div>\n"
                                        + "                <div class=\"product-overlay\">\n"
                                        + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                        + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                        + "                </div>\n"
                                        + "          </div>\n"
                                        + "      <div class=\"product-info\">\n"
                                        + "          <h4 class=\"product-title\">\n"
                                        + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                        + "                 " + prod.productName + "\n"
                                        + "              </a>\n"
                                        + "          </h4>\n"
                                        + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                        + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                        + renderColor
                                        + "          </div>\n"
                                        + "      </div>\n"
                                        + "    </div>\n"
                                        + "</div>";
                            }
                        });
                        $("#fs-change-data-here").html(result);
                    }
                }, 400);
            }
        });
    });
    /* FILTER PRODUCT BY PRICE */
    $("#fs-shop-content-sub-category").on("click", "#fs-btn-filter-price", function () {

        $(this).attr("fs-filter", "yes");
        var page = 1;
        var fromPrice = $("#fs-price-from").val();
        var toPrice = $("#fs-price-to").val();
        var subCateID = $("#fs-price-from").attr("fs-subCategory");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        if (fromPrice == "") {
            fromPrice = $("#fs-price-from-text").attr("fs-min-price");
        }

        if (toPrice == "") {
            toPrice = $("#fs-price-to-text").attr("fs-max-price");
        }

        if (fromPrice > toPrice) {
            $("#fs-filter-price-error").text("\"From\" Price must be less than \"To\" Price");
            $("#fs-price-from").val("");
            $("#fs-price-to").val("");
            $("#fs-price-from").focus();
        } else {
            if (fromPrice != "") {
                $("#fs-price-from-text").text(fromPrice);
            }

            if (toPrice != "") {
                $("#fs-price-to-text").text(toPrice);
            }
            $("#fs-filter-price-error").text("");
            $.ajax({
                url: "ajax/getNumberOfProductsByFilter_OfASubCategory.html",
                method: "POST",
                data: {
                    subCateID: subCateID,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    colorFilterArrSubCate: colorFilterArrSubCate,
                    sizeFilterArrSubCate: sizeFilterArrSubCate
                },
                success: function (numberOfProducts) {
                    $.ajax({
                        url: "ajax/productPaginationForSubCate.html",
                        method: "POST",
                        data: {
                            subCateID: subCateID,
                            page: page,
                            itemPerPage: itemPerPage,
                            sortBy: sortBy,
                            fromPrice: fromPrice,
                            toPrice: toPrice,
                            colorFilterArrSubCate: colorFilterArrSubCate,
                            sizeFilterArrSubCate: sizeFilterArrSubCate
                        },
                        dataType: 'JSON',
                        beforeSend: function () {
                            $("#fs-ajax-loading").css("display", "block");
                        },
                        success: function (response) {
                            setTimeout(function () {
                                $("#fs-ajax-loading").css("display", "none");
                                if (response.length == 0) {
                                    $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");
                                    //change productPageInfo
                                    var from = 0;
                                    var to = 0;

                                    var currentProductPageInfo = from + " - " + to;
                                    $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                    $(".fs-number-of-products").text(numberOfProducts);
                                } else {
                                    //Tổng số sản phẩm
                                    var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);
                                    //Change pagination
                                    var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-subCategory=\"" + subCateID + "\">1</span></li>";
                                    if (numberOfPages > 1) {
                                        for (var i = 2; i <= numberOfPages; i++) {
                                            pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-subCategory=\"" + subCateID + "\">" + i + "</span></li>";
                                        }
                                    }

                                    $(".fs-ul-page-nav").html(pagination);
                                    //change productPageInfo
                                    var from = (page - 1) * itemPerPage + 1;
                                    var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                    if (to > parseInt(numberOfProducts)) {
                                        to = parseInt(numberOfProducts);
                                    }
                                    var currentProductPageInfo = from + " - " + to;
                                    $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                    $(".fs-number-of-products").text(numberOfProducts);
                                    //Change product content
                                    var result = "";
                                    $.each(response, function (i, prod) {
                                        var renderColor = "";
                                        if (prod.productColorList.length > 1) {
                                            $.each(prod.productColorList, function (j, color) {
                                                renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                        + "              class=\"img-responsive fs-index-color-img\" \n"
                                                        + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                        + "              fs-product=\"" + prod.productID + "\" \n"
                                                        + "              alt=\"" + color.urlColorImg + "\" \n"
                                                        + "              title=\"" + color.color + "\"/>";
                                            });
                                        }

                                        if (prod.productDiscount == 0) {
                                            result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                    + "     <div class=\"product-item\">\n"
                                                    + "          <div class=\"item-thumb\">\n"
                                                    + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                    + "                    class=\"img-responsive\" \n"
                                                    + "                    alt=\"" + prod.urlImg + "\"\n"
                                                    + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                    + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                    + "                     data-toggle=\"modal\" \n"
                                                    + "                     fs-product=\"" + prod.productID + "\" \n"
                                                    + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                    + "                </div>\n"
                                                    + "                <div class=\"product-overlay\">\n"
                                                    + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                    + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                    + "                </div>\n"
                                                    + "          </div>\n"
                                                    + "      <div class=\"product-info\">\n"
                                                    + "          <h4 class=\"product-title\">\n"
                                                    + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                    + "                 " + prod.productName + "\n"
                                                    + "              </a>\n"
                                                    + "          </h4>\n"
                                                    + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                    + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                    + renderColor
                                                    + "          </div>\n"
                                                    + "      </div>\n"
                                                    + "    </div>\n"
                                                    + "</div>";
                                        } else {
                                            result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                    + "     <div class=\"product-item\">\n"
                                                    + "          <div class=\"item-thumb\">\n"
                                                    + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                    + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                    + "                    class=\"img-responsive\" \n"
                                                    + "                    alt=\"" + prod.urlImg + "\"\n"
                                                    + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                    + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                    + "                     data-toggle=\"modal\" \n"
                                                    + "                     fs-product=\"" + prod.productID + "\" \n"
                                                    + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                    + "                </div>\n"
                                                    + "                <div class=\"product-overlay\">\n"
                                                    + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                    + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                    + "                </div>\n"
                                                    + "          </div>\n"
                                                    + "      <div class=\"product-info\">\n"
                                                    + "          <h4 class=\"product-title\">\n"
                                                    + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                    + "                 " + prod.productName + "\n"
                                                    + "              </a>\n"
                                                    + "          </h4>\n"
                                                    + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                    + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                    + renderColor
                                                    + "          </div>\n"
                                                    + "      </div>\n"
                                                    + "    </div>\n"
                                                    + "</div>";
                                        }
                                    });
                                    $("#fs-change-data-here").html(result);
                                    $("#fs-price-from").val("");
                                    $("#fs-price-to").val("");
                                }
                            }, 400);
                        }
                    });
                }

            });
        }
    });
    /* FILTER PRODUCT BY COLOR */
    $("#fs-shop-content-sub-category").on("change", ".fs-color-checkbox", function () {
        if (this.checked) { //Check
            colorFilterArrSubCate.push($(this).val());
        } else { //Bỏ Check
            var index = colorFilterArrSubCate.indexOf($(this).val());
            if (index > -1) {
                colorFilterArrSubCate.splice(index, 1);
            }
        }

        var page = 1;
        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"
        var subCateID = $("#fs-price-from").attr("fs-subCategory");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        $.ajax({
            url: "ajax/getNumberOfProductsByFilter_OfASubCategory.html",
            method: "POST",
            data: {
                subCateID: subCateID,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArrSubCate: colorFilterArrSubCate,
                sizeFilterArrSubCate: sizeFilterArrSubCate
            },
            success: function (numberOfProducts) {
                $.ajax({
                    url: "ajax/productPaginationForSubCate.html",
                    method: "POST",
                    data: {
                        subCateID: subCateID,
                        page: page,
                        itemPerPage: itemPerPage,
                        sortBy: sortBy,
                        fromPrice: fromPrice,
                        toPrice: toPrice,
                        colorFilterArrSubCate: colorFilterArrSubCate,
                        sizeFilterArrSubCate: sizeFilterArrSubCate
                    },
                    dataType: 'JSON',
                    beforeSend: function () {
                        $("#fs-ajax-loading").css("display", "block");
                    },
                    success: function (response) {

                        setTimeout(function () {
                            $("#fs-ajax-loading").css("display", "none");
                            if (response.length == 0) {
                                $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");
                                //change productPageInfo
                                var from = 0;
                                var to = 0;
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                            } else {
                                //Tổng số sản phẩm
                                var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);
                                //Change pagination
                                var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-subCategory=\"" + subCateID + "\">1</span></li>";
                                if (numberOfPages > 1) {
                                    for (var i = 2; i <= numberOfPages; i++) {
                                        pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-subCategory=\"" + subCateID + "\">" + i + "</span></li>";
                                    }
                                }

                                $(".fs-ul-page-nav").html(pagination);
                                //change productPageInfo
                                var from = (page - 1) * itemPerPage + 1;
                                var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                if (to > parseInt(numberOfProducts)) {
                                    to = parseInt(numberOfProducts);
                                }
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                                //Change product content
                                var result = "";
                                $.each(response, function (i, prod) {
                                    var renderColor = "";
                                    if (prod.productColorList.length > 1) {
                                        $.each(prod.productColorList, function (j, color) {
                                            renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                    + "              class=\"img-responsive fs-index-color-img\" \n"
                                                    + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                    + "              fs-product=\"" + prod.productID + "\" \n"
                                                    + "              alt=\"" + color.urlColorImg + "\" \n"
                                                    + "              title=\"" + color.color + "\"/>";
                                        });
                                    }

                                    if (prod.productDiscount == 0) {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    } else {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    }
                                });
                                $("#fs-change-data-here").html(result);
                            }
                        }, 400);
                    }
                });
            }
        });
    });
    /* FILTER PRODUCT BY SIZE */
    $("#fs-shop-content-sub-category").on("change", ".fs-size-checkbox", function () {
        if (this.checked) { //Check
            sizeFilterArrSubCate.push($(this).val());
        } else { //Bỏ Check
            var index = sizeFilterArrSubCate.indexOf($(this).val());
            if (index > -1) {
                sizeFilterArrSubCate.splice(index, 1);
            }
        }

        var page = 1;
        var fromPrice = $("#fs-price-from-text").text();                        //Lọc giá Product "Từ"
        var toPrice = $("#fs-price-to-text").text();                            //Lọc giá Product "Đến"
        var subCateID = $("#fs-price-from").attr("fs-subCategory");
        var sortBy = $("#fs-sort-product-by").val(); //1: Newest; 2: Low to High Price; 3: High to Low Price
        var itemPerPage = $("#fs-number-of-item-on-page").val();
        $.ajax({
            url: "ajax/getNumberOfProductsByFilter_OfASubCategory.html",
            method: "POST",
            data: {
                subCateID: subCateID,
                fromPrice: fromPrice,
                toPrice: toPrice,
                colorFilterArrSubCate: colorFilterArrSubCate,
                sizeFilterArrSubCate: sizeFilterArrSubCate
            },
            success: function (numberOfProducts) {
                $.ajax({
                    url: "ajax/productPaginationForSubCate.html",
                    method: "POST",
                    data: {
                        subCateID: subCateID,
                        page: page,
                        itemPerPage: itemPerPage,
                        sortBy: sortBy,
                        fromPrice: fromPrice,
                        toPrice: toPrice,
                        colorFilterArrSubCate: colorFilterArrSubCate,
                        sizeFilterArrSubCate: sizeFilterArrSubCate
                    },
                    dataType: 'JSON',
                    beforeSend: function () {
                        $("#fs-ajax-loading").css("display", "block");
                    },
                    success: function (response) {

                        setTimeout(function () {
                            $("#fs-ajax-loading").css("display", "none");
                            if (response.length == 0) {
                                $("#fs-change-data-here").html("<div class='col-xs-12'><h1>Nothing To Show!</h1></div>");
                                //change productPageInfo
                                var from = 0;
                                var to = 0;
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                            } else {
                                //Tổng số sản phẩm
                                var numberOfPages = Math.ceil(parseInt(numberOfProducts) / itemPerPage);
                                //Change pagination
                                var pagination = "<li><span class=\"fs-page-number fs-page-number-active\" fs-page-number=\"1\" fs-subCategory=\"" + subCateID + "\">1</span></li>";
                                if (numberOfPages > 1) {
                                    for (var i = 2; i <= numberOfPages; i++) {
                                        pagination += "<li><span class=\"fs-page-number\" fs-page-number=\"" + i + "\" fs-subCategory=\"" + subCateID + "\">" + i + "</span></li>";
                                    }
                                }
                                $(".fs-ul-page-nav").html(pagination);
                                //change productPageInfo
                                var from = (page - 1) * itemPerPage + 1;
                                var to = (page - 1) * itemPerPage + parseInt(itemPerPage);
                                if (to > parseInt(numberOfProducts)) {
                                    to = parseInt(numberOfProducts);
                                }
                                var currentProductPageInfo = from + " - " + to;
                                $(".fs-change-currentProductPageInfo").text(currentProductPageInfo);
                                $(".fs-number-of-products").text(numberOfProducts);
                                //Change product content
                                var result = "";
                                $.each(response, function (i, prod) {
                                    var renderColor = "";
                                    if (prod.productColorList.length > 1) {
                                        $.each(prod.productColorList, function (j, color) {
                                            renderColor += "<img src=\"assets/images/products/colors/" + color.urlColorImg + "\" \n"
                                                    + "              class=\"img-responsive fs-index-color-img\" \n"
                                                    + "              fs-index-color-img=\"" + color.colorID + "\" \n"
                                                    + "              fs-product=\"" + prod.productID + "\" \n"
                                                    + "              alt=\"" + color.urlColorImg + "\" \n"
                                                    + "              title=\"" + color.color + "\"/>";
                                        });
                                    }

                                    if (prod.productDiscount == 0) {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    } else {
                                        result += "<div class=\"col-md-4 col-sm-6\">\n"
                                                + "     <div class=\"product-item\">\n"
                                                + "          <div class=\"item-thumb\">\n"
                                                + "               <span class=\"badge offer\">-" + prod.productDiscount + "%</span>\n"
                                                + "               <img src=\"assets/images/products/" + prod.urlImg + "\" \n"
                                                + "                    class=\"img-responsive\" \n"
                                                + "                    alt=\"" + prod.urlImg + "\"\n"
                                                + "                    fs-product-for-img=\"" + prod.productID + "\"/>\n"
                                                + "                <div class=\"overlay-rmore fa fa-search quickview fs-product-modal\" \n"
                                                + "                     data-toggle=\"modal\" \n"
                                                + "                     fs-product=\"" + prod.productID + "\" \n"
                                                + "                     fs-product-modal-color=\"" + prod.productColorList[0].colorID + "\">\n"
                                                + "                </div>\n"
                                                + "                <div class=\"product-overlay\">\n"
                                                + "                     <a href=\"#\" class=\"addcart fa fa-shopping-cart\"></a>\n"
                                                + "                     <a href=\"#\" class=\"likeitem fa fa-heart-o\"></a>\n"
                                                + "                </div>\n"
                                                + "          </div>\n"
                                                + "      <div class=\"product-info\">\n"
                                                + "          <h4 class=\"product-title\">\n"
                                                + "              <a href=\"" + prod.productID + "-" + prod.productColorList[0].colorID + "-" + prod.productNameNA + ".html\">\n"
                                                + "                 " + prod.productName + "\n"
                                                + "              </a>\n"
                                                + "          </h4>\n"
                                                + "          <span class=\"product-price\">$" + prod.price + ".00</span>\n"
                                                + "          <div class=\"item-colors\" style=\"height: 25px;\">\n"
                                                + renderColor
                                                + "          </div>\n"
                                                + "      </div>\n"
                                                + "    </div>\n"
                                                + "</div>";
                                    }
                                });
                                $("#fs-change-data-here").html(result);
                            }
                        }, 400);
                    }
                });
            }
        });
    });
    /*======================================END VINH - PRODUCT==================================================*/

    /*========================================NGAN - ORDER====================================================*/
    //Load cart in header
//    $("#cart").load("orders/ajax/cart.html");
    $.ajax({
        url: "orders/ajax/cart.html",
        method: "GET",
        dataType: 'html',
        success: function (response) {
            $("#cart").html(response).fadeIn(1000);
        }
    });

    //checkout.jsp
    //Discount in checkout.jsp
    //Load form discount in checkout
    $('#diff-discount').on("click", function () {
        $('.discount-code').toggle("slow");
    });
    $("#coupon_code").keyup(function () {
        $("#fs-checkout-discountvou-error").text("");
    });
    $("input[name=address-chose]").on("click", function () {
        var checked = $('input[name=address-chose]:checked').val();
        if (checked == "difference") {
            $('.shipping-address').css("display", "list-item");
        } else {
            $('.shipping-address').prop("style", false);
        }
    });
//    $("#discount-order").on("click", function () {
//        $(".cart-table").remove(".foot");
//        $(".cart-table").add("<tfoot class=\"foot\"></tfoot>");
//        var discountCode = $("#coupon_code").val();
//        if (discountCode == "") {
//            $("#fs-checkout-discountvou-error").text("You must enter your discount code!");
//        } else {
//            $.ajax({
//                url: "orders/ajax/discount.html",
//                method: "POST",
//                data: {discountCode: discountCode},
//                dataType: 'html',
//                success: function (response) {
//                    if (response != "error" && response != "empty") {
//                        $(".discount-ul").removeClass(".discount-inputs");
//                        $(".discount-ul").removeClass(".discount-buttons");
//                        $(".discount-ul").hide().html("<li class=\"col-md-6 col-sm-6 discount-inputs\"><div class=\"discountShow\" style=\"padding-bottom: 15px;\">\n"
//                                + "<input type=\"hidden\" id=\"discount-code-input\" name=\"discount-code-input\" value=\"" + discountCode + "\"/>\n"
//                                + "<b>Your Discount Code: " + discountCode + "</b>&nbsp<button type=\"button\" class=\"fa fa-times\" id=\"cancel-discount\"  onclick=\"enterDiscountAgain();\"></button>\n"
//                                + "</div></li>").fadeIn(1000);
//                        $(".foot").hide().html(response).fadeIn(1000);
//                    } else {
//                        $.get("orders/ajax/nodiscount.html", function (responsenodiscount) {
//                            if (response == "error") {
//                                $("#fs-checkout-discountvou-error").text("Discount Code not existed!");
//                                $(".foot").hide().html(responsenodiscount).fadeIn(1000);
//                            } else if (response == "empty") {
//                                $("#fs-checkout-discountvou-error").text("Your Discount Code is out of quantity");
//                                $(".foot").hide().html(responsenodiscount).fadeIn(1000);
//                            }
//                        });
//                    }
//                }
//            });
//        }
//    });
//    $("#cancel-discount").on("click", function () {
//        $(".discount-ul").removeClass(".discount-inputs");
//        $(".discount-ul").hide().html("<li class=\"col-md-6 col-sm-6 discount-inputs\">\n"
//                + "<label>Your Discount Code</label>\n"
//                + "<div class=\"input-box\">\n"
//                + "<p class=\"help-block\" id=\"fs-checkout-discountvou-error\"></p>\n"
//                + "<input class=\"input-text\" id=\"coupon_code\" name=\"coupon_code\" value=\"\"/>\n"
//                + "</div>\n"
//                + "</li>\n"
//                + "<li class=\"col-md-6 col-sm-6 discount-buttons\" style=\"padding-top: 27px;\">\n"
//                + "<div class=\"buttons-set\">\n"
//                + "<button style=\"height: 40px;\" type=\"button\" title=\"Apply Discount Code\" class=\"btn-black\" id=\"discount-order\" onclick=\"discountClick();\"><span><span>Apply Discount Code</span></span></button>\n"
//                + "</div></li>").fadeIn(1000);
//        $.get("orders/ajax/nodiscount.html", function (responsenodiscount) {
//            $(".foot").hide().html(responsenodiscount).fadeIn(1000);
//        });
//    });

    //Cancel Order side client in order-history-detail.jsp 
    $('#btnClientCancelOrder').on("click", function () {
        var orderID = $(this).val();
        var cancelConfirm = confirm("Are you sure to cancel this order?");
        if (cancelConfirm == true) {
            window.location = "orders/cancelorder/" + orderID + ".html";
        }
    });

    //Add to cart in product-detail.jsp
    $("#fs-product-detail-add-to-cart").on("click", function () {
        var colorID = $(".fs-product-color .fs-product-selected").find("img").attr("fs-color");
        var sizeID = $("#fs-product-size .fs-product-selected").attr("fs-size");
        var productID = $(".fs-product-detail-name").attr("fs-product-id");
        var quantity = $(".fs-input-number").val();
        if (colorID == null && sizeID == null) {
            $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                    + "<strong>YOU MUST CHOOSE COLOR AND SIZE</strong>\n"
                    + "</div>").fadeIn(1000);
        } else {
            if (colorID == null) {
                $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                        + "<strong>YOU MUST CHOOSE COLOR</strong>\n"
                        + "</div>").fadeIn(1000);
            } else if (sizeID == null) {
                $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                        + "<strong>YOU MUST CHOOSE SIZE</strong>\n"
                        + "</div>").fadeIn(1000);
            } else {
                $.ajax({
                    url: "orders/ajax/addtocart.html",
                    method: "POST",
                    data: {productID: productID, sizeID: sizeID, colorID: colorID, quantity: quantity},
                    dataType: 'html',
                    success: function (response) {
                        if (response == "3") {
                            $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                                    + "<strong>PRODUCT ERROR</strong>\n"
                                    + "</div>").fadeIn(1000);
                        } else if (response == "2") {
                            $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                                    + "<strong>COLOR AND SIZE ERROR</strong>\n"
                                    + "</div>").fadeIn(1000);
                        } else if (response == "1") {
                            $("#error-product-detail").html("<div class=\"alert alert-danger\">\n"
                                    + "<strong>NOT ENOUGH STOCK! PLEASE ENTER DIFFERENT QUANTITY</strong>\n"
                                    + "</div>").fadeIn(1000);
                        } else {
                            $("#error-product-detail").html("<div class=\"alert alert-success\">\n"
                                    + "<strong>ADD PRODUCT TO CART SUCCESSFULLY</strong>\n"
                                    + "</div>").fadeIn(1000);
                            $.ajax({
                                url: "orders/ajax/cart.html",
                                method: "GET",
                                dataType: 'html',
                                success: function (response) {
                                    $("#cart").html(response).fadeIn(1000);
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    //Add to cart in modal.jsp
    $(".fs-modal-btn-addtobag").on("click", function () {
        var colorID = $(".fs-product-modal-color .fs-product-selected").find("img").attr("fs-color");
        var sizeID = $("#fs-product-modal-size .fs-product-selected").attr("fs-size");
        var productID = $(".fs-product-name").attr("fs-product-modal-id");
        var quantity = $(".fs-modal-input-number").val();
        if (colorID == null && sizeID == null) {
            $(".fs-modal-error").css("color", "red"); //green
            $(".fs-modal-error").text("YOU MUST CHOOSE COLOR AND SIZE");
        } else {
            if (colorID == null) {
                $(".fs-modal-error").css("color", "red"); //green
                $(".fs-modal-error").text("YOU MUST CHOOSE COLOR");
            } else if (sizeID == null) {
                $(".fs-modal-error").css("color", "red"); //green
                $(".fs-modal-error").text("YOU MUST CHOOSE SIZE");
            } else {
                $.ajax({
                    url: "orders/ajax/addtocart.html",
                    method: "POST",
                    data: {productID: productID, sizeID: sizeID, colorID: colorID, quantity: quantity},
                    dataType: 'html',
                    success: function (response) {
                        if (response == "3") {
                            $(".fs-modal-error").css("color", "red"); //green
                            $(".fs-modal-error").text("PRODUCT ERROR!");
                        } else if (response == "2") {
                            $(".fs-modal-error").css("color", "red"); //green
                            $(".fs-modal-error").text("COLOR AND SIZE ERROR!");
                        } else if (response == "1") {
                            $(".fs-modal-error").css("color", "red"); //green
                            $(".fs-modal-error").text("NOT ENOUGH STOCK! PLEASE ENTER DIFFERENT QUANTITY");
                        } else {
                            $(".fs-modal-error").css("color", "green"); //red
                            $(".fs-modal-error").text("ADD PRODUCT TO CART SUCCESSFULLY!");
                            $.ajax({
                                url: "orders/ajax/cart.html",
                                method: "GET",
                                dataType: 'html',
                                success: function (response) {
                                    $("#cart").html(response).fadeIn(1000);
                                }
                            });
                        }
                    }
                });
            }
        }
    });
    $(".fs-modal-close").on("click", function () {
        $(".fs-modal-error").text("");
    });
    /*==========================END NGAN - ORDER==================================*/

    /*===========================DUONG - USER===================================*/
    //THÔNG BÁO KHI CLICK VÀO ADD ADDRESS KHI VƯỢT QUÁ MỨC CHO PHÉP
    $(".fs-add-address-user").on("click", function () {
        var userID = $(this).attr("fs-userID");
        var modal = $(this).attr("fs-message");
        $.ajax({
            url: "user/address-add/" + userID + ".html",
            method: "GET",
            data: {userID: userID},
            success: function (response) {
                alert('không thể thêm address');
            }
        });
    });
    //CUỘN LẠI, HIỆN RA TABLE ADDRESS-LIST

//    $(".clickable").click(function(){
    $(".fs-panel").on("click", ".panel-heading span.clickable", function () {
        var abc = $(this);
        if (!abc.hasClass("panel-collapsed")) {
            abc.closest(".panel").find(".panel-body").slideUp();
            abc.addClass("panel-collapsed");
            abc.find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        } else {
            abc.closest(".panel").find(".panel-body").slideDown();
            abc.removeClass("panel-collapsed");
            abc.find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }
    });
    $(".fs-panel-add").on("click", ".panel-heading span.clickable", function () {
        var abc = $(this);
        if (!abc.hasClass("panel-collapsed")) {
            abc.closest(".panel").find(".panel-body").slideUp();
            abc.addClass("panel-collapsed");
            abc.find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        } else {
            abc.closest(".panel").find(".panel-body").slideDown();
            abc.removeClass("panel-collapsed");
            abc.find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }
    });
    $(".panel-heading span.clickable").click();
    // CẢNH CÁO KHI BẤM XÓA
    
    $("#fs-td-AD").click(function(){
        var addressID = $(this).attr("fs-addressID");
        alert(addressID);
    });
    
    $("#fs-delete-button-AD").click(function () {
         var addressID = $("#fs-delete-button-AD").attr("fs-addressID");
           
            

//        swal({
//            title: "Are you sure?",
//            text: "You will sure delete record this",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            cancelButtonText: "No, cancel!",
//            closeOnConfirm: false
////            closeOnCancel: false
//        },
//        function (isConfirm) {
//            if (isConfirm)
////                swal("Done!", "It was succesfully deleted!", "success");
//                $.ajax({
//                url: "user/deleteAddress.html",
//                method: "POST",
//                data: {addressID: addressID},
//                success: function (response) {
////                    if (response == "1") {
//                        swal("Deleted!", "Your imaginary file has been deleted.", "success");
////                    }
//                }
////                return;
//           
//
////            $.ajax({
////                url: "user/deleteAddress" + addressID + ".html",
////                method: "POST",
////                data: {addressID: addressID},
////                success: function (response) {
////                    if (response == "1") {
////                        swal("Deleted!", "Your imaginary file has been deleted.", "success");
////                    }
////                }
////                                        , error: function (xhr, ajaxOptions, thrownError) {
////                                swal("Error deleting!", "Please try again", "error");
////                                }
////                                });
//
////                        else {
////                swal("Cancelled", "Your imaginary file is safe :)", "error");
//
//            });
//
//
//    });
        });
        
        

            
    // BẮT LỖI FORM LOGIN USER MODAL

    function checkEmail(email) {
        email = $("#fs-email-login-user").val();
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        if (email == "") {
            $("#fs-email-login-user-error").text("Email cannot be empty!");
            $("#fs-email-login-user").focus();
            var div = $("#fs-email-login-user").closest("div.fs-email-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (!pattern.test(email)) {
            $("#fs-email-login-user-error").text("Please enter valid Email!");
            $("#fs-email-login-user").focus();
            var div = $("#fs-email-login-user").closest("div.fs-email-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
            $("#fs-email-login-user-error").text("");
            var div = $("#fs-email-login-user").closest("div.fs-email-user");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-login-user").remove();
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    // VALIDATION CLICK BUTTON LOGIN

    $(".fs-button-login-user").click(function (e) {
        e.preventDefault();
        var email = $("#fs-email-login-user").val();
        var pass = $("#fs-pass-login-user").val();

        if (!checkEmail(email)) {
            return false;
        } else if (pass == "") { // => đúng là pass != ==
            $("#fs-pass-login-user-error").text("Password cannot be empty!");
            $("#fs-pass-login-user").focus();
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (pass.length < 6 || pass.length > 100) { //=> đúng là  <=6 pass.length < 100 
            $("#fs-pass-login-user-error").text("Password 6 to 100 characters!");
            $("#fs-pass-login-user").focus();
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
//            $("#fs-form-login-user").submit();
            $("#fs-pass-login-user-error").text("");
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-login-user").remove();
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            $.ajax({
                url: "user/login.html",
                method: "POST",
                data: {email: email, password: pass},
                //dataType: 'html',
                success: function (response) {
                    if (response == "2") {
                        EmailWrong(email);
                    } else if (response == "3") {
                        PassWrong(pass);
                    } else if(response == "4"){
                        $("#fs-error-show").text("Fail account wrong!");
                    } 
                    else {
                        var currentUrl = window.location.href;
                        window.location = currentUrl;
                        $("#loginModal").modal('hide');
                    }
                }
            });
            return true;
        }
    });
    function EmailWrong(email) {
        email = $("#fs-email-login-user").val();
        if ($("#loginModal").modal('show')) {
            $("#fs-error-show").text("Email is wrong!");
//            $("#fs-email-login-user").focus();
            var div = $("#fs-email-login-user").closest("div.fs-email-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
    }

    function PassWrong(password) {
        password = $("#fs-pass-login-user").val();
        if ($("#loginModal").modal('show')) {
            $("#fs-error-show").text("Password is wrong!");
//            $("#fs-pass-login-user").focus();
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
    }

    // VALIDATION KEYUP 

    $("#fs-email-login-user").keyup(function () {
        var email = $("#fs-email-login-user").val();
//        $("#fs-error-show").text("");
        if (!checkEmail(email)) {
            return false;
        }
    });
    $("#fs-pass-login-user").keyup(function () {
        var pass = $("#fs-pass-login-user").val();
//        $("#fs-error-show").text("");
        if (pass == "") {
            $("#fs-pass-login-user-error").text("Password cannot be empty!");
            $("#fs-pass-login-user").focus();
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (pass.length < 6 || pass.length > 100) {
            $("#fs-pass-login-user-error").text("Password 6 to 100 characters!");
            $("#fs-pass-login-user").focus();
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-success");
            $("#glypcn-fs-login-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }


        else {
            $("#fs-pass-login-user-error").text("");
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-login-user").remove();
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    });

    // BẮT VALIDATION TRÊN FORM CREATE

    function checkemail(email) {
        email = $("#fs-create-email").val();
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        if (email == "") {
            $("#fs-email-create-user-error").text("Email cannot be empty!");
            $("#fs-create-email").focus();
            var div = $("#fs-create-email").closest("div.fs-email-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (!pattern.test(email)) {
            $("#fs-email-create-user-error").text("Please enter valid Email!");
            $("#fs-create-email").focus();
            var div = $("#fs-create-email").closest("div.fs-email-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
            $("#fs-email-create-user-error").text("");
            var div = $("#fs-create-email").closest("div.fs-email-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkPass(password) {
        password = $("#password").val();
        if (password == "") {
            $("#fs-pass-create-user-error").text("Password cannot be empty!");
            $("#password").focus();
            var div = $("#password").closest("div.fs-password-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (password.length < 6 || password.length > 100) {
            $("#fs-pass-create-user-error").text("Password 6 to 100 characters!");
//            $("#password").focus();
            var div = $("#password").closest("div.fs-password-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-pass-create-user-error").text("");
            var div = $("#password").closest("div.fs-password-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkRePass(repassword, password) {
        repassword = $("#Repassword").val();
        password = $("#password").val();
        if (repassword == "") {
            $("#fs-repass-create-user-error").text("Repassword cannot be empty!");
            $("#Repassword").focus();
            var div = $("#Repassword").closest("div.fs-repassword-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (repassword.length < 6 || repassword.length > 100) {
            $("#fs-repass-create-user-error").text("Password 6 to 100 characters!");
//            $("#Repassword").focus();
            var div = $("#Repassword").closest("div.fs-repassword-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (repassword != password) {
            $("#fs-repass-create-user-error").text("Repassword is not the same as password!");
//            $("#Repassword").focus();
            var div = $("#Repassword").closest("div.fs-repassword-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-repass-create-user-error").text("");
            var div = $("#Repassword").closest("div.fs-repassword-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkFirstName(firstname) {
        firstname = $("#fs-create-firstname").val();
        if (firstname == "") {
            $("#fs-fname-create-user-error").text("First Name cannot be empty!");
            $("#fs-create-firstname").focus();
            var div = $("#fs-create-firstname").closest("div.fs-firstname-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (firstname.length < 2 || firstname.length > 50) {
            $("#fs-fname-create-user-error").text("First Name 2 to 50 characters!");
//            $("#fs-create-firstname").focus();
            var div = $("#fs-create-firstname").closest("div.fs-firstname-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-fname-create-user-error").text("");
            var div = $("#fs-create-firstname").closest("div.fs-firstname-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkLastName(lastname) {
        lastname = $("#fs-create-lastname").val();
        if (lastname == "") {
            $("#fs-lname-create-user-error").text("Last Name cannot be empty!");
            $("#fs-create-lastname").focus();
            var div = $("#fs-create-lastname").closest("div.fs-lastname-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (lastname.length < 2 || lastname.length > 50) {
            $("#fs-lname-create-user-error").text("Last Name 2 to 50 characters!");
//            $("#fs-create-lastname").focus();
            var div = $("#fs-create-lastname").closest("div.fs-lastname-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-lname-create-user-error").text("");
            var div = $("#fs-create-lastname").closest("div.fs-lastname-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkBirthDay(birthday) {
        birthday = $("#txtBirthday").val();
        if (birthday == "") {
            $("#fs-bday-create-user-error").text("BirthDay cannot be empty!");
            $("#txtBirthday").focus();
            var div = $("#txtBirthday").closest("div.fs-birthday-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-bday-create-user-error").text("");
            var div = $("#txtBirthday").closest("div.fs-birthday-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkPhone(phone) {
//        var regex = new RegExp(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
        var regex = new RegExp(/^(01[2689]|09)[0-9]{8}$/);
        phone = $("#fs-create-phone").val();
        if (phone == "") {
            $("#fs-phone-create-user-error").text("Phone cannot be empty!");
            $("#fs-create-phone").focus();
            var div = $("#fs-create-phone").closest("div.fs-phone-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (!regex.test(phone)) {
            $("#fs-phone-create-user-error").text("Please enter valid phone!");
            $("#fs-create-phone").focus();
            var div = $("#fs-create-phone").closest("div.fs-phone-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-phone-create-user-error").text("");
            var div = $("#fs-create-phone").closest("div.fs-phone-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }

    }

    function checkAddress(address) {
        address = $("#fs-create-address").val();
        if (address == "") {
            $("#fs-address-create-user-error").text("Address cannot be empty!");
            $("#fs-create-address").focus();
            var div = $("#fs-create-address").closest("div.fs-address-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (address.length < 10 || address.length > 255) {
            $("#fs-address-create-user-error").text("Address has 10 - 255 characters!");
            $("#fs-create-address").focus();
            var div = $("#fs-create-address").closest("div.fs-address-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-address-create-user-error").text("");
            var div = $("#fs-create-address").closest("div.fs-address-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    $("body").on("click", "#fs-button-create-user", function (e) {
        e.preventDefault();
        console.log("123");
        var email = $("#fs-create-email").val();
        var password = $("#password").val();
        var repassword = $("#Repassword").val();
        var firstname = $("#fs-create-firstname").val();
        var lastname = $("#fs-create-lastname").val();
        var birthday = $("#txtBirthday").val();
        var gender = $('input[name="gender"]:checked').val();
        var phone = $("#fs-create-phone").val();
        var address = $("#fs-create-address").val();
        var formData = new FormData();
        var mfile = $("#fs-upImage")[0].files[0];
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("gender", gender);
        formData.append("birthday", birthday);
        formData.append("upImage", mfile);
        formData.append("phoneNumber", phone);
        formData.append("address", address);
        
        if (!checkemail(email)) {
            return false;
        } else if (!checkPass(password)) {
            return false;
        } else if (!checkRePass(repassword, password)) {
            return false;
        } else if (!checkFirstName(firstname)) {
            return true;
        } else if (!checkLastName(lastname)) {
            return false;
        } else if (!checkBirthDay(birthday)) {
            return false;
        } 
        else {      
        $.ajax({
            url: "user/register.html",
            method: "POST",
            //data: $("#fs-form-create-user").serialize(),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            //dataType: 'html',
            success: function (response) {
                console.log(response);
                if (response == "1") {
                    $("#loginModal").modal('hide');
                    window.location = "index.html";
                } else if (response == "2") {
                    $("#loginModal").modal('hide');
                    setTimeout(function ()
                    {
                        emailWrong(email);
                        $("#loginModal").modal('show');
                    }, 5000);
                    swal({
                        title: "Account is Exist!",
                        text: "",
                        timer: 2000,
                        type: "error",
                        showConfirmButton: false
                    });
                } else if (response == "0") {
                    $("#loginModal").modal('hide');
                    setTimeout(function ()
                    {
                        $("#loginModal").modal('show');
                    }, 5000);
                    swal({
                        title: "FAIL!",
                        text: "",
                        timer: 2000,
                        type: "error",
                        showConfirmButton: false
                    });
                }

            }
        });
        }
    });
//        VALIDATION REGISTER KEYUP

    $("#fs-create-email").keyup(function () {
        var email = $("#fs-create-email").val();
        if (!checkemail(email)) {
            return false;
        }
    });
    $("#password").keyup(function () {
        var password = $("#password").val();
        if (!checkPass(password)) {
            return false;
        }
    });
    $("#Repassword").keyup(function () {
        var repassword = $("#Repassword").val();
        var password = $("#password").val();
        if (!checkRePass(repassword, password)) {
            return false;
        }
    });
    $("#fs-create-firstname").keyup(function () {
        var firstname = $("#fs-create-firstname").val();
        if (!checkFirstName(firstname)) {
            return false;
        }
    });
    $("#fs-create-lastname").keyup(function () {
        var lastname = $("#fs-create-lastname").val();
        if (!checkLastName(lastname)) {
            return false;
        }
    });
    $("#txtBirthday").keyup(function () {
        var birthday = $("#txtBirthday").val();
        if (!checkBirthDay(birthday)) {
            return false;
        }
    });
    $("#fs-create-phone").keyup(function () {
        var phone = $("#fs-create-phone").val();
        if (!checkPhone(phone)) {
            return false;
        }
    });
    $("#fs-create-address").keyup(function () {
        var address = $("#fs-create-address").val();
        if (!checkAddress(address)) {
            return false;
        }
    });

//    BẮT VALIDATION CẬP NHẬT THÔNG TIN CÁ NHÂN     

    $("#txtbirthday").click(function () {
        $("#txtbirthday").datepicker({
            dateFormat: "dd/mm/yy",
            showAnim: "drop",
            changeMonth: true,
            changeYear: true,
            yearRange: "1960:1999"
        }
        );
    });
    // BẮT VỚI UPDATE ACCOUNT CLICK



    function emailcheck(email) {
        email = $("#fs-update-email").val();
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        if (email == "") {
            $("#fs-email-update-user-error").text("Email cannot be empty!");
            $("#fs-update-email").focus();
            var div = $("#fs-update-email").closest("div.fs-email-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (!pattern.test(email)) {
            $("#fs-email-update-user-error").text("Please enter valid Email!");
//            $("#fs-create-email").focus();
            var div = $("#fs-update-email").closest("div.fs-email-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
            $("#fs-email-update-user-error").text("");
            var div = $("#fs-update-email").closest("div.fs-email-update");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-update-user").remove();
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checkfirstName(firstname) {
        firstname = $("#fs-update-firstname").val();
        if (firstname == "") {
            $("#fs-firstname-update-user-error").text("First Name cannot be empty!");
            $("#fs-update-firstname").focus();
            var div = $("#fs-update-firstname").closest("div.fs-firstname-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (firstname.length < 2 || firstname.length > 50) {
            $("#fs-firstname-update-user-error").text("First Name 2 to 50 characters!");
//            $("#fs-create-firstname").focus();
            var div = $("#fs-update-firstname").closest("div.fs-firstname-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-firstname-update-user-error").text("");
            var div = $("#fs-update-firstname").closest("div.fs-firstname-update");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-update-user").remove();
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    function checklastName(lastname) {
        lastname = $("#fs-update-lastname").val();
        if (lastname == "") {
            $("#fs-lastname-update-user-error").text("Last Name cannot be empty!");
            $("#fs-update-lastname").focus();
            var div = $("#fs-update-lastname").closest("div.fs-lastname-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (lastname.length < 2 || lastname.length > 50) {
            $("#fs-lastname-update-user-error").text("Last Name 2 to 50 characters!");
//            $("#fs-create-lastname").focus();
            var div = $("#fs-update-lastname").closest("div.fs-lastname-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-lastname-update-user-error").text("");
            var div = $("#fs-update-lastname").closest("div.fs-lastname-update");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-update-user").remove();
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }


    function checkbirthDay(birthday) {
        birthday = $("#txtbirthday").val();
        if (birthday == "") {
            $("#fs-birthday-update-user-error").text("BirthDay cannot be empty!");
            $("#txtbirthday").focus();
            var div = $("#txtbirthday").closest("div.fs-birthday-update");
            div.removeClass("has-success");
            $("#glypcn-fs-update-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-birthday-update-user-error").text("");
            var div = $("#txtbirthday").closest("div.fs-birthday-update");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-update-user").remove();
            div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }

    $(".fs-button-update-user").click(function (e) {
        var email = $("#fs-update-email").val();
        var firstname = $("#fs-update-firstname").val();
        var lastname = $("#fs-update-lastname").val();
        var birthday = $("#txtbirthday").val();
        e.preventDefault();
        if (!emailcheck(email)) {
            return false;
        } else if (!checkfirstName(firstname)) {
            return false;
        } else if (!checklastName(lastname)) {
            return false;
        } else if (!checkbirthDay(birthday)) {
            return false;
        } else {
            $("#fs-form-update-account").submit();
        }
    });



    // VALIDATION KEYUP UPDATE-ACCOUNT

    $("#fs-update-email").keyup(function () {
        var email = $("#fs-update-email").val();
        if (!emailcheck(email)) {
            return false;
        }
    });
    // BẮT EMAIL TRÙNG:

    $("#fs-update-email").keyup(function () {
        var email = $("#fs-update-email").val();
        $.ajax({
            url: "ajax/emailExist.html",
            method: "POST",
//            data: {email: email},
            dataType: "JSON",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    if (email == item) {
                        $("#fs-email-update-user-error").text("Email is Exist!");
                        $("#fs-update-email").focus();
                        var div = $("#fs-update-email").closest("div.fs-email-update");
                        div.removeClass("has-success");
                        $("#glypcn-fs-update-user").remove();
                        div.addClass("has-error has-feedback");
                        div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
                        return false;
                    } 
//                    else {
//                        $("#fs-email-update-user-error").text("");
//                        var div = $("#fs-update-email").closest("div.fs-email-update");
//                        div.removeClass("has-error");
//                        div.addClass("has-success has-feedback");
//                        $("#glypcn-fs-update-user").remove();
//                        div.append('<span id="glypcn-fs-update-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
//                        return true;
//                    }

                }
            }
        });
    });
    $("#fs-update-firstname").keyup(function () {
        var firstname = $("#fs-update-firstname").val();
        if (!checkfirstName(firstname)) {
            return false;
        }
    });
    $("#fs-update-lastname").keyup(function () {
        var lastname = $("#fs-update-lastname").val();
        if (!checklastName(lastname)) {
            return false;
        }
    });
    $("#fs-update-lastname").keyup(function () {
        var lastname = $("#fs-update-lastname").val();
        if (!checklastName(lastname)) {
            return false;
        }
    });
//    $("#txtbirthday").keyup(function () {
//        var birthday = $("#txtbirthday").val();
//        if (!checkbirthDay(birthday)) {
//            return false;
//        }
//    });
    


    /*===========================END DUONG - USER===================================*/

    /*========================================END DUONG - USER====================================================*/

    /*========================================THANH - BLOG====================================================*/
    var mincount = 2;
    var maxcount = 4;
    $(".image-gallery-ul li").slice(2).hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 350) {
            $(".image-gallery-ul li").slice(mincount, maxcount).fadeIn(2000);
            mincount = mincount + 2;
            maxcount = maxcount + 2;
        }
    });
    /*========================================END THANH - BLOG====================================================*/

});

