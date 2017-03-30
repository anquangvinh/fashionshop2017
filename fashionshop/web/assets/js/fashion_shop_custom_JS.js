/* 
 * 
 * MỌI NGƯỜI VIẾT JAVASCRIPT VÀO ĐÂY.
 * 
 * NHỚ LÀ: VIẾT CÁI GÌ, THÌ CHÚ THÍCH CÁI ĐÓ, CÔNG DỤNG ĐỂ LÀM GÌ
 * 
 */

$(document).ready(function () {
    $("#txtBirthday").datepicker({
        dateFormat: "dd-mm-yy",
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
});
