<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>User Role</strong> 
                    <i class="fa fa-caret-right fa-style" aria-hidden="true" style="color: #337ab7"></i> 
                    <span style="font-size: 0.9em">List</span>
                </h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-lg-12">
                <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                    <thead>
                        <tr>
                            <!--<td align="center">No</td>-->
                            <td align="center">UserID</td>
                            <td align="center">Email</td>
                            <td align="center">Role Name</td>
                            <td align="center">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${rlist}" var="roles">
                        <tr class="odd gradeX">
                            <!--<td></td>-->
                            <td class="center" align="center">${roles.userID}</td>
                            <td class="center" align="center">${roles.email}</td>
                            <td class="center" align="center">${roles.role.roleName}</td>
                            <td class="center" align="center">
                                <a href="#" class="btn btn-primary">Add</a>
                                <a href="#" class="btn btn-warning">Update</a>
                            </td>
                        </tr>
                    </c:forEach>
<!--                        <tr class="even gradeC">
                            <td>Internet Explorer 5.0</td>
                            <td class="center">5</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="odd gradeA">
                            <td>Internet Explorer 5.5</td>
                            <td class="center">5.5</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="even gradeA">
                            <td>Internet Explorer 6</td>
                            <td class="center">6</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="odd gradeA">
                            <td>Internet Explorer 7</td>
                            <td class="center">7</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="even gradeA">
                            <td>AOL browser (AOL desktop)</td>
                            <td class="center">6</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Firefox 1.0</td>
                            <td class="center">1.7</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Firefox 1.5</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Firefox 2.0</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Firefox 3.0</td>
                            <td class="center">1.9</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Camino 1.0</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>OSX.3+</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Win 95+ / Mac OS 8.6-9.2</td>
                            <td class="center">1.7</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Netscape Browser 8</td>
                            <td class="center">1.7</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Netscape Navigator 9</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Mozilla 1.0</td>
                            <td class="center">1</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Win 95+ / OSX.1+</td>
                            <td class="center">1.1</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Gecko</td>
                            <td class="center">1.2</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Gecko</td>
                            <td class="center">1.3</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Mozilla 1.4</td>
                            <td class="center">1.4</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Mozilla 1.5</td>
                            <td class="center">1.5</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Gecko</td>
                            <td class="center">1.6</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Gecko</td>
                            <td class="center">1.7</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Mozilla 1.8</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Win 98+ / OSX.2+</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Epiphany 2.20</td>
                            <td class="center">1.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Safari 1.2</td>
                            <td class="center">125.5</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Safari 1.3</td>
                            <td class="center">312.8</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Safari 2.0</td>
                            <td class="center">419.3</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Safari 3.0</td>
                            <td class="center">522.1</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>OmniWeb 5.5</td>
                            <td class="center">420</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>iPod Touch / iPhone</td>
                            <td class="center">420.1</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>S60</td>
                            <td class="center">413</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 7.0</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 7.5</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 8.0</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 8.5</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 9.0</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 9.2</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera 9.5</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Opera for Wii</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Nokia N800</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Nintendo DS browser</td>
                            <td class="center">8.5</td>
                            <td class="center">C/A<sup>1</sup>
                            </td>
                        </tr>
                        <tr class="gradeC">
                            <td>Konqureror 3.1</td>
                            <td class="center">3.1</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Konqureror 3.3</td>
                            <td class="center">3.3</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Konqureror 3.5</td>
                            <td class="center">3.5</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeX">
                            <td>Internet Explorer 4.5</td>
                            <td class="center">-</td>
                            <td class="center">X</td>
                        </tr>
                        <tr class="gradeC">
                            <td>Internet Explorer 5.1</td>
                            <td class="center">1</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeC">
                            <td>Internet Explorer 5.2</td>
                            <td class="center">1</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeA">
                            <td>NetFront 3.1</td>
                            <td class="center">-</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeA">
                            <td>NetFront 3.4</td>
                            <td class="center">-</td>
                            <td class="center">A</td>
                        </tr>
                        <tr class="gradeX">
                            <td>Dillo 0.8</td>
                            <td class="center">-</td>
                            <td class="center">X</td>
                        </tr>
                        <tr class="gradeX">
                            <td>Links</td>
                            <td class="center">-</td>
                            <td class="center">X</td>
                        </tr>
                        <tr class="gradeX">
                            <td>Lynx</td>
                            <td class="center">-</td>
                            <td class="center">X</td>
                        </tr>
                        <tr class="gradeC">
                            <td>IE Mobile</td>
                            <td class="center">-</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeC">
                            <td>PSP browser</td>
                            <td class="center">-</td>
                            <td class="center">C</td>
                        </tr>
                        <tr class="gradeU">
                            <td>All others</td>
                            <td class="center">-</td>
                            <td class="center">U</td>
                        </tr>-->
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