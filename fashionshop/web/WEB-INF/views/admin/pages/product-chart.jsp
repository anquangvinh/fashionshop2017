<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div id="page-wrapper" class="fs-product-chart-page">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Products Statistics</h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
        <div class="col-sm-2">
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" style="color: #fff" type="button" data-toggle="dropdown">
                    More Chart &nbsp;<span class="glyphicon glyphicon-cog"></span></button> 
                <ul class="dropdown-menu">
                    <li class="fs-menu-choose-cate-chart" fs-cate-id="0"><a>All</a></li>
                    <li class="divider"></li>
                        <c:forEach items="${cateList}" var="cate">
                        <li class="fs-menu-choose-cate-chart" fs-cate-id="${cate.cateID}">
                            <a>${cate.cateName}</a>
                        </li>
                    </c:forEach>
                </ul>
            </div>
        </div>
        <div class="col-sm-8">
            <div class="panel panel-default">
                <div class="panel-heading text-center text-capitalize" style="font-size: 24px" id="fs-chart-heading-panel">
                    Number Of Products In Category
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <div class="fs-flot-pie-chart">
                        <div class="flot-chart-content" id="fs-category-flot-pie-chart"></div>
                    </div>
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
</div>
<!-- /#page-wrapper -->