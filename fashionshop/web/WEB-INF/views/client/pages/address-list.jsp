<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%--<%@include file="../pages/modaldetailAD.jsp" %>--%>
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<style>
    #fs-header{
        
        margin: 0;
        max-width: 100%;
        padding: 5px;
        text-align: center;
        overflow: auto;
        
        
    }
    div.fs-lv-bg{
        background: Lavender;
        color: #262626;
        height: 100px;
    }

    h1.fs-site-title{
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    .clickable{
        cursor: pointer;   
    }

    .panel-heading span {
        margin-top: -10px;
        font-size: 15px;
    }

    .fs-inner {
        padding: 30px;
    }
    /* headings */

    .container-fluid {
        font-family: 'Montserrat', sans-serif;
    }

</style>
<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-9">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>List Address</h4>                                                                  
                    <div class="account-form">
                        <div class="fs-lv-bg" id="fs-header" style="margin-top: -25px;">
                            <h1 class="fs-site-title">address by list</h1>
                            <p>this is my address</p>  
                        </div>
                        <br/><br/>
                        <!-- table address-list -->
                        <div class="panel panel-success fs-panel" style="margin-top: -20px;">
                            <div class="panel-heading" style="padding: 10px;">
                                <h3 class="panel-title text-center">Table Address</h3>
                                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
                            </div>
                            <div class="panel-body" style="margin-top: -40px;">
                                <div class="container-fluid fs-inner">
                                    <table class="table-hover fs-tableizer-table table">
                                        <tr class="fs-tableizer-firstrow">
                                            <th class="text-center" style="background: lavenderblush;padding: 10px;">NO</th>
                                            <th class="text-center" style="background: lavenderblush;padding: 10px;">ADDRESS</th>
                                            <th class="text-center" style="background: lavenderblush;padding: 10px;">PHONE</th>
                                            <th class="text-center" style="background: lavenderblush;padding: 10px;">ACTION</th>
                                        </tr>
                                        <c:forEach var="uad" items="${ualist}" varStatus="no">
                                            <tr>
                                                <td align="center" style="border: 4px #B8E834 #fff;
                                                    width: auto; padding: 10px;background: #f8f8f8">${no.index + 1}</td>
                                                <td align="center" style="border: 4px #B8E834 #fff;
                                                    width: auto; padding: 10px;background: #f8f8f8">${uad.address}</td>
                                                <td align="center" style="border: 4px #B8E834 #fff;
                                                    width: auto; padding: 10px;background: #f8f8f8">${uad.phoneNumber}</td>
                                                <td align="center" style="border: 4px #B8E834 #fff;
                                                    width: auto; padding: 10px;background: #f8f8f8">
                                                    <!--<a class="btn btn-warning" href="#ADModal" data-toggle="modal" data-target="#ADModal" >Update</a> |-->
                                                    <a class="btn btn-warning btn-sm" href="user/address-book/${findUsersID}-${uad.addressID}.html"><i class="fa fa-edit"></i> Update</a>
                                                    <a class="btn btn-danger btn-sm" id="fs-delete-button-AD"><i class="fa fa-remove"></i> Delete</a>
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </table>
                                </div>
                            </div>
                        </div>   
                        <div class="panel panel-warning fs-panel-add">
                            <div class="panel-heading" style="padding: 10px;">
                                <h3 class="panel-title text-center">Add New Address</h3>
                                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
                            </div>
                            <div class="panel-body">
                                <%--<form:form id="shipping-zip-form" action="user/address-add/${findUsersID}.html" method="post" modelAttribute="userAddress">--%>                                        
                                <form method="post" action="">
                                    ${error}
                                    <ul class="form-list row">
                                        <li class="col-md-6 col-sm-6">
                                            <label >Address <em>*</em></label>
                                            <%--<form:input path="address" id="txtaddress"  cssClass="input-text" fs-userID="${findUsersID}"/>--%>
                                            <input type="text" name="address" class="input-text"/>
                                            <span></span>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <label ><i class="fa fa-phone"></i> Phone Number <em>*</em></label>
                                            <%--<form:input path="phoneNumber" id="txtphone" cssClass="input-text" fs-userID="${findUsersID}" />--%>
                                            <input type="text" name="phoneNumber" class="input-text"/>
                                        </li>
                                    </ul>
                                    <div class="buttons-set">
                                        <button class="btn-black" type="submit"><span><span>Create</span></span></button>
                                        <a href="http://localhost:8080/fashionshop/user/address-list/${findUsersID}.html"><button class="btn-black" type="submit"><span><span>Cancel</span></span></button></a>
                                    </div>
                                </form>
                                <%--</form:form>--%>
                            </div>
                        </div>
                    </div>                                    
                </div>
            </div>

            <div class="col-sm-4 col-md-3  checkout-steps">
                <!-- USER-RIGHT-MENU -->
                <jsp:include page="../blocks/user-right-menu.jsp" flush="true" />
            </div>
        </div>
    </div>
</div>
<div class="clearfix space20"></div>
<!--DEMO-->
<!--<div id="ADModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" id="close" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">ADDRESS DETAIL</h3>
            </div>
            <div class="modal-body">
<%--<form:form id="shipping-zip-form" action="user/address-book/${findUsersID}-${addressID}.html" method="post" modelAttribute="userAddresses">--%>                                        
            </${error}
            <ul class="form-list row">
                <li class="col-md-6 col-sm-6">
                    <label >Address <em>*</em></label>
<%--<form:input path="address" id="txt-address" cssClass="input-text" />--%>
</li>

<li class="col-md-6 col-sm-6">
<label >Phone Number <em>*</em></label>
<%--<form:input path="phoneNumber" id="txt-phone" cssClass="input-text" />--%>
</li>
</ul>
<div class="buttons-set">
<button class="btn-black" type="submit"><span><span>Update</span></span></button>
</div>
<%--</form:form>--%>
</div>
</div>
</div>
</div>-->