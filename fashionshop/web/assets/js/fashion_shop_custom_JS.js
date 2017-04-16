/* 
 * 
 * MỌI NGƯỜI VIẾT JAVASCRIPT VÀO ĐÂY.
 * 
 * NHỚ LÀ: VIẾT CÁI GÌ, THÌ CHÚ THÍCH CÁI ĐÓ, CÔNG DỤNG ĐỂ LÀM GÌ
 * 
 */

$(document).ready(function () {
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
   
    /* PRODUCT JS AREA */
    /* SLIDE PRODUCTS IN INDEX */
    $("#isotope").isotope({
        filter: '.isotope_to_all',
        sortBy: 'random'
    });

    /* INDEX - CHANGE IMG WHEN CHOOSE COLOR */
    $(".fs-index-color-img").click(function () {
        var colorID = $(this).attr("fs-index-color-img");
        var productID = $(this).attr("fs-product");

        //Change link of product Title to productDetail
        var elementProductLink = $(this).parent().siblings("h4").find("a");
        var productLink = elementProductLink.attr("href");
        var productLinkArray = productLink.split("-");
        productLinkArray[1] = colorID;
        var newLink = productLinkArray.join("-");
        elementProductLink.attr("href", newLink);
        
        //Change color of product Modal
        $(this).parent().parent().siblings("div.item-thumb").find("div.fs-product-modal").attr("fs-product-modal-color", colorID);
        
        //Call Ajax
        $.ajax({
            url: "ajax/color.html",
            method: "POST",
            data: {colorID: colorID},
            dataType: 'json',
            success: function (response) {
                $("img[fs-product-for-img=" + productID + "]").hide().attr("src", "assets/images/products/subImg/" + response.productSubImgsList[0].urlImg).fadeIn(600);
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
    $(".fs-product-modal").click(function () {
        var productID = $(this).attr("fs-product");
        var colorID = $(this).attr("fs-product-modal-color");
        console.log("ProductID: " + productID + " colorID: " + colorID);
//        $.ajax({
//            url: "ajax/findProduct.html",
//            data: {productID: $(this).attr("fs-product")},
//            method: "POST",
//            dataType: "json",
//            success: function (response) {
//                /* Change Image */
//                var str_change_big_img = "";
//                var str_change_small_img = "";
//                $.each(response.productSubImgsList, function (i, item) {
//                    if (item.status != 0) {
//                        str_change_big_img +=   "<div class=\"item\">\n\
//                                                    <img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"/>\n\
//                                                    <a href=\"assets/images/products/subImg/" + item.urlImg + "\" rel=\"prettyPhoto[gallery2]\" title=\"Product\" class=\"caption-link\">\n\
//                                                        <i class=\"fa fa-arrows-alt\"></i>\n\
//                                                    </a>\n\
//                                                </div>";
//
//                        str_change_small_img += "<div class=\"item\">\n\
//                                                      <img src=\"assets/images/products/subImg/" + item.urlImg + "\" alt=\"" + item.urlImg + "\"/>\n\\n\
//                                                   </div>";
//                    }
//                });
//
//                var finalStr = "<div class=\"owl-carousel prod-slider sync1\">" + str_change_big_img + "</div><div class=\"owl-carousel sync2\">" + str_change_small_img + "</div>";
//
//                $("#fs-product-detail-slide-img").hide().html(finalStr).fadeIn(1000);
//                fsCreateOwlCarousel();
//            }
//        });
    });

    /* PRODUCT_DETAIL */
    /* CHANGE DATA WHEN CHOOSE A COLOR */
    $(".fs-product-color-border").click(function () {
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
                    str_change_size += "<div class=\"fs-particular-size\" fs-size=\"" + item.sizeID + "\">" + item.productSize + "</div>";
                });
                $("#fs-product-size").hide().html(str_change_size).fadeIn(1000);
            }
        });
    });

    /* EVENT CLICK WHEN CHOOSE SIZE */
    $(document).on("click", ".fs-particular-size", function () {
        $(".fs-particular-size").removeClass("fs-product-selected");
        $(this).addClass("fs-product-selected");
    });
});

