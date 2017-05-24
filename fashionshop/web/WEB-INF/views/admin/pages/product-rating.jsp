<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid" id="fs-rating-admin-page">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Product Rating Manage</strong> 
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered table-hover" id="rating-dataTable">
                    <thead>
                        <tr>
                            <th class="text-center">No</th>
                            <th class="text-center">Product</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Rating</th>
                            <th class="text-center">Review</th>
                            <th class="text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${ratingList}" var="rating" varStatus="no">
                            <tr class="odd gradeX">
                                <td class="text-center fs-valign-middle">${no.index + 1}</td>
                                <td class="text-center fs-valign-middle">
                                    <img src="assets/images/products/${rating.product.urlImg}" width="80px" style="margin-bottom: 5px;">
                                    <div class="clearfix"></div>
                                    <a href="${rating.product.productID}-${rating.product.productColorListWorking[0].colorID}-${rating.product.productNameNA}.html">
                                        ${rating.product.productName}
                                    </a>
                                </td>
                                <td class="text-center fs-valign-middle">
                                    <div class="fs-rating-stt-icon" style="margin-bottom: 10px">
                                        <c:if test="${rating.status == 1}">
                                            <i class="fa fa-eye" aria-hidden="true" style="font-size: 25px; color: #23527C"></i>
                                        </c:if>
                                        <c:if test="${rating.status == 2}">
                                            <i class="fa fa-eye-slash" aria-hidden="true" style="font-size: 25px; color: orangered"></i>
                                        </c:if>
                                    </div>
                                    <select class="form-control fs-rating-status" fs-rating-id="${rating.ratingID}">
                                        <option value="0" <c:if test="${rating.status == 0}">selected</c:if>>Waiting</option>
                                        <option value="1" <c:if test="${rating.status == 1}">selected</c:if>>Show</option>
                                        <option value="2" <c:if test="${rating.status == 2}">selected</c:if>>Hide</option>
                                        </select>
                                    </td>
                                    <td class="text-center fs-valign-middle">
                                        <span style="font-size: 18px; font-weight: bold">${rating.rating}</span>
                                    <br>
                                    <c:forEach begin="1" end="${rating.rating}">
                                        <i class="fa fa-star" aria-hidden="true" style="color: #FFCC01"></i>
                                    </c:forEach>
                                </td>
                                <td class="text-center fs-valign-middle">${rating.review}</td>
                                <td class="text-center fs-valign-middle">
                                    <fmt:formatDate value="${rating.ratingDate}" pattern="dd-MM-yyyy"/>

                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
                <!-- /.table-responsive -->
                <div class="modal fade" id="fs-modal-confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h3 class="modal-title" id="myModalLabel"><b>Confirm Delete Category</b></h3>
                            </div>

                            <div class="modal-body">
                                <p>You are about to delete <b id="fs-modal-change-cate-subcate-name"></b> category!
                                <p>Do you want to proceed?</p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                <a id="fs-btn-delete-cate-subcate" class="btn btn-danger">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->
