<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">

                <h1 class="page-header"> 
                    <strong>Discount</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List - Update</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <div>
                    ${error}
                </div>
                <div class="col-lg-6">
                    <form:form name="discount-update-form" action="admin/orders/discountupdate/${targetDiscountVoucher.voucherID}.html" 
                               method="POST" modelAttribute="targetDiscountVoucher">
                        <div class="form-group">
                            <label>Voucher Code</label>
                            <%--<form:input cssClass="form-control" path="voucherID" disabled="disabled"/>--%>
                            <input class="form-control" name="voucherID" id="voucherID" disabled="" value="${targetDiscountVoucher.voucherID}"/>
                        </div>
                        <div class="form-group">
                            <label>Discount Percent</label>
                            <%--<form:input cssClass="form-control" path="discount"/>--%>
                            <input class="form-control" type="number" min="1" max="100" name="discount" id="discount" value="${targetDiscountVoucher.getPercent()}"/>
                        </div>
                        <div class="form-group">
                            <label>Discount Quantity</label>
                            <%--<form:input cssClass="form-control" path="quantity"/>--%>
                            <input class="form-control" type="number" min="1" name="quantity" id="quantity" value="${targetDiscountVoucher.quantity}"/>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <form:input cssClass="form-control" path="description"/>
                        </div>
                        <button type="submit" class="btn btn-success">Update</button>
                        <!--<button type="reset" class="btn btn-default">Reset</button>-->
                    </form:form>
                </div>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->
<script type="text/javascript">

</script>