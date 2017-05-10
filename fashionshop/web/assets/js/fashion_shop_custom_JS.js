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
        changeYear: true
    });

    $("#account-create-new").hide();
    $("#btnCreate").click(function () {
        $("#account-id").hide("drop", {direction: "down"}, 500, function () {
            $("#account-id2").hide("fold");
            $(this).parents("#fs-form-area").addClass('col-sm-9 col-md-9').removeClass('col-sm-8 col-md-8');
            $("#account-create-new").show("drop", {direction: "up"}, 2000);
        });
    });

    /* --------------- PRODUCT INDEX -------------------- */
    /* LOAD IMG TO RECENT VIEW FROM LOCALSTORAGE */
    // Check browser support
    if (typeof (Storage) !== "undefined") {
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
        loop:true,
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
                    .addClass("synced")
            if ($(".sync2").data("owlCarousel") !== undefined) {
                center(current)
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
                if (num === sync2visible[i]) {
                    found = true;
                }
            }

            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
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
                $("h3.fs-product-name").attr("fs-product-id", productID);
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
                    if (item.status !== 0) {
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
                    if (item.quantity === 0) {
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
        var action = $(this).attr("data-type");
        var currentVal = parseInt($(".fs-modal-input-number").val());
        if (!isNaN(currentVal)) {
            if (action === "minus") {
                if (currentVal > $(".fs-modal-input-number").attr("min")) {
                    $(".fs-modal-input-number").val(currentVal - 1).change();
                }
                if (parseInt($(".fs-modal-input-number").val()) == $(".fs-modal-input-number").attr("min")) {
                    $(".fs-modal-btn-quantity-minus").attr("disabled", "disabled");
                }

            } else if (action === "plus") {
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
        $(this).data("oldVal", $(this).val()); //Lấy value từ input, lưu vào key "oldValue"
    });

    $(".fs-modal-input-number").on("change", function () {
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
        var press = e.keyCode || e.which;
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(press, [46, 8, 9, 27, 190, 17]) !== -1) {
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
                    if (item.status !== 0) {
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
                    if (item.quantity === 0) {
                        str_change_size += "<div class=\"fs-particular-size fs-unselectable\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    } else {
                        str_change_size += "<div onclick=\"sizeImageClick(" + item.sizeID + ");\" class=\"fs-particular-size\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                    }
                });
                $("#fs-product-size").hide().html(str_change_size).fadeIn(1000);
            }
        });
    });

    /* EVENT CLICK WHEN CHOOSE SIZE */
    $(document).on("click", ".fs-particular-size", function () {
        var classList = $(this).attr("class").split(" ");
        var rs = $.inArray("fs-unselectable", classList);
        if (rs === -1) {
            $(".fs-particular-size").removeClass("fs-product-selected");
            $(this).addClass("fs-product-selected");
        }
    });

    /* EVENT INCREASE OR DECREASE QUANTITY */
    $(".fs-btn-number").click(function () {
        var action = $(this).attr("data-type");
        var currentVal = parseInt($(".fs-input-number").val());
        if (!isNaN(currentVal)) {
            if (action === "minus") {
                if (currentVal > $(".fs-input-number").attr("min")) {
                    $(".fs-input-number").val(currentVal - 1).change();
                }
                if (parseInt($(".fs-input-number").val()) == $(".fs-input-number").attr("min")) {
                    $(".fs-btn-quantity-minus").attr("disabled", "disabled");
                }

            } else if (action === "plus") {
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
        $(this).data("oldValue", $(this).val()); //Lấy value từ input, lưu vào key "oldValue"
    });

    $(".fs-input-number").on("change", function () {
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
    $(".shop-content").on("click", ".fs-page-number", function () {
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
    $(".shop-content").on("change", "#fs-sort-product-by", function () {
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
    $(".shop-content").on("change", "#fs-number-of-item-on-page", function () {
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
    $(".shop-content").on("click", "#fs-btn-filter-price", function () {

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
    $('.fs-color-checkbox').change(function () {
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
    $('.fs-size-checkbox').change(function () {
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
    /*========================================NGAN - ORDER====================================================*/
    //Load cart in header
    $("#cart").load("orders/ajax/cart.html");

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
        if (checked === "difference") {
            $('.shipping-address').css("display", "list-item");
        } else {
            $('.shipping-address').prop("style", false);
        }
    });
//    $("#discount-order").on("click", function () {
//        $(".cart-table").remove(".foot");
//        $(".cart-table").add("<tfoot class=\"foot\"></tfoot>");
//        var discountCode = $("#coupon_code").val();
//        if (discountCode === "") {
//            $("#fs-checkout-discountvou-error").text("You must enter your discount code!");
//        } else {
//            $.ajax({
//                url: "orders/ajax/discount.html",
//                method: "POST",
//                data: {discountCode: discountCode},
//                dataType: 'html',
//                success: function (response) {
//                    if (response !== "error" && response !== "empty") {
//                        $(".discount-ul").removeClass(".discount-inputs");
//                        $(".discount-ul").removeClass(".discount-buttons");
//                        $(".discount-ul").hide().html("<li class=\"col-md-6 col-sm-6 discount-inputs\"><div class=\"discountShow\" style=\"padding-bottom: 15px;\">\n"
//                                + "<input type=\"hidden\" id=\"discount-code-input\" name=\"discount-code-input\" value=\"" + discountCode + "\"/>\n"
//                                + "<b>Your Discount Code: " + discountCode + "</b>&nbsp<button type=\"button\" class=\"fa fa-times\" id=\"cancel-discount\"  onclick=\"enterDiscountAgain();\"></button>\n"
//                                + "</div></li>").fadeIn(1000);
//                        $(".foot").hide().html(response).fadeIn(1000);
//                    } else {
//                        $.get("orders/ajax/nodiscount.html", function (responsenodiscount) {
//                            if (response === "error") {
//                                $("#fs-checkout-discountvou-error").text("Discount Code not existed!");
//                                $(".foot").hide().html(responsenodiscount).fadeIn(1000);
//                            } else if (response === "empty") {
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

    //Cart in modal.jsp
    $(".fs-modal-btn-addtobag").on("click", function () {
        var colorID = $(".fs-product-modal-color .fs-product-selected").find("img").attr("fs-color");
        var sizeID = $("#fs-product-modal-size .fs-product-selected").attr("fs-size");
        var productID = $(".fs-product-name").attr("fs-product-id");
        var quantity = $(".fs-modal-input-number").val();
        if (colorID == null && sizeID == null) {
            $(".fs-modal-error").css("color", "red"); //green
            $(".fs-modal-error").text("YOU MUST CHOOSE COLOR AND SIZE");
        } else {
            if (colorID == null) {
                $(".fs-modal-error").css("color", "red"); //green
                $(".fs-modal-error").text("YOU MUST CHOOSE COLOR");
            }
            if (sizeID == null) {
                $(".fs-modal-error").css("color", "red"); //green
                $(".fs-modal-error").text("YOU MUST CHOOSE SIZE");
            }
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
                        $("#cart").load("orders/ajax/cart.html");
                    }
                }
            });
        }
    });
    $(".fs-modal-close").on("click", function () {
        $(".fs-modal-error").text("");
    });
    /*======================================END NGAN - ORDER==================================================*/

    /*========================================DUONG - USER====================================================*/
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


//    fs-add-address-user

    /*========================================END DUONG - USER====================================================*/
});

