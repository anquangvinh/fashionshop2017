/* 
 * 
 * MỌI NGƯỜI VIẾT JAVASCRIPT VÀO ĐÂY.
 * 
 * NHỚ LÀ: VIẾT CÁI GÌ, THÌ CHÚ THÍCH CÁI ĐÓ, CÔNG DỤNG ĐỂ LÀM GÌ
 * 
 */

$(document).ready(function () {
    /*    
     * Cấu hình cho datatable
     */
    $('#dataTables-example').DataTable({
        responsive: true
    });

    /*==============================VINH - PRODUCT============================*/
    //Bảng datatable của product-list
    $('#productList_dataTable').DataTable({
        responsive: true,
        columnDefs: [
            {"orderable": false, "targets": [1, 2, 3, 4, 5, 6]}, //disable thuộc tính order của các cột 1,2,3,4,5,6
            {"width": "8%", "targets": 0},
            {"width": "9%", "targets": 1},
            {"width": "21%", "targets": 2},
            {"width": "20%", "targets": 3},
            {"width": "17%", "targets": 4},
            {"width": "5%", "targets": 5},
            {"width": "20%", "targets": 6}
        ],
        //Tạo DOM cho các component trong datatable
        dom: '<"row text-center"<"col-lg-4"l><"#fs_product_filter.col-lg-4"><"col-lg-4"f>><"row"<"col-lg-12">t><"row"<"col-xs-4"i><"col-xs-8"p>>',
        //Chức năng lọc theo Category và SubCategory
        initComplete: function () {
            this.api().columns(2).every(function () {
                var column = this;
                var select = $('<select class="form-control"><option value="">-- Filter by Category - SubCategory --</option></select>')
                        .appendTo($("#fs_product_filter").empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                    );

                            column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                        });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });

    /* CKEDITOR -CKFINDER IN PRODUCT CREATE */
    if ($("#fs-product-description").length) {
        var fs_product_description = CKEDITOR.replace('fs-product-description', {
            toolbar: [
                {name: 'document', items: ['Source']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace']},
                {name: 'insert', items: ['Image', 'Table', 'HorizontalRule']},
                '/',
                {name: 'styles', items: ['Format', 'Font', 'FontSize']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                '/',
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']}
            ]
        });
        CKFinder.setupCKEditor(fs_product_description, {basePath: '/fashionshop/assets/ckfinder/'});
    }

    //Multiple step ------- PRODUCT CREATE FORM
    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $("#fs-fieldset-general-info").on("click", ".next", function () {
        var cateID = $("#fs-product-category").val();
        var subCateID = $("#fs-product-subCategory").val();
        var productName = $("#fs-product-name").val();
        var price = $("#fs-product-price").val();
        var mainImg = $("#fs-product-main-img").val();
        var discount = $("#fs-product-discount").val();
        var count = 0;


        if (cateID == 0) {
            $("p#fs-select-cate-error").text("Please choose a Category!");
            $("#fs-product-category").focus();
            count++;
        } else {
            $("p#fs-select-cate-error").text("");
        }

        if (subCateID == 0) {
            $("p#fs-select-subcate-error").text("Please choose a SubCategory!");
            $("#fs-product-subCategory").focus();
            count++;
        } else {
            $("p#fs-select-subcate-error").text("");
        }

        if (productName == "") {
            $("#fs-product-name-error").text("Product Name cannot be empty!");
            $("#fs-product-name").focus();
            count++;
        } else if (productName.length < 5 || productName.length > 25) {
            $("#fs-product-name-error").text("Product Name must have 5 - 25 characters!");
            $("#fs-product-name").focus();
        } else {
            $("#fs-product-name-error").text("");
        }

        if (price == "") {
            $("#fs-product-price-error").text("Price cannot be empty!");
            $("#fs-product-price").focus();
            count++;
        } else if (isNaN(price)) {
            $("#fs-product-price-error").text("Price must be a number!");
            $("#fs-product-price").focus();
            count++;
        } else if (price < 0) {
            $("#fs-product-price-error").text("Price must be >0!.");
            $("#fs-product-price").focus();
            count++;
        } else {
            $("#fs-product-price-error").text("");
        }

        if (discount == "") {
            $("#fs-product-discount-error").text("Discount cannot be empty!");
            $("#fs-product-discount").focus();
            count++;
        } else if (isNaN(discount)) {
            $("#fs-product-discount-error").text("Discount must be a number!");
            $("#fs-product-discount").focus();
            count++;
        } else if (!(discount % 1 === 0)) {
            $("#fs-product-discount-error").text("Discount must be Integer!");
            $("#fs-product-discount").focus();
            count++;
        } else if (discount < 0 || discount > 100) {
            $("#fs-product-discount-error").text("Discount must be from 0-100!.");
            $("#fs-product-discount").focus();
            count++;
        } else {
            $("#fs-product-discount-error").text("");
        }

        if (mainImg == "") {
            $("#fs-error-mess-product-main-img").text("Image cannot be empty!");
            $("#fs-product-main-img").focus();
            count++;
        } else {
            $("#fs-error-mess-product-main-img").text("");
        }

        if (count == 0) {
            $.ajax({
                url: "admin/ajax/checkProductName.html",
                method: "POST",
                data: {productName: productName},
                success: function (response) {
                    if (response == 1) {
                        $("#fs-product-name-error").text("Duplicate Product Name!");
                        $("#fs-product-name").focus();
                    } else {
                        if (animating) {
                            return false;
                        }
                        animating = true;

                        current_fs = $(".next").parent().parent().parent().parent();
                        next_fs = $(".next").parent().parent().parent().parent().next();

                        //activate next step on progressbar using the index of next_fs
                        $("#fs-product-add-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                        //show the next fieldset
                        next_fs.show();
                        //hide the current fieldset with style
                        current_fs.animate({opacity: 0}, {
                            step: function (now, mx) {
                                //as the opacity of current_fs reduces to 0 - stored in "now"
                                //1. scale current_fs down to 80%
                                scale = 1 - (1 - now) * 0.2;
                                //2. bring next_fs from the right(50%)
                                left = (now * 50) + "%";
                                //3. increase opacity of next_fs to 1 as it moves in
                                opacity = 1 - now;
                                next_fs.css({'left': left, 'opacity': opacity});
                            },
                            duration: 400,
                            complete: function () {
                                current_fs.hide();
                                animating = false;
                            },
                            //this comes from the custom easing plugin
                            easing: 'easeInOutBack'
                        });
                    }
                }
            });

        }
    });

    $(".previous").click(function () {
        if (animating) {
            return false;
        }
        animating = true;

        current_fs = $(this).parent().parent().parent();
        previous_fs = $(this).parent().parent().parent().prev();

        //de-activate current step on progressbar
        $("#fs-product-add-progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'opacity': opacity});
            },
            duration: 400,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    /* Bắt lỗi validation */
    $("#fs-fieldset-general-info").on("change", "#fs-product-subCategory", function () {
        var subCateID = $("#fs-product-subCategory").val();
        if (subCateID == 0) {
            $("p#fs-select-subcate-error").text("Please choose a SubCategory!");
        } else {
            $("p#fs-select-subcate-error").text("");
        }
    });

    $("#fs-product-name").keyup(function () {
        var productName = $("#fs-product-name").val();
        $.ajax({
            url: "admin/ajax/checkProductName.html",
            method: "POST",
            data: {productName: productName},
            success: function (response) {
                if (response == 1) {
                    $("#fs-product-name-error").text("Duplicate Product Name!");
                } else {
                    if (productName == "") {
                        $("#fs-product-name-error").text("Product Name cannot be empty!");
                    } else if (productName.length < 5 || productName.length > 25) {
                        $("#fs-product-name-error").text("Product Name must have 5 - 25 characters!");
                    } else {
                        $("#fs-product-name-error").text("");
                    }
                }
            }
        });
    });

    $("#fs-product-price").keyup(function () {
        var price = $("#fs-product-price").val();
        if (price == "") {
            $("#fs-product-price-error").text("Price cannot be empty!");
        } else if (isNaN(price)) {
            $("#fs-product-price-error").text("Price must be a number!");
        } else if (price < 0) {
            $("#fs-product-price-error").text("Price must be >0!.");
        } else {
            $("#fs-product-price-error").text("");
        }
    });

    $("#fs-product-discount").keyup(function () {
        var discount = $("#fs-product-discount").val();
        if (discount == "") {
            $("#fs-product-discount-error").text("Discount cannot be empty!");
        } else if (isNaN(discount)) {
            $("#fs-product-discount-error").text("Discount must be a number!");
        } else if (!(discount % 1 === 0)) {
            $("#fs-product-discount-error").text("Discount must be an Integer number!");
        } else if (discount < 0 || discount > 100) {
            $("#fs-product-discount-error").text("Discount must be a number from 0-100!.");
        } else {
            $("#fs-product-discount-error").text("");
        }
    });

    /* Ajax when select a Category */
    $("#fs-product-subCategory").attr("disabled", "disabled").
            html("<option value=\"0\">-- Please select Category First --</option>");

    $("#fs-fieldset-general-info").on("change", "#fs-product-category", function () {
        var cateID = $("#fs-product-category").val();
        if (cateID == 0) {
            $("#fs-product-subCategory").attr("disabled", "disabled").
                    html("<option value=\"0\">-- Please select Category First --</option>");
            $("p#fs-select-cate-error").text("Please choose a Category!");
        } else {
            $("p#fs-select-cate-error").text("");
            $("#fs-product-subCategory").removeAttr("disabled");
            $("#fs-product-subCategory").html("<option value=\"0\">-- Please select sub-category --</option>");
            $.ajax({
                url: "admin/ajax/getSubCategory.html",
                method: "POST",
                data: {cateID: cateID},
                dataType: 'JSON',
                success: function (response) {
                    $.each(response, function (i, item) {
                        var subCateOption = "<option value=\"" + item.subCateID + "\">" + item.subCateName + "</option>";
                        $("#fs-product-subCategory").append(subCateOption);
                    });
                }
            });
        }

    });

    /* HIỂN THỊ IMG KHI UP ẢNH - PRODUCT CREATE */
    $('input[name="productSubImg"]').fileuploader({
        limit: 4,
        extensions: ['jpg', 'jpeg', 'png'],
        dialogs: {
            // alert dialog
            alert: function (text) {
                $("#fs-error-mess-productSubImg").text(text);
            }
        },
        thumbnails: {
            // Callback fired after the item image was loaded
            onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                $("#fs-error-mess-productSubImg").empty();
            }
        }
    });

    $('input[class="colorImg"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png'],
        dialogs: {
            // alert dialog
            alert: function (text) {
                $("#fs-error-mess-color-img").text(text);
            }
        },
        thumbnails: {
            // Callback fired after the item image was loaded
            onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                $("#fs-error-mess-color-img").empty();
            }
        }
    });

    $('input[id="fs-product-main-img"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png'],
        dialogs: {
            // alert dialog
            alert: function (text) {
                $("#fs-error-mess-product-main-img").text(text);
            }
        },
        thumbnails: {
            // Callback fired after the item image was loaded
            onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                $("#fs-error-mess-product-main-img").empty();
            }
        }
    });

    $('input[id="fs-edit-product-color-img"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png']
    });

    $('input[id="fs-sub-img"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png']
    });

    var fs_count_div_color = 0;
    /* XỬ LÝ BUTTON ADD-MORE-SIZE - PRODUCT CREATE */
    $("#fs-fieldset-detail").on("click", ".fs-add-more-size", function () {
        var colorNo = $(this).parent().parent().parent().parent().attr("fs-big-div-color");
        var addMoreSize;
        if (colorNo == 0) {
            addMoreSize = " <div class=\"col-xs-8 fs-div-size\" style=\"padding: 0; border: 1px #CCC dashed; margin-bottom: 5px;\">\n\
                                <div class=\"form-group col-xs-6\">\n\
                                    <label>Size</label>\n\
                                    <input name=\"size\" class=\"form-control fs-product-size\" placeholder=\"Size\" style=\"text-transform:uppercase\">\n\
                                </div>\n\
                                <div class=\"form-group col-xs-6\">\n\
                                    <label>Quantity</label>\n\
                                    <input name=\"quantity\" class=\"form-control fs-product-quantity\" placeholder=\"Quantity\">\n\
                                </div>\n\
                                <p class=\"fs-error-mess-size\" style=\"color: red; margin-left: 15px\"></p>\n\
                                <p class=\"fs-error-mess-quantity\" style=\"color: red; margin-left: 15px\"></p>\n\
                            </div>";
        } else {
            addMoreSize = " <div class=\"col-xs-8 fs-div-size\" style=\"padding: 0; border: 1px #CCC dashed; margin-bottom: 5px;\">\n\
                                <div class=\"form-group col-xs-6\">\n\
                                    <label>Size</label>\n\
                                    <input name=\"size_" + colorNo + "\" class=\"form-control fs-product-size\" placeholder=\"Size\" style=\"text-transform:uppercase\">\n\
                                </div>\n\
                                <div class=\"form-group col-xs-6\">\n\
                                    <label>Quantity</label>\n\
                                    <input name=\"quantity_" + colorNo + "\" class=\"form-control fs-product-quantity\" placeholder=\"Quantity\">\n\
                                </div>\n\
                                <p class=\"fs-error-mess-size\" style=\"color: red; margin-left: 15px\"></p>\n\
                                <p class=\"fs-error-mess-quantity\" style=\"color: red; margin-left: 15px\"></p>\n\
                            </div>";
        }

        $(this).parent().siblings(".fs-more-size").append(addMoreSize);
    });

    /* XỬ LÝ BUTTON ADD-MORE-COLOR - PRODUCT CREATE */
    $("#fs-add-more-color").click(function () {
        fs_count_div_color = $(this).parent().siblings("#fs-more-color").find(".fs-div-color").length + 1;
        var addMoreColor = "<div class=\"col-xs-12 fs-div-color\" style=\"padding: 5px 0; border: 1px #CCC dashed; margin-bottom: 10px\" fs-big-div-color=\"" + fs_count_div_color + "\">\n\
                                <div class=\"col-md-6 fs-right-border\">\n\
                                    <div class=\"form-group\">\n\
                                        <label>Color</label>\n\
                                        <p class=\"help-block\"></p>\n\
                                        <input name=\"color\" class=\"form-control fs-product-color-name\" placeholder=\"Color\">\n\
                                    </div>\n\
                                    <div class=\"form-group\">\n\
                                        <label>Color Image</label>\n\
                                        <p id=\"fs-error-mess-color-img-" + fs_count_div_color + "\" style=\"color: red;\"></p>\n\
                                        <input fs-color-img-index=\"" + fs_count_div_color + "\" type=\"file\" name=\"colorImg[]\" class=\"colorImg\">\n\
                                    </div>\n\
                                    <br>\n\
                                    <div class=\"col-xs-12\" style=\"padding: 0;\">\n\
                                        <div class=\"col-xs-8\" style=\"padding: 0; border: 1px #CCC dashed; margin-bottom: 5px;\" >\n\
                                            <div class=\"form-group col-xs-6\">\n\
                                                <label>Size</label>\n\
                                                <input name=\"size_" + fs_count_div_color + "\"  style=\"text-transform:uppercase\" class=\"form-control fs-product-size\" placeholder=\"Size\">\n\
                                            </div>\n\
                                            <div class=\"form-group col-xs-6\">\n\
                                                <label>Quantity</label>\n\
                                                <input name=\"quantity_" + fs_count_div_color + "\" class=\"form-control fs-product-quantity\" placeholder=\"Quantity\">\n\
                                            </div>\n\
                                            <p class=\"fs-error-mess-size\" style=\"color: red; margin-left: 15px\"></p>\n\
                                            <p class=\"fs-error-mess-quantity\" style=\"color: red; margin-left: 15px\"></p>\n\
                                        </div>\n\
                                        <span class=\"fs-more-size\"></span>\n\
                                        <div class=\"form-group col-xs-4\" style=\"margin-top: 20px\">\n\
                                            <button type=\"button\" class=\"btn btn-warning fs-add-more-size\" title=\"Add More Size\">\n\
                                                <i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add Size\n\
                                            </button>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class=\"clearfix\"></div>\n\
                                </div>\n\
                                <div class=\"col-md-6\">\n\
                                    <div class=\"form-group\">\n\
                                        <label>Product Sub Image</label>\n\
                                        <p id=\"fs-error-mess-productSubImg-" + fs_count_div_color + "\" class=\"help-block fs-error-mes-productSubImg\"></p>\n\
                                        <input name=\"productSubImg_" + fs_count_div_color + "\" class=\"fs-productSubImg\" type=\"file\" multiple=\"multiple\">\n\
                                    </div>\n\
                                </div>\n\
                            </div>";
        $(this).parent().siblings("#fs-more-color").hide().append(addMoreColor).fadeIn(1000);

        $("input[name=\"productSubImg_" + fs_count_div_color + "\"]").fileuploader({
            limit: 4,
            extensions: ['jpg', 'jpeg', 'png'],
            dialogs: {
                // alert dialog
                alert: function (text) {
                    $("#fs-error-mess-productSubImg-" + fs_count_div_color).text(text);
                }
            },
            thumbnails: {
                // Callback fired after the item image was loaded
                onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                    $("#fs-error-mess-productSubImg-" + fs_count_div_color).empty();
                }
            }
        });
        $("input[fs-color-img-index=\"" + fs_count_div_color + "\"]").fileuploader({
            limit: 1,
            extensions: ['jpg', 'jpeg', 'png'],
            dialogs: {
                // alert dialog
                alert: function (text) {
                    $("#fs-error-mess-color-img-" + fs_count_div_color).text(text);
                }
            },
            thumbnails: {
                // Callback fired after the item image was loaded
                onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                    $("#fs-error-mess-color-img-" + fs_count_div_color).empty();
                }
            }
        });
    });

    /* XỬ LÝ ON CHANGE PRODUCT-STATUS product-list.jsp */
    $(".fs-div-product-list-select-box").on("change", ".fs-product-status-select-box", function () {
        var newProductStatus = $(this).val();
        var productID = $(this).attr("fs-product");
        $(this).parent().siblings(".fs-trigger").addClass("drawn");

        if (newProductStatus == 1) {
            $(this).siblings(".fs-stopworking-icon").addClass("fs-display-none");
        } else {
            $(this).siblings(".fs-stopworking-icon").removeClass("fs-display-none");
        }

        $.ajax({
            url: "admin/ajax/changeProductStatus.html",
            method: "POST",
            data: {newProductStatus: newProductStatus, productID: productID},
            success: function (response) {

            }
        });

        setTimeout(function () {
            $(".fs-trigger").removeClass("drawn");
        }, 2000);
    });

    /* XỬ LÝ BUTTON SUBMIT CREATE NEW PRODUCT */
    $("#fs-btn-create-new-product").click(function (e) {
        e.preventDefault();
        var count = 0;

        $(".fs-product-color-name").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).siblings("p").text("Color is required!");
                count++;
            } else if ($(this).val().length < 3) {
                $(this).focus();
                $(this).siblings("p").text("Color has more than 3 characters!");
                count++;
            } else {
                $(this).siblings("p").text("");
            }
        });

        $(".colorImg").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).parent().siblings("p").text("Choose an image for Color!");
                count++;
            }
        });

        $(".fs-product-size").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).parent().siblings("p.fs-error-mess-size").text("Size is required!");
                count++;
            } else {
                $(this).parent().siblings("p.fs-error-mess-size").text("");
            }
        });

        $(".fs-product-quantity").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity is required!");
                count++;
            } else if (isNaN($(this).val())) {
                $(this).focus();
                $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity must be a number!");
                count++;
            } else if ($(this).val() < 0) {
                $(this).focus();
                $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity must be >= 0!");
                count++;
            } else {
                $(this).parent().siblings("p.fs-error-mess-quantity").text("");
            }
        });

        $(".fs-productSubImg").each(function () {
            if ($(this).val() == "") {
                $(this).parent().siblings("p.fs-error-mes-productSubImg").text("Choose at least 1 Sub Image for Product");
                $(this).focus();
                count++;
            }
        });

        if (count == 0) {
            $("#fs-form-product-create-new").submit();
        }
    });

    $("#fs-fieldset-detail").on("keyup", ".fs-product-color-name", function () {
        if ($(this).val() == "") {
            $(this).focus();
            $(this).siblings("p").text("Color is required!");
        } else if ($(this).val().length < 3) {
            $(this).focus();
            $(this).siblings("p").text("Color has more than 3 characters!");
        } else {
            $(this).siblings("p").text("");
        }
    });

    $("#fs-fieldset-detail").on("keyup", ".fs-product-size", function () {
        if ($(this).val() == "") {
            $(this).focus();
            $(this).parent().siblings("p.fs-error-mess-size").text("Size is required!");
        } else {
            $(this).parent().siblings("p.fs-error-mess-size").text("");
        }
    });

    $("#fs-fieldset-detail").on("keyup", ".fs-product-quantity", function () {
        if ($(this).val() == "") {
            $(this).focus();
            $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity is required!");
        } else if (isNaN($(this).val())) {
            $(this).focus();
            $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity must be a number!");
        } else if ($(this).val() < 0) {
            $(this).focus();
            $(this).parent().siblings("p.fs-error-mess-quantity").text("Quantity must be >= 0!");
        } else {
            $(this).parent().siblings("p.fs-error-mess-quantity").text("");
        }
    });

    /* TRANG PRODUCT-UPDATE */
    /* Xử lý choose "FIRST" TASK */
    $("#fs-product-update-page").on("change", "#fs-select-product-update-choose-first-task", function () {
        $(".fs-select-product-update-task").addClass("fs-display-none");
        $("#fs-select-product-update-choose-color").val(0);
        var select = $(this).val();
        if (select == 1) {
            $("#fs-edit-product-general-info").removeClass("fs-display-none");
            $("#fs-select-product-update-choose-color").addClass("fs-display-none");
        } else {
            $("#fs-edit-product-general-info").addClass("fs-display-none");
        }

        if (select == 2) {
            $("#fs-edit-product-color").removeClass("fs-display-none");
            $("#fs-select-product-update-choose-color").addClass("fs-display-none");
        } else {
            $("#fs-edit-product-color").addClass("fs-display-none");
        }

        if (select == 3 || select == 4) {
            $("#fs-select-product-update-choose-color").removeClass("fs-display-none");
        }

        if (select == 0) {
            $("#fs-select-product-update-choose-color").addClass("fs-display-none");
        }

    });

    /*Xử lý choose Color*/
    $("#fs-product-update-page").on("change", "#fs-select-product-update-choose-color", function () {
        var task = $("#fs-select-product-update-choose-first-task").val();
        var colorID = $("#fs-select-product-update-choose-color").val();

        if (task == 3) {
            $("#fs-edit-product-size").removeClass("fs-display-none");
            $(".fs-edit-product-table-size").addClass("fs-display-none");
            $("#fs-edit-product-table-size-" + colorID).removeClass("fs-display-none");
        } else {
            $("#fs-edit-product-size").addClass("fs-display-none");
        }

        if (task == 4) {
            $("#fs-edit-product-sub-img").removeClass("fs-display-none");
            $(".fs-edit-product-table-sub-img").addClass("fs-display-none");
            $("#fs-edit-product-table-sub-img-" + colorID).removeClass("fs-display-none");
        } else {
            $("#fs-edit-product-sub-img").addClass("fs-display-none");
        }

        if (colorID == 0) {
            $(".fs-select-product-update-task").addClass("fs-display-none");
        }
    });

    $("#fs-edit-product-table-color tbody").sortable();

    $(".fs-edit-product-table-sub-img tbody").sortable();

    /*==========================END VINH - PRODUCT============================*/

    /*=============================== THANH - BLOG =================================*/
    /*    
     * CẤU HÌNH DATEPICKER CHO BLOG
     */
