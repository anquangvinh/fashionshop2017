<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<style type="text/css">
    #area-chart{
        width: 840px;
        height: 300px;
    }
</style>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Orders</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">Chart</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="col-sm-6 text-center">
            <div id="area-chart" ></div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->
<script type="text/javascript">
    var data = [
        {y: "2014", a: 50, b: 90},
        {y: "2015", a: 65, b: 75},
        {y: "2016", a: 50, b: 50},
        {y: "2017", a: 75, b: 60},
        {y: "2018", a: 80, b: 65},
        {y: "2019", a: 90, b: 70},
        {y: "2020", a: 100, b: 75},
        {y: "2021", a: 115, b: 75},
        {y: "2022", a: 120, b: 85},
        {y: "2023", a: 145, b: 85},
        {y: "2024", a: 160, b: 95}
    ],
            config = {
                data: data,
                xkey: "y",
                ykeys: ["a", "b"],
                labels: ["Total Income", "Total Outcome"],
                fillOpacity: 0.6,
                hideHover: "auto",
                behaveLikeLine: true,
                resize: true,
                pointFillColors: ["#ffffff"],
                pointStrokeColors: ["black"],
                lineColors: ["gray", "red"]
            };
    config.element = "area-chart";
    Morris.Line(config);
</script>