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
        } else if (productName.length < 5 || productName.length > 20) {
            $("#fs-product-name-error").text("Product Name must have 5 - 20 characters!");
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
                    } else if (productName.length < 5 || productName.length > 20) {
                        $("#fs-product-name-error").text("Product Name must have 5 - 20 characters!");
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

    var fs_count_div_color = 0;
    /* XỬ LÝ BUTTON ADD-MORE-SIZE - PRODUCT CREATE */
    $("#fs-fieldset-detail").on("click", ".fs-add-more-size", function () {
        var addMoreSize;
        if (fs_count_div_color === 0) {
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
                                    <input name=\"size_" + fs_count_div_color + "\" class=\"form-control fs-product-size\" placeholder=\"Size\" style=\"text-transform:uppercase\">\n\
                                </div>\n\
                                <div class=\"form-group col-xs-6\">\n\
                                    <label>Quantity</label>\n\
                                    <input name=\"quantity_" + fs_count_div_color + "\" class=\"form-control fs-product-quantity\" placeholder=\"Quantity\">\n\
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
        var addMoreColor = "<div class=\"col-xs-12 fs-div-color\" style=\"padding: 5px 0; border: 1px #CCC dashed; margin-bottom: 10px\">\n\
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
    
    /* Xử lý choose TASK - PRODUCT-UPDATE */
    $("#fs-select-product-update-task").change(function(){
        var select = $(this).val();
        if(select == 1){
            $("#fs-edit-product-general-info").removeClass("fs-display-none");
        } else {
            if(!$("#fs-edit-product-general-info").hasClass("fs-display-none")){
                $("#fs-edit-product-general-info").addClass("fs-display-none");
            }
        }
        
        if(select == 2){
            $("#fs-select-product-update-color").removeClass("fs-display-none");
            $("#fs-select-product-update-color").focus();
        } else {
            if(!$("#fs-select-product-update-color").hasClass("fs-display-none")){
                 $("#fs-select-product-update-color").addClass("fs-display-none");
            }
        }
    });
    
    $("#fs-select-product-update-color").change(function(){
        var select = $(this).val();
        if(select == 1){
            $("#fs-edit-product-detail-info").removeClass("fs-display-none");
        } else {
            if(!$("#fs-edit-product-detail-info").hasClass("fs-display-none")){
                $("#fs-edit-product-detail-info").addClass("fs-display-none");
            }
        }
    });
    /*==========================END VINH - PRODUCT============================*/

    /*    
     * CẤU HÌNH DATEPICKER CHO BLOG
     */
    $("#postedDate").datepicker({
        showAnim: "drop",
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    });

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
                alert(response);
            }
        });
    });

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
                alert(response);
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
    function renderTableFromJson (json) {
        var beginStr = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                    '<tr>' +
                        '<th>Address</th>' +
                        '<th>Phone</th>' +
                    '</tr>';
        var endStr = '</table>';
        var dataStr = '';
        
        //vòng lặp foreach của jquery
        $.each(json, function(i, item){ //i: index; item: từng object
            dataStr += '<tr>' +
                        '<td>'+ item.address +'</td>' +
                        '<td>' + item.phoneNumber + '</td>' +
                    '</tr>';
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
                dataType : "JSON",
                success: function (response) {
                    row.child(renderTableFromJson(response)).show();
                }
            });
            
            tr.addClass('shown');
        }
    });

});


