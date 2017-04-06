<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Blog Category</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Create New</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <div>
                    ${error}
                <div class="col-lg-6">
                    <form:form action="admin/blog/category/create.html" method="POST" modelAttribute="categories" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="blogCateName">Category Name</label>
                             <form:input path="blogCateName" cssClass="form-control" placeholder="Enter Blog Category Name" />
                            <!--Error Message-->
                            <form:errors path="blogCateName"/>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <div>
<!--                                <label class="radio-inline">
                                    <input type="radio" name="radioEnable" id="optionsRadiosInline1" value="0" checked>Enable
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="radioDisable" id="optionsRadiosInline2" value="1">Disable
                                </label>-->
                                <form:radiobutton path="status" value="0" checked="checked"/>Enable
                                <form:radiobutton path="status" value="1"/>Disable
                            </div>

                        </div>
                        <div>
                            <button type="submit" class="btn btn-success">Create</button>
                            <button type="reset" class="btn btn-default">Reset</button>
                        </div>
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