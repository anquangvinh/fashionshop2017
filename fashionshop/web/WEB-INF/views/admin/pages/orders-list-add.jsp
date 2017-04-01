<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">

                <h1 class="page-header"> 
                    <strong>Orders</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List Detail - Create New</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <form:form action="" method="POST" modelAttribute="orderDetail">
                        <div class="form-group">
                            <label>Category</label>
                            <form:select path="" 
                                         id="category"
                                         name="category"
                                         items="${categories}" 
                                         itemValue="cateID" 
                                         itemLabel="cateName" 
                                         cssClass="form-control"/>
                        </div>
                        <div class="form-group">
                            <label>Sub-Category</label>
                            <form:select path="" 
                                         id="subcategory"
                                         name="subcategory"
                                         items="${categories}" 
                                         itemValue="cateID" 
                                         itemLabel="cateName" 
                                         cssClass="form-control"/>
                        </div>
                        <button type="submit" class="btn btn-success">Create</button>
                        <button type="reset" class="btn btn-default">Reset</button>
                    </form:form>
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
<script type="text/javascript">
//    $category = $('#category');
//    $category.change(
//        function(){
//            $.ajax({
//               type: 'GET',
//               url: "admin/orders/getSubCategoryByCateID.html",
//               data: {cateID: $category.attr("selectedIndex")},
//               success: function (data) {
//                        $('#subcategory').html()
//                    }
//            });
//        }
//    );
</script>