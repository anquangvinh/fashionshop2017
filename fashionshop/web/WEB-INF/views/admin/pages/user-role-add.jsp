<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>User Role</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Create New Roles</span>
                </h1>

            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        ${status}
        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <form:form action="admin/user/role/create.html" method="post" modelAttribute="role">
                        <div class="form-group">
                            <label>Role Name:</label>
                            <form:input cssClass="form-control" path="roleName" />

                            <!--Error Message-->
                            <!--<p class="help-block">Error Message will be here!!!</p>-->
                        </div>

                        <button type="submit" class="btn btn-success">Create</button>
                        <button type="reset" class="btn btn-default">Reset</button>
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