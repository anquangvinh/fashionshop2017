<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Orders</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List Detail Order NO.${orderID}</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${orderdetailList}" var="orderdetail">
                            <tr class="odd gradeX">
                                <td align="center">${orderdetail.ordersDetailID}</td>
                                <td align="center">${orderdetail.getProduct().getProductName()}</td>
                                <td align="center">${orderdetail.getSize().getColor().getColor()}</td>
                                <td align="center">${orderdetail.getSize().getColor().colorID}</td>
                                <td align="center">${orderdetail.quantity}</td>
                                <td align="center">${orderdetail.price}</td>
                                <td align="center">${orderdetail.getTotalPrice()}</td>
                                <td align="center">
                                    <select name="status" class="form-control input-sm" onchange="window.location = 'admin/orders/confirmstatusOrderDetail/${orderdetail.ordersDetailID}/'+this.value+'.html';">
                                        <c:choose>
                                            <c:when test="${orderdetail.status == 1}">
                                                <option value="0">Not Change</option>
                                                <option value="1" <c:out value="selected"/>>Cancelled</option>
                                                <option value="2">New</option>
                                            </c:when>
                                            <c:when test="${orderdetail.status == 2}">
                                                <option value="0">Not Change</option>
                                                <option value="1">Cancelled</option>
                                                <option value="2" <c:out value="selected"/>>New</option>
                                            </c:when>
                                            <c:otherwise>
                                                <option value="0" <c:out value="selected"/>>Not Change</option>
                                                <option value="1">Cancelled</option>
                                                <option value="2">New</option>
                                            </c:otherwise>
                                        </c:choose>
                                    </select>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="8" align="center"><a style="width: 900px;" href="admin/orders/ordersdetailadd.html" type="button" class="btn btn-primary"><b>ADD</b></a></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td align="center"><b>Order Total</b></td>
                            <td align="center">${orderTotal}</td>
                            <td></td>
                        </tr>
                    </tfoot>
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