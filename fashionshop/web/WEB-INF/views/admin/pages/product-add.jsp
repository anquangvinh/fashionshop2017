<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">

                <h1 class="page-header"> 
                    <strong>Product</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Create New</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row text-center">
            <ul id="fs-product-add-progressbar">
                <li class="active">General Info</li>
                <li>Detail Info</li>
            </ul>
        </div>
        <div class="row">
            <form id="msform">
                <div class="col-lg-12">
                    <fieldset class="form-group">
                        <div class="col-lg-6 col-lg-offset-3">
                            <legend class="text-center">General Information</legend>
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
                                <label>Sub-Category</label>
                                <select class="form-control">
                                    <option>Sub-Category 1</option>
                                    <option>Sub-Category 2</option>
                                    <option>Sub-Category 3</option>
                                    <option>Sub-Category 4</option>
                                    <option>Sub-Category 5</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Product</label>
                                <input class="form-control" placeholder="Enter Product Name">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Price</label>
                                <input class="form-control" placeholder="Enter Price">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Image</label>
                                <input type="file">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Discount</label>
                                <input class="form-control" placeholder="Enter Discount">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" rows="5" id="description"></textarea>
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
                            <hr>
                            <div class="form-group text-right">
                                <button type="button" class="btn next"><i class="fa fa-arrow-circle-right" style="font-size: 18px"></i>
                                    Next
                                </button>
                            </div>
                        </div>
                    </fieldset><!-- /fieldset -->

                    <fieldset class="form-group">
                        <div class="col-lg-6 col-lg-offset-3">
                            <legend class="text-center">Detail Information</legend>
                            <div class="form-group">
                                <label>Color</label>
                                <input class="form-control" placeholder="Enter Color">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Color Image</label>
                                <input type="file">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
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

                            <div class="form-group">
                                <label>Product Sub Image</label>
                                <input type="file" multiple="multiple">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Size</label>
                                <input class="form-control" placeholder="Enter Size">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
                            </div>

                            <div class="form-group">
                                <label>Quantity</label>
                                <input class="form-control" placeholder="Enter Quantity">

                                <!--Error Message-->
                                <!-- <p class="help-block">Error Message will be here!!!</p>-->
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
                            
                            <!--Noi tiep tai day-->
                            <hr>
                            <div class="form-group text-right">
                                <button type="button" class="btn previous" style="float:left !important;">
                                    <i class="fa fa-arrow-circle-left" style="font-size: 18px"></i> Prev
                                </button>
                                <button type="reset" class="btn btn-default"><i class="fa fa-undo" aria-hidden="true"></i> Reset</button>
                                <button type="submit" class="btn btn-success"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create</button>                               
                            </div>
                        </div>                     
                    </fieldset>
                </div><!-- /.col-lg-12 -->
            </form>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->