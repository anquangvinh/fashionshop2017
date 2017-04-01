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
                    <span style="font-size: 0.9em">List</span>
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
                            <th>Order ID</th>
                            <th>First Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Status</th>
                            <!--<th>Action</th>-->
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${orderList}" var="order">
                            <tr class="odd gradeX">
                                <td align="center">
                                    <a href="admin/orders/orderlistdetail/${order.ordersID}.html">Order No.${order.ordersID}</a>
                                </td>
                                <td align="center">${order.receiverFirstName}</td>
                                <td align="center">${order.phoneNumber}</td>
                                <td align="center">${order.deliveryAddress}</td>
                                <td>
                                    <fmt:formatDate value="${order.ordersDate}" pattern="hh:mm:ss dd-MM-yyyy"/>
                                </td>
                                <td align="center">
                                    <select name="status" class="form-control input-sm" 
                                            onchange="window.location = 'admin/orders/confirmstatusOrder/${order.ordersID}/'+this.value+'.html';">
                                        <c:choose>
                                            <c:when test="${order.status == 1}">
                                                <option value="1" <c:out value="selected"/>>Completed</option>
                                                <option value="2">Pending</option>
                                                <option value="3">Confirmed</option>
                                                <option value="0">Cancelled</option>
                                            </c:when>
                                            <c:when test="${order.status == 2}">
                                                <option value="1">Completed</option>
                                                <option value="2" <c:out value="selected"/>>Pending</option>
                                                <option value="3">Confirmed</option>
                                                <option value="0">Cancelled</option>
                                            </c:when>
                                            <c:when test="${order.status == 3}">
                                                <option value="1">Completed</option>
                                                <option value="2">Pending</option>
                                                <option value="3" <c:out value="selected"/>>Confirmed</option>
                                                <option value="0">Cancelled</option>
                                            </c:when>
                                            <c:otherwise>
                                                <option value="1">Completed</option>
                                                <option value="2">Pending</option>
                                                <option value="3">Confirmed</option>
                                                <option value="0"  <c:out value="selected"/>>Cancelled</option>
                                            </c:otherwise>
                                        </c:choose>
                                    </select>
                                </td>
<!--                                <td align="center">
                                    <a href="admin/orders/confirmstatus/${order.ordersID}/.html" type="button" class="btn btn-warning">Confirmed Status</a>
                                </td>-->
                            </tr>
                        </c:forEach>
                        <!--                        <tr class="odd gradeX">
                                                    <td>Trident</td>
                                                    <td>Internet Explorer 4.0</td>
                                                    <td>Win 95+</td>
                                                    <td class="center">4</td>
                                                    <td class="center">X</td>
                                                </tr>-->
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