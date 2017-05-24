<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>User</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">User Statistics</span>
                </h1>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered">
                    <tr>
                        <th class="text-center fs-valign-middle" colspan="2">TOTAL GENDER</th>
                    </tr>
                    <tr>
                        <th class="text-center">MALE</th>
                        <th class="text-center">FEMALE</th>
                    </tr>
                    <tr>
                        <th class="text-center">${genderm}</th>
                        <th class="text-center">${genderfm}</th>
                </table>
            </div>
        </div>
        
        <div>
            <table width="100%" class="table table-striped table-bordered fs-order-line-chart">
                <tr>
                    <th class="text-center fs-valign-middle" colspan="2">TOTAL REGISTER IN YEAR</th>
                </tr>
                <tr>
                    <th class="text-center">YEAR : 
                        <select id="fs-register-year-select">
                            <c:forEach items="${listYearRegis}" var="year">
                                <option value="${year}">${year}</option>
                            </c:forEach>
                        </select>
                    </th>
                </tr>
                <tr>
                    <td class="text-center fs-valign-middle" colspan="2" id="day-money-order-chart-div">
                        <div class="fs-valign-middle" id="user-bar-chart" ></div>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
</div>
               
<script type="text/javascript">

</script>