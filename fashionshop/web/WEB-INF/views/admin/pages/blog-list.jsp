<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<base href="${pageContext.servletContext.contextPath}/"/> 
<!-- Page Content -->
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"> 
                    <strong>Blog</strong> 
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
                            <th>No.</th>
                            <th>Category</th>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Summary</th>
                            <th>Image</th>
                            <th>Content</th>
                            <th>Posted Date</th>
                            <th>Views</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${blogsList}" var="blogs">
                            <tr>
                                <td>${blogs.blogID}</td>

                                <td>
                                    ${blogs.blogCategory.blogCateName}
                                </td>  
                                <td>${blogs.user.userID}</td>
                                <td>${blogs.blogTitle}</td>
                                <td>${blogs.blogSummary}</td>
                                <td>${blogs.blogImg}</td>
                                <td>${blogs.content}</td>
                                <td>  
                                    <fmt:formatDate value="${blogs.postedDate}" pattern="dd-MM-YYYY" />
                                </td>
                                <td>${blogs.blogViews}</td>
                                <td>
                                    ${blogs.status}
                                </td>
                                <td>
                                    <a href="admin/blog/edit/${blogs.blogID}.html" class="btn btn-primary">Update</a>
                                </td>
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