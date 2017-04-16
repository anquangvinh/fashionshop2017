<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>User Role</strong> 
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
                            <td class="text-center fs-valign-middle">No</td>
                            <td class="text-center fs-valign-middle">Role Name</td>
                            <td class="text-center fs-valign-middle">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${rlist}" var="roles" varStatus="no">
                            <tr class="odd gradeX">
                                <td class="text-center fs-valign-middle">${no.index + 1}</td>
                                <td class="text-center fs-valign-middle">${roles.roleName}</td>
                                <td class="text-center fs-valign-middle">
                                    <a href="admin/user/role/edit/${roles.roleID}.html" class="btn btn-warning">Update</a>
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