<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Product</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Edit Info</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="col-md-6 col-md-offset-3 form-group">
                    <select id="fs-select-product-update-task" class="form-control">
                        <option value="0">-- Choose a task! --</option>
                        <option value="1">Edit General Info</option>
                        <option value="2">Edit Detail Info</option>
                        <option value="3">Add More Color</option>
                    </select>
                </div>
                <div class="col-md-6 col-md-offset-3">
                    <select id="fs-select-product-update-color" class="form-control fs-display-none">
                        <option value="0">-- Choose a color! --</option>
                        <option value="1">Red</option>
                        <option value="2">Blue</option>
                        <option value="2">Green</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12" style="padding: 0; margin: 0;">
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 fs-display-none" id="fs-edit-product-general-info">
                <div class="col-lg-8 col-lg-offset-2">
                    <h3 class="text-center" 
                        style="border-bottom: 1px solid #eef1f5; color: #32c5d2; padding-bottom: 10px;">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product General Info
                    </h3>
                    <div>
                        ${error}
                    </div>
                    <form method="POST" action="" class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-sm-3">Category <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-control" name="category" id="fs-product-category">
                                    <option value="0">-- Please select category --</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Sub-Category <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-control" name="subCategory" id="fs-product-sub-category">
                                    <option value="0">-- Please select sub-category --</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Product <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input name="productName" id="fs-product-name" class="form-control" placeholder="Product Name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Price <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <input name="price" id="fs-product-price" class="form-control" placeholder="Price">
                                    <span class="input-group-addon"><i class="fa fa-usd" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Discount</label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <input name="discount" id="fs-product-discount" class="form-control" placeholder="Discount" value="0">
                                    <span class="input-group-addon"><i class="fa fa-percent" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Image <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input name="urlImg" type="file" id="fs-product-main-img">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3" for="description">Description</label>
                            <div class="col-sm-9">
                                <textarea name="description" class="form-control" rows="5" id="fs-product-description"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                                <button type="submit" class="btn btn-warning">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update
                                </button>
                                <button type="reset" class="btn btn-default">
                                    <i class="fa fa-undo" aria-hidden="true"></i> Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /.col-lg-12 -->

            <div class="col-lg-12 fs-display-none" id="fs-edit-product-detail-info">
                <div class="col-lg-8 col-lg-offset-2">
                    <h3 class="text-center text-danger" 
                        style="border-bottom: 1px solid #eef1f5; padding-bottom: 10px;">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product Detail Info
                    </h3>
                    <div>
                        ${error}
                    </div>
                    <form method="POST" action="" class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-sm-3">Color <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input name="color" class="form-control fs-product-color-name" id="fs-product-color-name" placeholder="Color">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Sub-Category <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input type="file" name="colorImg[]" id="fs-product-color-img" class="colorImg">
                            </div>
                        </div>

                        <div class="col-xs-12" style="padding: 0;">
                            <div class="col-xs-8" style="padding: 0; border: 1px #CCC dashed; margin-bottom: 5px;">
                                <div class="form-group col-xs-6">
                                    <label>Size <span class="fs-color-red">*</span></label>
                                    <input id="fs-product-size" name="size" class="form-control fs-product-size" placeholder="Size" style="text-transform:uppercase">
                                </div>

                                <div class="form-group col-xs-6">
                                    <label>Quantity <span class="fs-color-red">*</span></label>
                                    <input id="fs-product-quantity" name="quantity" class="form-control fs-product-quantity" placeholder="Quantity">
                                </div>
                                <p class="fs-error-mess-size" style="color: red; margin-left: 15px"></p>
                                <p class="fs-error-mess-quantity" style="color: red; margin-left: 15px"></p>
                            </div>

                            <span class="fs-more-size"></span>

                            <div class="form-group col-xs-4" style="margin-top: 20px">
                                <button type="button" class="btn btn-warning fs-add-more-size" title="Add More Size">
                                    <i class="fa fa-plus" aria-hidden="true"></i> Add Size
                                </button>
                            </div>                               
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Sub Image <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input name="productSubImg" class="fs-productSubImg" type="file" multiple="multiple">
                            </div>
                        </div>         

                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                                <button type="submit" class="btn btn-warning">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update
                                </button>
                                <button type="reset" class="btn btn-default">
                                    <i class="fa fa-undo" aria-hidden="true"></i> Reset
                                </button>
                            </div>
                        </div>
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