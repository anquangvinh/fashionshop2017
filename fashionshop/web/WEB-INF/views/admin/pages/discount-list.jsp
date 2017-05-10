<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Discount</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List</span>
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
                <table width="100%" class="table table-striped table-bordered table-hover" id="tableDiscountList">
                    <thead>
                        <tr>
                            <th class="text-center fs-valign-middle">Voucher Code</th>
                            <th class="text-center fs-valign-middle">Discount Percent</th>
                            <th class="text-center fs-valign-middle">Quantity</th>
                            <th class="text-center fs-valign-middle">Description</th>
                            <th class="text-center fs-valign-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${discountList}" var="discount">
                            <tr class="odd gradeX">
                                <td class="text-center fs-valign-middle">${discount.voucherID}</td>
                                <td class="text-center fs-valign-middle">${discount.discount}</td>
                                <td class="text-center fs-valign-middle">${discount.quantity}</td>
                                <td class="text-center fs-valign-middle">${discount.description}</td>
                                <td class="text-center fs-valign-middle">
                                    <a href="admin/orders/discountupdate/${discount.voucherID}.html" type="button" class="btn btn-primary">Update</a>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
                <!-- /.table-responsive -->
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->