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
                    <span style="font-size: 0.9em">Edit Info</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <form:form role="form">
                        <div class="form-group">
                            <label>Category</label>
                            <form:input class="form-control" path="blogCateName"/>
                            <!--Error Message-->
                            <p class="help-block">Error Message will be here!!!</p>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <div>
                                <label class="radio-inline">
                                    <form:radiobutton path="status" value="0" id="rdoEnable" label="Enable" />
                                </label>
                                <label class="radio-inline">
                                    <form:radiobutton path="status" value="1" id="rdoDisable" label="Disable" />
                                </label>
                            </div>

                        </div>

                                    <form:button type="submit" class="btn btn-warning">Update</form:button>
                                    <form:button type="reset" class="btn btn-default">Reset</form:button>
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