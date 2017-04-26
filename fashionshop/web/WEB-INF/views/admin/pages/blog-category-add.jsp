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
                    <form:form name="cateForm" action="admin/blog/category/create.html" method="POST" modelAttribute="categories" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="blogCateName">Category Name</label>
                            <p class="help-block" id="fs-blog-category-error"></p>
                            <form:input name="catename" path="blogCateName" id="fs-blog-category" cssClass="form-control" placeholder="Enter Blog Category Name" />
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <div>
                                <form:radiobutton path="status" value="0" checked="checked"/>Enable
                                <form:radiobutton path="status" value="1"/>Disable
                            </div>

                        </div>
                        <div>
                            <button type="submit" id="fs-button-create-blog-category" class="btn btn-success">Create</button>
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
</div>
<!-- /#page-wrapper -->