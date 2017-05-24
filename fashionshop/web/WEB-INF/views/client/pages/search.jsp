<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!-- BREADCRUMBS -->
<div class="bcrumbs">
    <div class="container">
        <ul>
            <li><a href="./">Home</a></li>
            <li>Search</li>
        </ul>
    </div>
</div>


<!-- SHOP CONTENT -->
<div class="shop-content" id="fs-search-content">
    <div class="container">
        <div class="row" style="margin-bottom: 20px">
            <div class="col-xs-12">
                <h3> Searched Keyword: "<strong id="fs-searched-keyword">${searchedKeyword}</strong>" </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <c:if test="${not empty productsList}">
                <div class="row">
                    <label class="col-xs-2 col-lg-1 text-right">Filter by</label>
                    <div class="col-xs-5">
                        <select class="form-control" id="fs-filter-product-by-category">
                            <option value="0">-- Category --</option>
                            <c:forEach items="${cateList}" var="cate">
                                <option value="${cate.cateID}">${cate.cateName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-xs-5">
                        <select class="form-control" id="fs-filter-product-by-sub-category" disabled>
                            <option value="0">-- Sub-Category --</option>
                        </select>
                    </div>
                </div>

                <div class="space50"></div>
                <div class="row" style="position: relative;">
                    <div id="fs-ajax-loading"></div>
                    <div id="fs-search-content-change-here">
                        <c:forEach items="${productsList}" var="product">
                            <div class="col-md-3 col-sm-6">
                                <div class="product-item">
                                    <div class="item-thumb">
                                        <c:if test="${product.productDiscount > 0}">
                                            <span class="badge offer">-${product.productDiscount}%</span>
                                        </c:if>
                                        <img src="assets/images/products/${product.urlImg}" 
                                             class="img-responsive" 
                                             alt="${product.urlImg}"
                                             fs-product-for-img="${product.productID}"/>
                                        <div class="overlay-rmore fa fa-search quickview fs-product-modal" 
                                             data-toggle="modal" 
                                             fs-product="${product.productID}" 
                                             fs-product-modal-color="${product.productColorListWorking[0].colorID}">
                                        </div>
                                        <div class="product-overlay">
                                            <!--                                                 <a href="#" class="addcart fa fa-shopping-cart"></a> -->
                                            <a href="#" class="likeitem fa fa-heart-o"></a>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-title">
                                            <a href="${product.productID}-${product.productColorListWorking[0].colorID}-${product.productNameNA}.html">
                                                ${product.productName}
                                            </a>
                                        </h4>
                                        <span class="product-price">
                                            <c:if test="${product.productDiscount > 0}">
                                                <small class="cutprice">$ ${product.price}0 </small>  $
                                                <fmt:formatNumber type="number" maxFractionDigits="2" value="${product.price - (product.price*product.productDiscount/100)}" var="prodPrice"/>
                                                ${fn:replace(prodPrice, ",", ".")}
                                            </c:if>
                                            <c:if test="${product.productDiscount == 0}">
                                                $ ${product.price}0
                                            </c:if>
                                        </span>
                                        <div class="item-colors" style="height: 25px;">
                                            <c:if test="${product.productColorListWorking.size() > 1}">
                                                <c:forEach items="${product.productColorListWorking}" var="color">
                                                    <img src="assets/images/products/colors/${color.urlColorImg}" 
                                                         class="img-responsive fs-index-color-img" 
                                                         fs-index-color-img="${color.colorID}" 
                                                         fs-product="${product.productID}" 
                                                         alt="${color.urlColorImg}" 
                                                         title="${color.color}"/>
                                                </c:forEach>
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                </c:if>
                <c:if test="${empty productsList}">
                    <h4>Sorry!, Nothing was found...</h4>
                </c:if>
            </div>
        </div>
        <div class="space50"></div>

    </div>

</div>

<div class="clearfix space20"></div>

<!-- MODAL -->
<jsp:include page="../blocks/modal.jsp" flush="true" />