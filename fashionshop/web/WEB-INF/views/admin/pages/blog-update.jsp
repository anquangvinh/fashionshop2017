<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%@taglib uri="http://cksource.com/ckfinder" prefix="ckfinder" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">

                <h1 class="page-header"> 
                    <strong>Blog</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Edit Info</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <form:form action="" id="fs-form-update-blog" name="blogupdateForm" method="POST" modelAttribute="targetBlogs" enctype="multipart/form-data">
                  <div class="col-lg-12">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label>Categories</label>
                            <form:select path="blogCategory.blogCateID" cssClass="form-control">
                                <form:option value="0"> Please Select </form:option>
                                <form:options items="${blogcategory}" itemValue="blogCateID" itemLabel="blogCateName" />
                            </form:select>
                        </div>
<!--                        <div class="form-group">
                            <label>User name</label>
                            <form:select path="user.userID" cssClass="form-control">
                                <form:option value="0"> Please Select </form:option>
                                <form:options items="${user}" itemValue="userID" itemLabel="firstName" />
                            </form:select>
                        </div>-->
                        <div class="form-group">
                            <label>Title</label>  
                            <p class="help-block" id="fs-blog-update-title-error"></p>
                            <form:input path="blogTitle" id="fs-blog-update-line-title" cssClass="form-control" />
                            <!--Error Message-->
                            <div style="color:red; margin-top: 10px;">
                                <form:errors path="blogTitle"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Summary</label>
                            <p class="help-block" id="fs-blog-update-summary-error"></p>
                            <form:input path="blogSummary" id="fs-blog-update-line-summary" cssClass="form-control" />
                            <!--Error Message-->
                            <div style="color:red; margin-top: 10px;">
                                <form:errors path="blogSummary"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div>
                                <label>Image</label>
                                <input type="file" id="upImage" name="upImage">
                            </div>
                            <div id="image-load"></div>
                            <script>
                                $("#upImage").on('change', function () {
                                    if (typeof (FileReader) !== "undefined") {
                                        var image_holder = $("#image-load");
                                        image_holder.empty();

                                        var reader = new FileReader();
                                        reader.onload = function (e) {
                                            $("<img />", {
                                                "src": e.target.result,
                                                "class": "thumb-image"
                                            }).appendTo(image_holder);
                                        };
                                        image_holder.show();
                                        reader.readAsDataURL($(this)[0].files[0]);
                                    }
                                    else {
                                        alert("Your Browser does not support FileReader!.");
                                    }
                                });
                            </script>
                        </div>
                        <br/>
<!--                        <div class="form-group">
                            <label>Date</label>
                            <form:input path="postedDate" cssClass="form-control" />
                            Error Message
                            <div style="color:red; margin-top: 10px;">
                                <form:errors path="postedDate"/>
                            </div>
                        </div>-->
                        <div class="form-group">
                            <label>Content</label>
                            <br/>
                            <!--CKEditor-->
                            <form action="getContent" method="get">
                                <textarea cols="80" id="editor1" name="editor1" rows="10"></textarea>				
                            </form>
                            <ckfinder:setupCKEditor basePath="assets/ckfinder/" editor="editor1" />
                            <ckeditor:replace replace="editor1" basePath="assets/ckeditor/" />
                            <!--Error Message-->
                            <div style="color:red; margin-top: 10px;">
                                <form:errors path="content"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <div>
                                <label class="radio-inline">
                                    <form:radiobutton path="status" value="0" id="rdoEnable" label="Enable" />
                                    <!--                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="0" checked>Enable-->
                                </label>
                                <label class="radio-inline">
                                    <form:radiobutton path="status" value="1" id="rdoDisable" label="Disable" />
                                    <!--                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="1">Disable-->
                                </label>


                            </div>
                        </div>
                        ${status}
                        <form:button id="fs-button-update-blog" type="submit" class="btn btn-success" style="width: 30%" onclick="return confirm('Are you sure you want to change??!')">Update</form:button>
                        <form:button type="reset" class="btn btn-default">Reset</form:button>
                        </div>
                    </div>
            </form:form>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->