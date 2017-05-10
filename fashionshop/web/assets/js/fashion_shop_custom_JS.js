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
                    .addClass("synced");
            if ($(".sync2").data("owlCarousel") !== undefined) {
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

    $("#coupon_code").keyup(function () {
        $("#fs-checkout-discountvou-error").text("");
    });
    /*======================================END NGAN - ORDER==================================================*/

    /*========================================DUONG - USER====================================================*/
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

    $("#fs-delete-button-AD").click(function () {
        swal({
            title: "Are you sure?",
            text: "You will sure delete record this",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    });

    // BẮT LỖI FORM LOGIN USER MODAL

    function checkEmail(email) {
        email = $("#fs-email-login-user").val();
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        if (email === "") {
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
        }

        else if (pass === "") {
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
//        else if(!checkLOGIN(email,pass)){
//            return false;
//        }
        else {
            $("#fs-form-login-user").submit();
            $("#fs-pass-login-user-error").text("");
            var div = $("#fs-pass-login-user").closest("div.fs-pass-user");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-login-user").remove();
            div.append('<span id="glypcn-fs-login-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    });

    // Test thử
    
//        function checkLOGIN(email,pass){
//        $.ajax({
//            url: "user/checkLog.html",
//            method: "POST",
//            data: {email: email},
//            dataType: "JSON",
//            success: function (response) {
//                if(email === response.email){
//                    if(pass === response.password){
//                        return true;
//                    }else{
//                        alert("sai");
//                        return false;
//                    }
//            }else{
//                    alert("sai email");
//                    return false;
//            }
//            }
//    });
//    
//    }
    
    // VALIDATION KEYUP 

    $("#fs-email-login-user").keyup(function () {
        var email = $("#fs-email-login-user").val();
       
        if (!checkEmail(email)) {
            return false;
        }
    });

    $("#fs-pass-login-user").keyup(function () {
        var pass = $("#fs-pass-login-user").val();

        if (pass === "") {
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
    
    function checkPass(password){
        password = $("#fs-create-password").val();
        
        if (password === "") {
            $("#fs-pass-create-user-error").text("Password cannot be empty!");
            $("#fs-create-password").focus();
            var div = $("#fs-create-password").closest("div.fs-password-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;

        } else if (password.length < 6 || password.length > 100) {
            $("#fs-pass-create-user-error").text("Password 6 to 100 characters!");
            $("#fs-create-password").focus();
             var div = $("#fs-create-password").closest("div.fs-password-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-pass-create-user-error").text("");
            var div = $("#fs-create-password").closest("div.fs-password-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }
    
    function checkRePass(repassword){
        repassword = $("#fs-create-repassword").val();
        
        if (repassword === "") {
            $("#fs-repass-create-user-error").text("Repassword cannot be empty!");
            $("#fs-create-repassword").focus();
            var div = $("#fs-create-repassword").closest("div.fs-repassword-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;

        } else if (repassword.length < 6 || repassword.length > 100) {
            $("#fs-repass-create-user-error").text("Password 6 to 100 characters!");
            $("#fs-create-repassword").focus();
            var div = $("#fs-create-repassword").closest("div.fs-repassword-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-repass-create-user-error").text("");
            var div = $("#fs-create-repassword").closest("div.fs-repassword-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }
    
    function checkFirstName(firstname){
        firstname = $("#fs-create-firstname").val();
        
        if (firstname === "") {
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
            $("#fs-create-firstname").focus();
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
    
    function checkLastName(lastname){
        lastname = $("#fs-create-lastname").val();
        
        if (lastname === "") {
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
            $("#fs-create-lastname").focus();
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
    
    function checkBirthDay(birthday){
        birthday = $("#fs-create-birthday").val();
        
        if (birthday === "") {
            $("#fs-bday-create-user-error").text("BirthDay cannot be empty!");
            $("#fs-create-birthday").focus();
            var div = $("#fs-create-birthday").closest("div.fs-birthday-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;

        } 
        else {
            $("#fs-bday-create-user-error").text("");
            var div = $("#fs-create-birthday").closest("div.fs-birthday-create");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-create-user").remove();
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    }
    
    function checkPhone(phone){
//        var regex = new RegExp(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
        var regex = new RegExp(/[^ \-\.]^(01[2689]|09)[0-9]{8}$/);
        phone = $("#fs-create-phone").val();
        
        if (phone === "") {
            $("#fs-phone-create-user-error").text("Phone cannot be empty!");
            $("#fs-create-phone").focus();
            var div = $("#fs-create-phone").closest("div.fs-phone-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;

        } else if(!regex.test(phone)){
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
    
    function checkAddress(address){
        address = $("#fs-create-address").val();
        
        if (address === "") {
            $("#fs-address-create-user-error").text("Address cannot be empty!");
            $("#fs-create-address").focus();
            var div = $("#fs-create-address").closest("div.fs-address-create");
            div.removeClass("has-success");
            $("#glypcn-fs-create-user").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-create-user" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;

        } else if(address.length < 10 || address.length > 255){
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
    
    $("#fs-form-create-user").click(function(e){
        
    });
    
    
    
//    $(".fs-button-login-user").click(function(){
////        e.preventDefault();
//       $.ajax({
//            url: "user/login.html",
//            method: "POST",
////            data: {userID: userID},
//            success: function (response) {
//                alert("a");
//            }
//        });
//            
//    });

    // HIỆN THỊ MODAL BOOTSTRAP UPDATE

//    $(".fs-update-button").click(function (){
//        $("#ADModal").modal("show");
//    });
    // Modal BootStrap Tab LOGIN, REGISTER

//    $(".nav-tabs").on("click","")


//$("#txtaddress").keyup(function () {
//        var address = $("txtaddress").val();
//        var userID = $(this).attr("fs-userID");
//
//        $.ajax({
//            url: "user/address-add/" + userID + ".html",
//            method: "POST",
//            data: {userID: userID, address: address},
//            success: function (response) {
//                alert('trùng địa chỉ');
//            }
//        });
//
//    });
//    
//    $("#txtphone").keyup(function () {
//        var phone = $("txtphone").val();
//        var userID = $(this).attr("fs-userID");
//
//        $.ajax({
//            url: "user/address-add/" + userID + ".html",
//            method: "POST",
//            data: {userID: userID, phone: phone},
//            success: function (response) {
//                alert('trùng số điện thoại');
//            }
//        });
//
//    });
//    
//    $("form:form").submit(function( event ){
//        if($("#txtaddress").keyup() && $("#txtphone").keyup()){
//            $("span").text("trùng address").show();
//            return; 
//        }
//        
//        event.preventDefault();
//        
//    });



//    fs-add-address-user

    /*========================================END DUONG - USER====================================================*/
});

