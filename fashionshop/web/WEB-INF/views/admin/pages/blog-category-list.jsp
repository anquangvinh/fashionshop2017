<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Blog Category</strong> 
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
                            <th>No.</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <c:forEach items="${blogCategoriesList}" var="blogscate">
                            <tr>
                                <td>${blogscate.blogCateID}</td>
                                <td>
                                    <a href="admin/blog/list/${blogscate.blogCateID}.html">${blogscate.blogCateName}</a>
                                </td>  
                                <td>${blogscate.status}</td>
                                <td>
                                    <a href="http://localhost:39356/fashionshop/admin/blog/category/create.html" class="btn btn-primary">Create</a>
                                    <select class="btn btn-info">
                                        <option value="0">Enable</option>
                                        <option value="1">Disable</option>
                                    </select>
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