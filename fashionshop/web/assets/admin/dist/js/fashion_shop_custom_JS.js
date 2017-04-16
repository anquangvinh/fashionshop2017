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
        if (animating) return false;
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
    $(".fs-select-user-role").on("change", function(){
        var roleID = $(this).val();
        var userID = $(this).attr("fs-user");
        
        $.ajax({
           url : "admin/user/usersrole/edit.html",
           method: "POST",
           data: {userID : userID, roleID: roleID},
           success: function(response){
               alert(response);
           }
        });
        
    });
});
