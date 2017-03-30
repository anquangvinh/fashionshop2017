<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Product</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered table-hover" id="productList_dataTable">
                    <thead>
                        <tr>
                            <th class="text-center fs-valign-middle" style="width: 7%">No</th>
                            <th class="text-center fs-valign-middle" style="width: 15%">Category - SubCategory</th>
                            <th class="text-center fs-valign-middle" style="width: 20%">Product</th>
                            <th class="text-center fs-valign-middle" style="width: 15%">Image</th>
                            <th class="text-center fs-valign-middle" style="width: 15%">Posted Date</th>
                            <th class="text-center fs-valign-middle" >Status</th>
                            <th class="text-center fs-valign-middle">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <c:forEach items="${productList}" var="product" varStatus="No">
                            <tr class="odd gradeX">
                                <td class="text-center fs-valign-middle">${No.index + 1}</td>
                                <td class="text-center fs-valign-middle">${product.subCate.category.cateName} - ${product.subCate.subCateName}</td>
                                <td class="text-center fs-valign-middle">${product.productName}</td>
                                <td class="text-center fs-valign-middle">
                                    <img class="responsive" style="width: 60%" src="assets/images/products/${product.urlImg}" alt="${product.urlImg}"/>
                                </td>
                                <td class="text-center fs-valign-middle">
                                    <fmt:formatDate pattern="dd/MM/yyyy" value="${product.postedDate}"/>
                                </td>
                                <td class="text-center fs-valign-middle">${product.status}</td>
                                <td class="text-center fs-valign-middle">
                                    <a href="#" class="btn btn-warning">Update</a>
                                    <a href="#" class="btn btn-danger">Delete</a>
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