//    $("#postedDate").datepicker({
//        showAnim: "drop",
//        dateFormat: "dd-mm-yy",
//        changeMonth: true,
//        changeYear: true
//    });
    /* BẮT validation CKSinder */

    /* BẮT validation CREATE BLOG CATEGORY */
    // blog-category-add
    $("#fs-button-create-blog-category").click(function (e) {
        e.preventDefault();
        var blogCateVal = $("#fs-blog-category").val();
        if (blogCateVal == "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("form[name=\"cateForm\"]").submit();
        }
    });

    $("#fs-blog-category").keyup(function () {
        var blogCateVal = $("#fs-blog-category").val();
        if (blogCateVal == "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("#fs-blog-category-error").text("");
        }
    });
    // blog-category-update
    $("#fs-button-update-blog-category").click(function (e) {
        e.preventDefault();
        var blogCateVal = $("#fs-blog-category-update").val();

        if (blogCateVal == "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("form[name=\"cateupdateForm\"]").submit();
        }
    });

    $("#fs-blog-category-update").keyup(function () {
        var blogCateVal = $("#fs-blog-category-update").val();
        if (blogCateVal == "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("#fs-blog-category-error").text("");
        }
    });

    $('input[id="upImage"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png'],
        dialogs: {
            // alert dialog
            alert: function (text) {
                $("#fs-error-mess-blog-img").text(text);
            }
        },
        thumbnails: {
            // Callback fired after the item image was loaded
            onImageLoaded: function (itemEl, listEl, parentEl, newInputEl, inputEl) {
                $("#fs-error-mess-blog-img").empty();
            }
        }
    });


    // blog-category-update-end
    /* BẮT validation CREATE BLOG */
