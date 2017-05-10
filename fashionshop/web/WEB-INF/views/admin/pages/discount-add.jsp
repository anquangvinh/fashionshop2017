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
                    <span style="font-size: 0.9em">List - Create New</span>
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
                    <form:form name="discount-add-form" action="admin/orders/discountadd.html" method="POST" modelAttribute="discountVoucher">
                        <div class="form-group">
                            <label>Voucher Code</label>
                            <form:input placeholder="VOU00" onchange="this.value = this.value.toUpperCase();" cssClass="form-control" path="voucherID"/>
                        </div>
                        <div class="form-group">
                            <label>Discount Percent</label>
                            <%--<form:input cssClass="form-control" path="discount"/>--%>
                            <input class="form-control" type="number" min="1" max="100" name="discount" id="discount"/>
                        </div>
                        <div class="form-group">
                            <label>Discount Quantity</label>
                            <%--<form:input cssClass="form-control" path="quantity"/>--%>
                            <input class="form-control" type="number" min="1" name="quantity" id="quantity"/>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <form:input cssClass="form-control" path="description"/>
                        </div>
                        <button type="submit" class="btn btn-success">CREATE</button>
                        <button type="reset" class="btn btn-default">RESET</button>
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
//    $('#vouId').val($(this).val().toUpperCase());
</script>