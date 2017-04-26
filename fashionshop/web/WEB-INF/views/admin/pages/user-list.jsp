<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>User</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered table-hover" id="fs-user-dataTables">
                    <thead>
                        <tr>
                            <th align="center"></th>
                            <td align="center">No</td>
                            <td align="center">Email</td>
                            <td align="center">First Name</td>
                            <td align="center">Last Name</td>
                            <td align="center">Gender</td>
                            <td align="center">Birth Day</td>
                            <td align="center">Registration Date</td>
                            <td align="center">Status</td>
                            <td align="center">Role</td>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${ulist}" var="users" varStatus="no">
                            <tr class="odd gradeX">
                                <td align="center" class="details-control fs-user-dataTable-control-button" fs-userID="${users.userID}"></td>
                                <td class="center" align="center">${no.index + 1}</td>
                                <td class="center" align="center">${users.email}</td>
                                <td class="center" align="center">${users.firstName}</td>
                                <td class="center" align="center">${users.lastName}</td>
                                <c:if test="${users.gender == 1}">
                                    <td class="center" align="center">MALE</td>
                                </c:if>
                                <c:if test="${users.gender == 0}">
                                    <td class="center" align="center">FEMALE</td>
                                </c:if>
                                <td class="center" align="center">
                                    <fmt:formatDate pattern="dd/MM/yyyy" value="${users.birthday}"/>
                                </td>
                                <td class="center" align="center">
                                    <fmt:formatDate pattern="dd/MM/yyyy" value="${users.registrationDate}"/>
                                </td>
                                <c:if test="${users.userID != 1}">
                                <td align="center">
                                    <select name="status" fs-user="${users.userID}" class="fs-select-user-status form-control input-sm">
                                        <option value="1" <c:if test="${users.status == 1}">selected</c:if>>WORKING</option>
                                        <option value="0" <c:if test="${users.status == 0}">selected</c:if>>BANNED</option>
                                    </select>
                                </td>
                                </c:if>
                                <c:if test="${users.userID == 1}">
                                    <td class="center" align="center">
                                        <c:if test="${users.status == 1}">
                                           WORKING
                                        </c:if>
                                    </td>
                                </c:if>
                                <c:if test="${users.userID != 1}">
                                <td class="center" align="center">
                                    <select class="fs-select-user-role form-control input-sm" fs-user="${users.userID}" >
                                        <c:forEach items="${roles}" var="role">
                                            <option <c:if test="${users.role.roleID == role.roleID}">selected</c:if> value="${role.roleID}">${role.roleName}</option>
                                        </c:forEach>
                                    </select>   
                                </td>
                                </c:if>
                                <c:if test="${users.userID == 1}">
                                    <td class="center" align="center">
                                        ${users.role.roleName}
                                    </td>
                                </c:if>
                            </tr>
                    </c:forEach>
                </tbody>
            </table>
            <!-- /.table-responsive -->
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
</div>
<!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->