<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid" id="fs-product-update-page">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Product <span id="fs-product-id" class="fs-display-none">${targetProduct.productID}</span></strong> 
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
                    <select id="fs-select-product-update-choose-first-task" class="form-control">
                        <option value="0">-- Choose a task! --</option>
                        <option value="1">Edit General Info</option>
                        <option value="2">Edit Color</option>
                        <option value="3">Edit Size</option>
                        <option value="4">Edit Product Sub-Image</option>
                    </select>
                </div>

                <div class="col-md-6 col-md-offset-3">
                    <select id="fs-select-product-update-choose-color" class="form-control fs-display-none">
                        <option value="0">-- Choose a color! --</option>
                        <c:forEach items="${targetProduct.productColorList}" var="productColor">
                            <option value="${productColor.colorID}">${productColor.color}</option>
                        </c:forEach>
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
            <!-- Product General Info -->
            <div class="col-lg-12 fs-display-none fs-select-product-update-task" id="fs-edit-product-general-info">
                <div class="col-lg-9 col-lg-offset-1">
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
                                    <c:forEach items="${categories}" var="cate">
                                        <option value="${cate.cateID}" <c:if test="${targetProduct.category.cateID == cate.cateID}">selected</c:if>>
                                            ${cate.cateName}
                                        </option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Sub-Category <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-control" name="subCategory" id="fs-product-sub-category">
                                    <c:forEach items="${subCateList}" var="subCate">
                                        <option value="${subCate.subCateID}" <c:if test="${targetProduct.subCate.subCateID == subCate.subCateID}">selected</c:if>>
                                            ${subCate.subCateName}
                                        </option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Product <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <input name="productName" 
                                       id="fs-product-name" 
                                       class="form-control" 
                                       placeholder="Product Name"
                                       value="${targetProduct.productName}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Price <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <input name="price" 
                                           id="fs-product-price" 
                                           class="form-control" 
                                           placeholder="Price"
                                           value="${targetProduct.price}">
                                    <span class="input-group-addon"><i class="fa fa-usd" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Discount</label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <input name="discount" 
                                           id="fs-product-discount" 
                                           class="form-control" 
                                           placeholder="Discount" 
                                           value="${targetProduct.productDiscount}">
                                    <span class="input-group-addon"><i class="fa fa-percent" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Image <span class="fs-color-red">*</span></label>
                            <div class="col-sm-9">
                                <img src="assets/images/products/${targetProduct.urlImg}" style="width: 100px"/>
                                <input name="urlImg" type="file" id="fs-product-main-img">
                                <input type="hidden" name="oldImg" value="${targetProduct.urlImg}"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3" for="description">Description</label>
                            <div class="col-sm-9">
                                <textarea name="description" class="form-control" rows="5" id="fs-product-description">
                                    ${targetProduct.productDescription}
                                </textarea>
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

            <!-- Product Color-->
            <div class="col-lg-12 fs-display-none fs-select-product-update-task" id="fs-edit-product-color">
                <div class="col-lg-7 col-lg-offset-2" style="border-bottom: 1px solid #cccccc">
                    <h3 class="text-center text-danger" 
                        style="border-bottom: 1px solid #eef1f5; padding-bottom: 10px;">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product Color
                    </h3>
                    <div>
                        ${error}
                    </div>
                    <p style="color:red; font-size: 13px"><i> <span>*</span> Drag and Drop Row to change COLOR Order</i></p>
                    <table class="table table-striped" id="fs-edit-product-table-color">
                        <thead>
                            <tr>
                                <th class="text-center fs-order">Order</th>
                                <th class="text-center">Color</th>
                                <th class="text-center">Color Image</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody style="cursor: move">
                            <c:forEach items="${targetProduct.productColorList}" var="color">
                                <tr class="text-center">
                                    <td>${color.colorOrder}</td>
                                    <td>${color.color}</td>
                                    <td>
                                        <img src="assets/images/products/colors/${color.urlColorImg}"/>
                                    </td>
                                    <td >
                                        <select class="form-control">
                                            <option value="0" <c:if test="${color.status == 0}">selected</c:if>>
                                                    Stopped
                                                </option>
                                                <option value="1" <c:if test="${color.status == 1}">selected</c:if>>
                                                    Working
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-warning"><i class="fa fa-wrench" aria-hidden="true"></i> Edit</button>
                                        </td>
                                    </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>

                <div class="col-xs-12 col-md-8 col-lg-6 col-md-offset-2" style="margin-top: 20px; border-bottom: 1px solid #cccccc">
                    <form class="form-horizontal" method="POST" action="" enctype="multipart/form-data">
                        <div class="form-group">
                            <label class="control-label col-xs-2" for="fs-edit-product-color">Color: </label>
                            <div class="col-xs-10">
                                <input type="text" class="form-control" id="fs-edit-product-color" placeholder="Enter Color">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-2" for="fs-edit-product-color">Image: </label>
                            <div class="col-xs-10">
                                <input type="file" id="fs-edit-product-color-img" name="fs-edit-product-color-img">
                            </div>
                        </div>
                        <div class="form-group"> 
                            <div class="col-xs-offset-2 col-xs-10">
                                <button type="submit" class="btn btn-primary"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Product Size -->
            <div class="col-lg-12 fs-display-none fs-select-product-update-task" id="fs-edit-product-size">
                <div class="col-lg-6 col-lg-offset-3" style="border-bottom: 1px solid #cccccc">
                    <h3 class="text-center text-danger" 
                        style="border-bottom: 1px solid #eef1f5; padding-bottom: 10px;">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product Size
                    </h3>
                    <div>
                        ${error}
                    </div>

                    <c:forEach items="${targetProduct.productColorList}" var="color">
                        <table class="table table-striped fs-display-none fs-edit-product-table-size" 
                               id="fs-edit-product-table-size-${color.colorID}">
                            <thead>
                                <tr>
                                    <th class="text-center">Size</th>
                                    <th class="text-center">Quantity</th>
                                    <th class="text-center">Status</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${color.sizeList}" var="size">
                                    <tr class="text-center">
                                        <td>${size.productSize}</td>
                                        <td>${size.quantity}</td>
                                        <td >
                                            <select class="form-control">
                                                <option value="0" <c:if test="${size.status == 0}">selected</c:if>>
                                                        Stopped
                                                    </option>
                                                    <option value="1" <c:if test="${size.status == 1}">selected</c:if>>
                                                        Working
                                                    </option>
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-warning"><i class="fa fa-wrench" aria-hidden="true"></i> Edit</button>
                                            </td>
                                        </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </c:forEach>
                </div>
            </div>

            <!-- Product SubImg -->
            <div class="col-lg-12 fs-display-none fs-select-product-update-task" id="fs-edit-product-sub-img">
                <div class="col-lg-10 col-lg-offset-1" style="border-bottom: 1px solid #cccccc">
                    <h3 class="text-center text-danger" 
                        style="border-bottom: 1px solid #eef1f5; padding-bottom: 10px;">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Product Sub Img
                    </h3>
                    <div>
                        ${error}
                    </div>
                    <p style="color:red; font-size: 13px"><i> <span>*</span> Drag and Drop Row to change IMAGE Order</i></p>
                    <c:forEach items="${targetProduct.productColorList}" var="color">
                        <form method="POST" action="" enctype="multipart/form-data">
                            <table class="table table-striped fs-edit-product-table-sub-img" 
                                   id="fs-edit-product-table-sub-img-${color.colorID}">
                                <thead>
                                    <tr>
                                        <th class="text-center">Order</th>
                                        <th class="text-center">Image</th>
                                        <th class="text-center">New Image</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody style="cursor: move;">
                                    <c:forEach items="${color.productSubImgsList}" var="subImg">

                                        <tr class="text-center">

                                            <td class="fs-valign-middle">${subImg.subImgOrder}</td>
                                            <td class="fs-valign-middle">
                                                <img src="assets/images/products/subImg/${subImg.urlImg}" style="width: 80px"/>
                                            </td>
                                            <td class="fs-valign-middle">
                                                <input type="file" name="fs-sub-img" id="fs-sub-img" disabled/>
                                            </td>
                                            <td class="fs-valign-middle">
                                                <button type="button" class="btn btn-warning">
                                                    <i class="fa fa-wrench" aria-hidden="true"></i> Edit
                                                </button>
                                                <button type="button" class="btn btn-danger">
                                                    <i class="fa fa-close" aria-hidden="true"></i> Delete
                                                </button>
                                            </td>
                                        </tr>

                                    </c:forEach>  
                                </tbody>
                            </table>
                        </form>    
                    </c:forEach>            
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </div>
</div>
<!-- /#page-wrapper -->