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
                var i = response.productSubImgsList.findIndex(x => x.subImgOrder == 1);
                $("img[fs-product-for-img=" + productID + "]").hide().attr("src", "assets/images/products/subImg/" + response.productSubImgsList[i].urlImg).fadeIn(600);
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

    /*========================================NGAN - ORDER====================================================*/

    $("#cart").load("orders/ajax/cart.html");
    $('#diff-discount').on("click", function () {
        $('.discount-code').toggle("slow");
    });

    /*======================================END NGAN - ORDER==================================================*/
    
    /*========================================DUONG - USER====================================================*/
    $(".fs-add-address-user").on("click", function () {
        var userID = $(this).attr("fs-userID");
        var modal = $(this).attr("fs-message"); 
        $.ajax({
            url: "user/address-add/" +userID+ ".html",
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

