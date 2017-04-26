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

    //Bảng datatable của product-list
    $('#productList_dataTable').DataTable({
        responsive: true,
        columnDefs: [
            {"orderable": false, "targets": [1, 2, 3, 4, 5, 6]} //disable thuộc tính order của các cột 1,2,3,4,5,6
        ],
        //Tạo DOM cho các component trong datatable
        dom: '<"row"<"col-sm-4"l><"#fs_product_filter.col-sm-4"><"col-sm-4"f>><"row"<"col-sm-12">t><"row"<"col-sm-6"i><"col-sm-6"p>>',
        //Chức năng lọc theo Category và SubCategory
        initComplete: function () {
            this.api().columns(1).every(function () {
                var column = this;
                var select = $('<select class="form-control"><option value="">Choose Category - SubCategory</option></select>')
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

    //Multiple step PRODUCT CREATE FORM

//jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
        if (animating)
            return false;
        animating = true;

        current_fs = $(this).parent().parent().parent();
        next_fs = $(this).parent().parent().parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#fs-product-add-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //2. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function () {
        if (animating)
            return false;
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
                //1. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //2. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });


    /*=============================== THANH - BLOG =================================*/
    /*    
     * CẤU HÌNH DATEPICKER CHO BLOG
     */
    $("#postedDate").datepicker({
        showAnim: "drop",
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    });

    /* BẮT validation CREATE BLOG CATEGORY */
    // blog-category-add
    $("#fs-button-create-blog-category").click(function (e) {
        e.preventDefault();
        var blogCateVal = $("#fs-blog-category").val();
        if (blogCateVal === "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("form[name=\"cateForm\"]").submit();
        }
    });

    $("#fs-blog-category").keyup(function () {
        var blogCateVal = $("#fs-blog-category").val();
        if (blogCateVal === "") {
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

        if (blogCateVal === "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("form[name=\"cateupdateForm\"]").submit();
        }
    });

    $("#fs-blog-category-update").keyup(function () {
        var blogCateVal = $("#fs-blog-category-update").val();
        if (blogCateVal === "") {
            $("#fs-blog-category-error").text("Category cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 20) {
            $("#fs-blog-category-error").text("Category has 5 - 20 characters!");
        } else {
            $("#fs-blog-category-error").text("");
        }
    });
    //update image not null
 


    
          $("#fs-button-update-blog").bind("click",function() 
    { 
        var imgVal = $("#upImage").val(); 
        if(imgVal==="") 
        { 
            alert("Please select the image for the article."); 

        } 
        return 0; 

    }); 

    // blog-category-update-end
    /* BẮT validation CREATE BLOG */
    $("#fs-button-create-blog").click(function (e) {
        e.preventDefault();
        var categoryID = $("#fs-select-box-blog-category").val();

        if (categoryID === 0) {
            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
        } else {
            $("#fs-form-create-blog").submit();
        }
    });

    $("#fs-select-box-blog-category").change(function () {
        var categoryID = $("#fs-select-box-blog-category").val();
        if (categoryID === 0) {
            $("#fs-select-box-blog-category-error").text("Please select a Category!.");
        } else {
            $("#fs-select-box-blog-category-error").text("");
        }
    });

    $("#fs-button-create-blog").click(function (e) {
        e.preventDefault();
        var blogCateVal = $("#fs-blog-line-title").val();
        if (blogCateVal === "") {
            $("#fs-blog-title-error").text("Title cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 100)
        {
            $("#fs-blog-title-error").text("Title has 5 - 100 characters!");
        }
      
        else
        {
            $("form[name=\"blogForm\"]").submit();
        }
        
    });

    $("#fs-blog-line-title").keyup(function () {
        var blogCateVal = $("#fs-blog-line-title").val();
        if (blogCateVal === "") {
            $("#fs-blog-title-error").text("Title cannot be empty!");
        } else if (blogCateVal.length < 5 || blogCateVal.length > 100) {
            $("#fs-blog-title-error").text("Title has 5 - 100 characters!");
        } else {
            $("#fs-blog-title-error").text("");
        }
    });

       $("#fs-button-create-blog").click(function(e){
        e.preventDefault();
        var blogCateValSummary = $("#fs-blog-line-summary").val();
        if(blogCateValSummary === ""){
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
        } else if(blogCateValSummary.length < 5 || blogCateValSummary.length > 200){
            $("#fs-blog-summary-error").text("Summary has 15 - 400 characters!");
        } else {
            $("form[name=\"blogForm\"]").submit();
        }
    });
    
     $("#fs-blog-line-summary").keyup(function(){
        var blogCateValSummary = $("#fs-blog-line-summary").val();
        if(blogCateValSummary === ""){
            $("#fs-blog-summary-error").text("Summary cannot be empty!");
        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 200) {
            $("#fs-blog-summary-error").text("Summary has 15 - 400 characters!");
        } else {
            $("#fs-blog-summary-error").text("");
        }
    });
    
    // validate CKfinder
        $(document).ready(function(){

            $("#f3").validate(
            {
                ignore: [],
              debug: false,
                rules: { 

                    editor1:{
                         required: function() 
                        {
                         CKEDITOR.instances.cktext.updateElement();
                        },

                         minlength:10
                    }
                },
                messages:
                    {

                    editor1:{
                        required:"Please enter Text",
                        minlength:"Please enter 10 characters"


                    }
                }
            });
        });
    /* BẮT validation UPDATE BLOG */
        $("#fs-button-update-blog").click(function (e) {
        e.preventDefault();
        var categoryID = $("#fs-select-box-blog-category-update").val();

        if (categoryID === 0) {
            $("#fs-select-box-blog-category-update-error").text("Please select a Category!.");
        } else {
            $("#fs-form-update-blog").submit();
        }
    });

    $("#fs-select-box-blog-category-update").change(function () {
        var categoryID = $("#fs-select-box-blog-category-update").val();
        if (categoryID === 0) {
            $("#fs-select-box-blog-category-update-error").text("Please select a Category!.");
        } else {
            $("#fs-select-box-blog-category-update-error").text("");
        }
    });
    
    // Line Title
      $("#fs-button-update-blog").click(function(e){
        e.preventDefault();
        var blogCateValTitleUpdate = $("#fs-blog-update-line-title").val();
        if(blogCateValTitleUpdate === ""){
            $("#fs-blog-update-title-error").text("Title cannot be empty!");
        } else if(blogCateValTitleUpdate.length < 5 || blogCateValTitleUpdate.length > 100){
            $("#fs-blog-update-title-error").text("Title has 5 - 100 characters!");
        } else {
            $("form[name=\"blogupdateForm\"]").submit();
        }
    });
    
     $("#fs-blog-update-line-title").keyup(function(){
        var blogCateValSummary = $("#fs-blog-update-line-title").val();
        if(blogCateValSummary === ""){
            $("#fs-blog-update-title-error").text("Title cannot be empty!");
        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 200) {
            $("fs-blog-update-title-error").text("Title has 15 - 400 characters!");
        } else {
            $("#fs-blog-update-title-error").text("");
        }
    });
    
    // Line Summary
    
      $("#fs-button-update-blog").click(function(e){
        e.preventDefault();
        var blogCateValTitleUpdate = $("#fs-blog-update-line-summary").val();
        if(blogCateValTitleUpdate === ""){
            $("#fs-blog-update-title-error").text("Title cannot be empty!");
        } else if(blogCateValTitleUpdate.length < 5 || blogCateValTitleUpdate.length > 100){
            $("#fs-blog-update-title-error").text("Title has 5 - 100 characters!");
        } else {
            $("form[name=\"blogupdateForm\"]").submit();
        }
    });
    
     $("#fs-blog-update-line-summary").keyup(function(){
        var blogCateValSummary = $("#fs-blog-update-line-summary").val();
        if(blogCateValSummary === ""){
            $("#fs-blog-update-summary-error").text("Title cannot be empty!");
        } else if (blogCateValSummary.length < 5 || blogCateValSummary.length > 200) {
            $("fs-blog-update-summary-error").text("Title has 15 - 400 characters!");
        } else {
            $("#fs-blog-update-summary-error").text("");
        }
    });
    
    
    /*===============================END THANH - BLOG =================================*/

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
});
