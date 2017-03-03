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
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <form role="form">
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control">
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                                <option>Category 4</option>
                                <option>Category 5</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input class="form-control" placeholder="Enter Blog Title">

                            <!--Error Message-->
                            <p class="help-block">Error Message will be here!!!</p>
                        </div>

                        <div class="form-group">
                            <label>Summary</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Avata</label>
                            <input type="file">

                            <!--Error Message-->
                            <p class="help-block">Error Message will be here!!!</p>
                        </div>

                        <div class="form-group">
                            <label>Date</label>
                            <input class="form-control" placeholder="Choose the day that the blog will be posted!">

                            <!--Error Message-->
                            <p class="help-block">Error Message will be here!!!</p>
                        </div>

                        <div class="form-group">
                            <label>Content</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Status</label>
                            <div>
                                <label class="radio-inline">
                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked>Visible
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">Invisible
                                </label>
                            </div>

                        </div>

                        <button type="submit" class="btn btn-warning">Update</button>
                        <button type="reset" class="btn btn-default">Reset</button>
                    </form>
                </div>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->