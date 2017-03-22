<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Product Category</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Create New</span>
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
                            <input class="form-control" placeholder="Enter Product Category Name">

                            <!--Error Message-->
                            <p class="help-block">Error Message will be here!!!</p>
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

                        <button type="submit" class="btn btn-success">Create</button>
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