//    $("#fs-button-create-blog").click(function (e) {
//        e.preventDefault();
//        var categoryID = $("#fs-select-box-blog-category").val();
//        if (categoryID == 0) {
//            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
//        } else {
//            $("#fs-form-create-blog").submit();
//        }
//    });
//
//    $("#fs-select-box-blog-category").change(function () {
//        var categoryID = $("#fs-select-box-blog-category").val();
//        if (categoryID == 0) {
//            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
//        } else {
//            $("#fs-select-box-blog-category-error").text("");
//        }
//    });
////// Line Title add
//    $("#fs-button-create-blog").click(function (e) {
//        e.preventDefault();
//        var blogCateVal = $("#fs-blog-line-title").val();
//        if (blogCateVal == "") {
//            $("#fs-blog-title-error").text("Title cannot be empty!");
//        } else if (blogCateVal.length < 5 || blogCateVal.length > 100)
//        {
//            $("#fs-blog-title-error").text("Title has 5 - 100 characters!");
//        }
//        else
//        {
//            $("form[name=\"blogForm\"]").submit();
//        }
//    });
//
//    $("#fs-blog-line-title").keyup(function () {
//        var blogCateVal = $("#fs-blog-line-title").val();
//        if (blogCateVal == "") {
//            $("#fs-blog-title-error").text("Title cannot be empty!");
//        } else if (blogCateVal.length < 5 || blogCateVal.length > 100) {
//            $("#fs-blog-title-error").text("Title has 5 - 100 characters!");
//        } else {
//            $("#fs-blog-title-error").text("");
//        }
//    });
//// Line Summary add
//    $("#fs-button-create-blog").click(function (e) {
//        e.preventDefault();
//        var blogCateValSummary = $("#fs-blog-line-summary").val();
//        if (blogCateValSummary == "") {
//            $("#fs-blog-summary-error").text("Summary cannot be empty!");
//        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 1000) {
//            $("#fs-blog-summary-error").text("Summary has 15 - 1000 characters!");
//        } else {
//            $("form[name=\"blogForm\"]").submit();
//        }
//    });
////
//    $("#fs-blog-line-summary").keyup(function () {
//        var blogCateValSummary = $("#fs-blog-line-summary").val();
//        if (blogCateValSummary == "") {
//            $("#fs-blog-summary-error").text("Summary cannot be empty!");
//        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 1000) {
//            $("#fs-blog-summary-error").text("Summary has 15 - 1000 characters!");
//        } else {
//            $("#fs-blog-summary-error").text("");
//        }
//    });


    $("#fs-form-create-blog").on("click", ".next", function () {
        var cateID = $("#fs-select-box-blog-category").val();
        var titleID = $("#fs-blog-line-title").val();
        var summary = $("#fs-blog-line-summary").val();
        var blogImg = $("#upImage").val();
        var count = 0;


        if (cateID == 0) {
            $("p#fs-select-box-blog-category-error").text("Please choose a Category!");
            $("#fs-select-box-blog-category").focus();
            count++;
        } else {
            $("p#fs-select-box-blog-category-error").text("");
        }

        if (titleID == "") {
            $("#fs-blog-title-error").text("Title cannot be empty!");
            $("#fs-blog-line-title").focus();
            count++;
        } else if (titleID.length < 5 || titleID.length > 50) {
            $("#fs-blog-title-error").text("Title must have 5 - 50 characters!");
            $("#fs-blog-line-title").focus();
        } else {
            $("#fs-blog-title-error").text("");
        }

        if (summary == "") {
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
            $("#fs-blog-line-summary").focus();
            count++;
        } else if (summary.length < 50 || summary.length > 1000) {
            $("#fs-blog-summary-error").text("Summary  must have 50 - 700 characters!");
            $("#fs-blog-line-summary").focus();
        } else {
            $("#fs-blog-summary-error").text("");
        }

        if (blogImg == "") {
            $("#fs-error-mess-blog-img").text("Image cannot be empty!");
            $("#upImage").focus();
            count++;
        } else {
            $("#fs-error-mess-blog-img").text("");
        }
    });

    // keyup
    $("#fs-form-create-blog").on("change", "#fs-select-box-blog-category", function () {
        var subCateID = $("#fs-select-box-blog-category").val();
        if (subCateID == 0) {
            $("p#fs-select-box-blog-category-error").text("Please choose a SubCategory!");
        } else {
            $("p#fs-select-box-blog-category-error").text("");
        }
    });

    $("#fs-blog-line-title").keyup(function () {
        var titleID = $("#fs-blog-line-title").val();
        if (titleID == "") {
            $("#fs-blog-title-error").text("Title cannot be empty!");
        }
        else if (titleID.length < 5 || titleID.length > 50) {
            $("#fs-blog-title-error").text("Title must have 5 - 50 characters!");
        } else {
            $("#fs-blog-title-error").text("");
        }
    });

    $("#fs-blog-line-summary").keyup(function () {
        var summary = $("#fs-blog-line-summary").val();
        if (summary == "") {
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
        }
        else if (summary.length < 15 || summary.length > 1000) {
            $("#fs-blog-summary-error").text("Summary has 15 - 1000 characters!");
        } else {
            $("#fs-blog-summary-error").text("");
        }
    });

    // validate CKfinder

    if ($("#editor1").length) {
        var editor1 = CKEDITOR.replace('editor1', {
            toolbar: [
                {name: 'document', items: ['Source']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace']},
                {name: 'insert', items: ['Image', 'Table', 'HorizontalRule']},
                '/',
                {name: 'styles', items: ['Format', 'Font', 'FontSize']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                '/',
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']}
            ]
        });
        CKFinder.setupCKEditor(editor1, {basePath: '/fashionshop/assets/ckfinder/'});
    }

    // Button Create Blog
    $("#fs-button-create-blog").click(function (e) {
        e.preventDefault();
        var count = 0;

        $(".fs-blog-line-title").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).siblings("p").text("Title is required!");
                count++;
            } else if ($(this).val().length < 5) {
                $(this).focus();
                $(this).siblings("p").text("Title must have 5 - 50 characters! . ");
                count++;
            } else {
                $(this).siblings("p").text("");
            }
        });

        $(".fs-blog-line-summary").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).siblings("p").text("Summary is required!");
                count++;
            } else if ($(this).val().length < 15) {
                $(this).focus();
                $(this).siblings("p").text("Summary has 15 - 1000 characters!");
                count++;
            } else {
                $(this).siblings("p").text("");
            }
        });

        $(".upImage").each(function () {
            if ($(this).val() == "") {
                $(this).focus();
                $(this).parent().siblings("p").text("Choose an image for Blog!");
                count++;
            }
        });

        if (count == 0) {
            $("#fs-form-create-blog").submit();
        }

    });

    /* BẮT validation UPDATE BLOG */

    $("#fs-button-update-blog").click(function (e) {
        e.preventDefault();
        var categoryID = $("#fs-select-box-blog-category-update").val();
        if (categoryID == 0) {
            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
        } else {
            $("#fs-form-create-blog").submit();
        }
    });

    $("#fs-select-box-blog-category-update").change(function () {
        var categoryID = $("#fs-select-box-blog-category-update").val();
        if (categoryID == 0) {
            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
        } else {
            $("#fs-select-box-blog-category-error").text("");
        }
    });

    // Line Title
    $("#fs-button-update-blog").click(function (e) {
        e.preventDefault();
        var blogCateVal = $("#fs-blog-update-line-title").val();
        if (blogCateVal == "") {
            $("#fs-blog-update-title-error").text("Title cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 100)
        {
            $("#fs-blog-update-title-error").text("Title has 5 - 100 characters!");
        }
        else
        {
            $("form[name=\"blogupdateForm\"]").submit();
        }
    });

    $("#fs-blog-update-line-title").keyup(function () {
        var blogCateVal = $("#fs-blog-update-line-title").val();
        if (blogCateVal == "") {
            $("#fs-blog-update-title-error").text("Title cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 100) {
            $("#fs-blog-update-title-error").text("Title has 5 - 100 characters!");
        } else {
            $("#fs-blog-update-title-error").text("");
        }
    });

    // Line Summary

    $("#fs-button-update-blog").click(function (e) {
        e.preventDefault();
        var blogCateValSummary = $("#fs-blog-update-line-summary").val();
        if (blogCateValSummary == "") {
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 1000) {
            $("#fs-blog-summary-error").text("Summary has 15 - 1000 characters!");
        } else {
            $("form[name=\"blogupdateForm\"]").submit();
        }
    });

    $("#fs-blog-update-line-summary").keyup(function () {
        var blogCateValSummary = $("#fs-blog-update-line-summary").val();
        if (blogCateValSummary == "") {
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 1000) {
            $("#fs-blog-summary-error").text("Summary has 15 - 1000 characters!");
        } else {
            $("#fs-blog-summary-error").text("");
        }
    });


    /*===============================END THANH - BLOG =================================*/

    /*==============================DUONG - USER============================*/
    /* 
     * AJAX - EVENT ONCHANGE SELECT USER "STATUS" 
     */
    $(".fs-select-user-status").on("change", function () {
        var status = $(this).val();
        var userID = $(this).attr("fs-user");

        $.ajax({
            url: "admin/user/updateStatus.html",
            method: "POST",
            data: {userID: userID, status: status},
            success: function (response) {
//                swal("UPDATE SUCCESS", response, "success");
                swal({
                    type: "success",
                    title: "UPDATE SUCCESS",
                    text: response,
                    timer: 2000,
                    showConfirmButton: false
                });

            }
        });
    });

//    document.getElementById('fs-status-1').onclick = function(){
//    swal("Good job!", "You clicked the button!", "success");
//};

    /* 
     * AJAX - EVENT ONCHANGE SELECT USER "ROLE" 
     */
    $(".fs-select-user-role").on("change", function () {
        var roleID = $(this).val();
        var userID = $(this).attr("fs-user");



        $.ajax({
            url: "admin/user/usersrole/edit.html",
            method: "POST",
            data: {userID: userID, roleID: roleID},
            success: function (response) {
//                swal("UPDATE SUCCESS", response, "success");
                swal({
                    type: "success",
                    title: "UPDATE SUCCESS",
                    text: response,
                    timer: 2000,
                    showConfirmButton: false
                });


            }
        });
    });


    /*
     * FORMATTING FUNCTION FOR ROW DETAIL - MODIFY AS YOU NEED
     */

    var fs_user_table = $("#fs-user-dataTables").DataTable({//cấu hình datatable chính chủ.
        responsive: true
    });

    //function load data từ 1 dataSource lên table
//    function renderTableFromJson(json) {
//        var beginStr = '<table class="table table-striped table table-bordered table table-hover" >' +
//                '<tr>' +
//                '<th>Address</th>' +
//                '<th>Phone</th>' +
//                '</tr>';
//
//        var endStr = '</table>';
//        var dataStr = '';
//
//        //vòng lặp foreach của jquery
//        $.each(json, function (i, item) { //i: index; item: từng object
//            dataStr += '<tr>' +
//                    '<td>' + item.address + '</td>' +
//                    '<td>' + item.phoneNumber + '</td>' +
//                    '</tr>';
//        });
//
//        return beginStr + dataStr + endStr;
//    }


    //Test thử table khác

    function renderTableFromJson(json) {
        var beginStr = '<table class="heavyyTable" style="width: 100%;border: 1px solid #38678f;max-width: 500px; height: 20px; border-collapse: collapse;margin: 10px auto;background: white;" >' +
                '<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">Address</th>' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">Phone</th>' +
                '</tr>';

        var endStr = '</table>';
        var dataStr = '';

        //vòng lặp foreach của jquery
        $.each(json, function (i, item) { //i: index; item: từng object
            dataStr += '<tbody id="fs-tbody">' +
                    '<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.address + '</td>' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.phoneNumber + '</td>' +
                    '</tr>' +
                    '</tbody>';
        });

        return beginStr + dataStr + endStr;
    }

    function UserIDTableFromJson(json) {
        var beginStr = '<table class="heavyTable" style="width: 40%;border: 1px solid #38678f;max-width: 380px; height: 20px; border-collapse: collapse;background: white;" >' +
                '<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">First Name</th>' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">Last Name</th>' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">Birth Day</th>' +
                '<th class="text-center" id="fs-th" style="background: steelblue;height: 54px;width: 25%;font-weight: lighter;text-shadow: 0 1px 0 #38678f;color: white;border: 1px solid #38678f;box-shadow: inset 0px 1px 2px #568ebd;transition: all 0.2s;">Resgistraion Date</th>' +
                '</tr>';

        var endStr = '</table>';
        var dataStr = '';

        //vòng lặp foreach của jquery
        $.each(json, function (i, item) { //i: index; item: từng object
            var jsonStringBD = item.birthday;
            var jsonObjectBD = JSON.parse(jsonStringBD);
            var newFormattedDateBD = $.datepicker.formatDate('dd/mm/yy', new Date(jsonObjectBD));
            var jsonStringRG = item.registrationDate;
            var jsonObjectRG = JSON.parse(jsonStringRG);
            var newFormattedDateRG = $.datepicker.formatDate('dd/mm/yy', new Date(jsonObjectRG));
            dataStr += '<tbody id="fs-tbody">' +
                    '<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.firstName + '</td>' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.lastName + '</td>' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateBD + '</td>' +
                    '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateRG + '</td>' +
                    '</tr>' +
                    '</tbody>';
        });

        return beginStr + dataStr + endStr;
    }

    $("#fs-user-dataTables").on("click", ".fs-user-dataTable-control-button", function () {
        var userID = $(this).attr("fs-userID");
        var tr = $(this).closest('tr');
        var row = fs_user_table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            //Gọi Ajax
            $.ajax({
                url: "admin/user/ajax/getUserAddress.html",
                method: "POST",
                data: {userID: userID},
                dataType: "JSON",
                success: function (response) {
                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        if (item !== null) {
                            row.child(renderTableFromJson(response)).show();
                        }
                    }
                }
            });
            tr.addClass('shown');
        }
    });

    // HIỂN THỊ BẢNG THÔNG TIN CỦA USER
    $("#fs-user-dataTables tbody").on("click", ".fs-detail-user", function () {
        var userID = $(this).attr("fs-userID");

        $.ajax({
            url: "admin/user/ajax/getUsersByID.html",
            method: "POST",
            data: {userID: userID},
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                //vòng lặp foreach của jquery
                var jsonStringBD = response[0].birthday;
                var jsonObjectBD = JSON.parse(jsonStringBD);
                var newFormattedDateBD = $.datepicker.formatDate('dd/mm/yy', new Date(jsonObjectBD));
                var jsonStringRG = response[0].registrationDate;
                var jsonObjectRG = JSON.parse(jsonStringRG);
                var newFormattedDateRG = $.datepicker.formatDate('dd/mm/yy', new Date(jsonObjectRG));
//                    var dataStr = $('');
//                    $(dataStr).append('<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">');
//                    $(dataStr).append('<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.firstName + '</td>');
//                    $(dataStr).append('<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + item.lastName + '</td>');
//                    $(dataStr).append('<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateBD + '</td>');
//                    $(dataStr).append('<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateRG + '</td>');
//                    $(dataStr).append('</tr>');

//                    $(".heavyTable").append(dataStr);
                var dataStr = "";
                dataStr += '<tr id="fs-tr" style="border-bottom: 1px solid #cccccc;">' +
                        '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + response[0].firstName + '</td>' +
                        '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + response[0].lastName + '</td>' +
                        '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateBD + '</td>' +
                        '<td class="text-center" id="fs-td" style="border-right: 1px solid #cccccc;padding: 10px;transition: all 0.2s;">' + newFormattedDateRG + '</td>' +
                        '</tr>';
                $("#fs-tbody-table-in-user-detail-info").html(dataStr);
                $('#fs-user-detail-info').modal('show');

//    var beginStr = '<table class="table">' ;
//    var endStr = '</table>';
//    var dataStr ='';
//                swal({
//                    title: "",
//                    text:beginStr + dataStr + endStr ,
//                    timer: 4000,
//                    showConfirmButton: false
//                        });
            }
//            
//            
        });
    });


    // BẮT VALIDATION FORM ADD ROLE

    $("#fs-button-create-role").click(function (e) {
        e.preventDefault();
        var roleName = $("#fs-roleName-create").val();
        if (roleName === "") {
            $("#fs-create-roleName-error").text("Role Name cannot be empty!");
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-create").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (roleName.length < 2 || roleName.length > 25) {
            $("#fs-create-roleName-error").text("Role Name has 2 - 25 characters!");
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-create").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else if (checkRole(roleName)) {
            return false;
        }
        else {
            $("#fs-form-create-role").submit();
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-roleName-create").remove();
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    });

    // KIỂM TRA ROLENAME TỒN TẠI CLICK CREATE
    function checkRole(roleName) {
        roleName = $("#fs-roleName-create").val();
        $.ajax({
            url: "admin/user/checkRoleName.html",
            method: "POST",
//                data: {},
            dataType: "JSON",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    if (roleName === item) {
                        $("#fs-create-roleName-error").text("Role Name exist!");
                        var div = $("#fs-roleName-create").closest("div.fs-aaa");
                        div.removeClass("has-success");
                        $("#glypcn-fs-roleName-create").remove();
                        div.addClass("has-error has-feedback");
                        div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
                        return false;
                    }
                }
            }
        });
    }


    $("#fs-roleName-create").keyup(function () {
        var roleName = $("#fs-roleName-create").val();
        if (roleName === "") {
            $("#fs-create-roleName-error").text("Role Name cannot be empty!");
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-create").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (roleName.length < 2 || roleName.length > 25) {
            $("#fs-create-roleName-error").text("Role Name has 2 - 25 characters!");
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-create").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
            $("#fs-create-roleName-error").text("");
            var div = $("#fs-roleName-create").closest("div.fs-aaa");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-roleName-create").remove();
            div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    });

    // XỬ LÝ TRÙNG ROLENAME VỚI KEYUP CREATE
    $("#fs-roleName-create").keyup(function () {
        var roleName = $("#fs-roleName-create").val();
        $.ajax({
            url: "admin/user/checkRoleName.html",
            method: "POST",
//                data: {},
            dataType: "JSON",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    if (roleName === item) {
                        $("#fs-create-roleName-error").text("Role Name exist!");
                        var div = $("#fs-roleName-create").closest("div.fs-aaa");
                        div.removeClass("has-success");
                        $("#glypcn-fs-roleName-create").remove();
                        div.addClass("has-error has-feedback");
                        div.append('<span id="glypcn-fs-roleName-create" class="glyphicon glyphicon-remove form-control-feedback"></span>');
                        return false;
                    }
                }
            }
        });
    });

    // BẮT VALIDATION FORM UPDATE ROLE

    $("#fs-button-update-role").click(function (e) {
        e.preventDefault();
        var roleName = $("#fs-roleName-update").val();
        if (roleName === "") {
            $("#fs-update-roleName-error").text("Role Name cannot be empty!");
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-update").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (roleName.length < 2 || roleName.length > 25) {
            $("#fs-update-roleName-error").text("Role Name has 2 - 25 characters!");
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-update").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        }
        else {
            $("#fs-form-update-role").submit();
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-roleName-update").remove();
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;

        }

    });

    $("#fs-roleName-update").keyup(function () {
        var roleName = $("#fs-roleName-update").val();
        if (roleName === "") {
            $("#fs-update-roleName-error").text("Role Name cannot be empty!");
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-update").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else if (roleName.length < 2 || roleName.length > 25) {
            $("#fs-update-roleName-error").text("Role Name has 2 - 25 characters!");
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-success");
            $("#glypcn-fs-roleName-update").remove();
            div.addClass("has-error has-feedback");
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-remove form-control-feedback"></span>');
            return false;
        } else {
            $("#fs-update-roleName-error").text("");
            var div = $("#fs-roleName-update").closest("div.fa-ccc");
            div.removeClass("has-error");
            div.addClass("has-success has-feedback");
            $("#glypcn-fs-roleName-update").remove();
            div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-ok form-control-feedback"></span>');
            return true;
        }
    });

    // XỬ LÝ TRÙNG ROLENAME VỚI KEYUP UPDATE
    $("#fs-roleName-update").keyup(function () {
        var roleName = $("#fs-roleName-update").val();
        $.ajax({
            url: "admin/user/checkRoleName.html",
            method: "POST",
//                data: {},
            dataType: "JSON",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    if (roleName === item) {
                        $("#fs-update-roleName-error").text("Role Name exist!");
                        var div = $("#fs-roleName-update").closest("div.fa-ccc");
                        div.removeClass("has-success");
                        $("#glypcn-fs-roleName-update").remove();
                        div.addClass("has-error has-feedback");
                        div.append('<span id="glypcn-fs-roleName-update" class="glyphicon glyphicon-remove form-control-feedback"></span>');
                        return false;
                    }
                }
            }
        });
    });
    // XỬ LÝ NÚT XÓA

    $("#fs-delete-button-role").click(function () {
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

    // BẮT VALIDATION FORM LOGIN ADMIN

//    $("#fs-email-login-admin").keyup(function(){
//         var email = $("#fs-email-login-admin").val();
//         var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
//         
//         if(email === ""){
//            $("#fs-email-login-admin-error").text("Email cannot be empty!");
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
//            divemail.removeClass("has-success");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.addClass("has-error has-feedback");
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
//            return false;
//        }else if(!pattern.test(email)){
//             $("#fs-email-login-admin-error").text("Please enter valid email!");
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
//            divemail.removeClass("has-success");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.addClass("has-error has-feedback");
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
//            return false;
//        }else{
//            $("#fs-form-login-admin").submit();
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
//            divemail.removeClass("has-error");
//            divemail.addClass("has-success has-feedback");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-ok form-control-feedback"></span>');
//            return true;
////        }
//        }
//    });
//    $(".fs-button-login-admin").click(function(e){
//        e.preventDefault();
//        var email = $("#fs-email-login-admin").val();
//        var pass = $("#fs-pass-login-admin").val();
//        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
//        
//        if(email === ""){
//            $("#fs-email-login-admin-error").text("Email cannot be empty!");
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
//            divemail.removeClass("has-success");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.addClass("has-error has-feedback");
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
//            return false;
//        }else if(!pattern.test(email)){
//             $("#fs-email-login-admin-error").text("Please enter valid email!");
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
//            divemail.removeClass("has-success");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.addClass("has-error has-feedback");
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
//            return false;
//        }
////        else if(pass === ""){
////             $("#fs-pass-login-admin-error").text("Password cannot be empty!");
////            var divpass = $("#fs-pass-login-admin").closest("div.fa-vali-pass-admin");
////            divpass.removeClass("has-success");
////            $("#glypcn-fs-login-admin").remove();
////            divpass.addClass("has-error has-feedback");
////            divpass.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
////            return false;
////        }
//        else{
//            $("#fs-form-login-admin").submit();
//            var divemail = $("#fs-email-login-admin").closest("div.fa-vali-email-admin");
////            var divpass = $("#fs-pass-login-admin").closest("div.fa-vali-pass-admin");
//            divemail.removeClass("has-error");
////            divpass.removeClass("has-error");
//            divemail.addClass("has-success has-feedback");
////            divemail.addClass("has-success has-feedback");
//            $("#glypcn-fs-login-admin").remove();
//            divemail.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-ok form-control-feedback"></span>');
////            divpass.append('<span id="glypcn-fs-login-admin" class="glyphicon glyphicon-remove form-control-feedback"></span>');
//            return true;
//        }
//       
//    });

//       
//    $(".fs-button-detele-role").prop('disable', true);

//    $

    /*==============================END DUONG - USER============================*/

    /*==============================NGAN - ORDER============================*/
    //Thiết lập cho bảng order list
    $('#tableOrder').DataTable({
        responsive: true,
        order: [[4, "desc"]],
        columnDefs: [{"orderable": false, "targets": [2, 3, 5]}] //,{"targets":4,render: $.fn.dataTable.render.moment(dd/mm/yyyy)}
    });

    //Thiết lập cho bảng order details list
    $('#tableOrderDetails').DataTable({
        responsive: true,
        columnDefs: [{"orderable": false, "targets": [2, 3, 8]}]
    });

    //Thiết lập cho bảng discount list
    $('#tableDiscountList').DataTable({
        responsive: true,
        columnDefs: [{"orderable": false, "targets": [5, 6]}]
    });

    //discount-list-add.jsp
    $("#beginDate").datepicker({
        showAnim: "drop",
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: new Date().getFullYear().toString() + ":" + (new Date().getFullYear() + 2).toString(),
        minDate: new Date(),
        onSelect: function () {
            $('#error-discount-add').html("");
            $("#endDate").datepicker("option", "minDate", $('input[name=beginDate]').val());
        }
    });
    $("#endDate").datepicker({
        showAnim: "drop",
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: new Date().getFullYear().toString() + ":" + (new Date().getFullYear() + 2).toString(),
        minDate: new Date(),
        onSelect: function () {
            $('#error-discount-add').html("");
        }
    });
    $('#btn-create-discount').on("click", function (e) {
        e.preventDefault();
        var errorHead = "<div class=\"alert alert-danger\"><strong>";
        var errorFoot = "</strong></div>";
        var voucherID = $('input[name=voucherID]').val();
        var discount = $('input[name=discount]').val();
        var quantity = $('input[name=quantity]').val();
        var beginDate = $('input[name=beginDate]').val();
        var endDate = $('input[name=endDate]').val();
        var description = $('input[name=description]').val();
        if (voucherID == "") {
            $('#error-discount-add').html(errorHead + "VOUCHER CODE REQUIRED" + errorFoot);
        } else if (discount == "") {
            $('#error-discount-add').html(errorHead + "DISCOUNT REQUIRED" + errorFoot);
        } else if (!discount.match('[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)') || discount.match(',')) { //^[0-9]*$
            $('#error-discount-add').html(errorHead + "DISCOUNT MUST BE NUMBER (Eg: 30, 30.5,...)" + errorFoot);
        } else if (discount <= 0 || discount > 100) {
            $('#error-discount-add').html(errorHead + "DISCOUNT RANGE 0 TO 100" + errorFoot);
        } else if (quantity == "") {
            $('#error-discount-add').html(errorHead + "QUANTITY REQUIRED" + errorFoot);
        } else if (!quantity.match('^[0-9]*$')) { //[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)
            $('#error-discount-add').html(errorHead + "QUANTITY MUST BE NUMBER" + errorFoot);
        } else if (description.length > 500) {
            $('#error-discount-add').html(errorHead + "DESCRIPTION LENGTH MAXIMUM 500" + errorFoot);
        } else {
            $('#fs-form-create-discount').submit();
        }
    });
    $('input[name=voucherID]').keyup(function () {
        $('#error-discount-add').html("");
    });
    $('input[name=discount]').keyup(function () {
        $('#error-discount-add').html("");
    });
    $('input[name=quantity]').keyup(function () {
        $('#error-discount-add').html("");
    });
    $('input[name=description]').keyup(function () {
        $('#error-discount-add').html("");
    });
    //Order-list-detail-add.jsp
    $('#tableProductOrderDetailAdd').DataTable({
        responsive: true,
        order: [[0, "asc"]]
    });
    $('#tableProductOrderDetailAdd tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).prop("style", false);
            $("#productOrDetailAddColor").html(" ");
            $("#productOrDetailAddSize").html(" ");
        }
        else {
            $("#productOrDetailAddColor").html(" ");
            $("#productOrDetailAddSize").html(" ");
            $('tr.selected').prop("style", false);
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $(this).css("background-color", "skyblue");
            var productID = $("tr.selected .proID")[0].innerHTML;
            $.ajax({
                url: "admin/orders/ajax/searchcolor.html",
                method: "POST",
                data: {productID: productID},
                dataType: 'html',
                success: function (response) {
                    $("#productOrDetailAddColor").html(response);
                }
            });
        }
    });
    $('select[name=productOrDetailAddColor]').on("change", function () {
        $("#order-detail-add-color-error").text("");
        var colorID = $("select[name=productOrDetailAddColor]").val();
        $.ajax({
            url: "admin/orders/ajax/searchsize.html",
            method: "POST",
            data: {colorID: colorID},
            dataType: 'html',
            success: function (response) {
                $("#productOrDetailAddSize").html(response);
            }
        });
    });
    $('select[name=productOrDetailAddSize]').on("change", function () {
        $("#order-detail-add-size-error").text("");
    });
    $("#btnSearchProduct").on("click", function () {
        var searchType = $('#searchType').val();
        var searchText = $('#searchText').val();
        if (searchType == 1) { //ProductName
            if (searchText == "") {
                $("#order-detail-add-error").text("PLEASE ENTER PRODUCT NAME");
            }
            $.ajax({
                url: "admin/orders/ajax/searchproduct.html",
                method: "POST",
                data: {searchType: searchType, searchText: searchText},
                dataType: 'html',
                success: function (response) {
                    if (response === "0") {
                        $("#order-detail-add-error").text("PRODUCT NAME ERROR");
                    } else {
                        $(".bodyProductOrDetailAdd").html(response);
                    }
                }
            });
        } else { //Product ID
            if (searchText == "") {
                $("#order-detail-add-error").text("PLEASE ENTER PRODUCT ID");
            } else if (!$.isNumeric(searchText)) {
                $("#order-detail-add-error").text("PLEASE ENTER PRODUCT ID IN NUMBER");
            }
            $.ajax({
                url: "admin/orders/ajax/searchproduct.html",
                method: "POST",
                data: {searchType: searchType, searchText: searchText},
                dataType: 'html',
                success: function (response) {
                    if (response == "0") {
                        $("#order-detail-add-error").text("PRODUCT NOT EXIST");
                    } else {
                        $(".bodyProductOrDetailAdd").html(response);
                    }
                }
            });
        }
    });
    $('#btnAddOrderDetail').on("click", function () {
        if ($("tr.selected .proID")[0] == null) {
            $("#order-detail-add-error").text("PLEASE SEARCH AND CHOOSE PRODUCT");
        } else {
            var orderID = $("#productOrDetailAddHeader").attr("fs-order-id");
            var productID = $("tr.selected .proID")[0].innerHTML;
            var colorID = $("select[name=productOrDetailAddColor]").val();
            var sizeID = $("select[name=productOrDetailAddSize]").val();
            var quantity = $("input[name=productOrDetailAddQuantity]").val();
            if (colorID == null || colorID == 0) {
                $("#order-detail-add-color-error").text("PLEASE CHOOSE COLOR");
            } else if (sizeID == null || sizeID == 0) {
                $("#order-detail-add-size-error").text("PLEASE CHOOSE SIZE");
            } else if (quantity == "") {
                $("#order-detail-add-quantity-error").text("PLEASE ENTER QUANTITY");
            } else if (quantity < 1 || quantity > 10) {
                $("#order-detail-add-quantity-error").text("QUANTITY MUST 1 TO 10");
            } else {
                $.ajax({
                    url: "admin/orders/ajax/addOrderDetail.html",
                    method: "POST",
                    data: {orderID: orderID,
                        productID: productID,
                        colorID: colorID,
                        sizeID: sizeID,
                        quantity: quantity},
                    dataType: 'html',
                    success: function (response) {
                        if (response == "") {
                            $("#order-detail-add-error").text("ERROR");
                        } else if (response == "0") {
                            $("#order-detail-add-error").text("OUT OF STOCK! CHOSE ANOTHER COLOR AND SIZE.");
                        } else {
                            window.location = "admin/orders/orderlistdetail/" + orderID + ".html";
                        }
                    }
                });
            }
        }
    });
    $("#searchText").keyup(function () {
        $("#order-detail-add-error").text("");
    });
    $('input[name=productOrDetailAddQuantity]').keyup(function () {
        $("#order-detail-add-quantity-error").text("");
    });
    var data = [
        {y: "2014", a: 50, b: 90},
        {y: "2015", a: 65, b: 75},
        {y: "2016", a: 50, b: 50},
        {y: "2017", a: 75, b: 60},
        {y: "2018", a: 80, b: 65},
        {y: "2019", a: 90, b: 70},
        {y: "2020", a: 100, b: 75},
        {y: "2021", a: 115, b: 75},
        {y: "2022", a: 120, b: 85},
        {y: "2023", a: 145, b: 85},
        {y: "2024", a: 160, b: 95}
    ],
            config = {
                data: data,
                xkey: "y",
                ykeys: ["a", "b"],
                labels: ["Total Income", "Total Outcome"],
                fillOpacity: 0.6,
                hideHover: "auto",
                behaveLikeLine: true,
                resize: true,
                pointFillColors: ["#ffffff"],
                pointStrokeColors: ["black"],
                lineColors: ["gray", "red"]
            };
    config.element = "area-chart";
    Morris.Line(config);
    /*==============================END NGAN - ORDER============================*/
});
