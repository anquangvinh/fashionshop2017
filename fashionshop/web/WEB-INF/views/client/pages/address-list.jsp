<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<!-- MY ACCOUNT -->
<div class="account-wrap">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-9">
                <!-- HTML -->
                <div id="account-id">
                    <h4 class="account-title"><span class="fa fa-chevron-right"></span>Change Your Address</h4>                                                                  
                    <div class="account-form">
                        <table class="table table-hover">
                            <tr>
                                <th class="text-center">No</th>
                                <th class="text-center">Address</th>
                                <th class="text-center">Phone</th>
                                <th class="text-center">Action</th>
                            </tr>
                            <c:forEach var="uad" items="${ualist}" varStatus="no">
                                <tr>
                                    <td align="center">${no.index + 1}</td>
                                    <td>${uad.address}</td>
                                    <td>${uad.phoneNumber}</td>
                                    <td>
                                        <a class="btn btn-warning" href="user/address-book/${findUsersID}-${uad.addressID}.html">Update</a> 
                                        <a class="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </table>
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
