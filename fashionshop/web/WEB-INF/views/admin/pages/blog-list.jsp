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
                            <th class="text-center fs-valign-middle">No.</th>
                            <th class="text-center fs-valign-middle">Category</th>
                            <th class="text-center fs-valign-middle">Poster</th>
                            <th class="text-center fs-valign-middle">Title</th>
                            <th class="text-center fs-valign-middle">Summary</th>
                            <th class="text-center fs-valign-middle">Image</th>
                            <th class="text-center fs-valign-middle">Content</th>
                            <th class="text-center fs-valign-middle">Posted Date</th>
                            <th class="text-center fs-valign-middle">Views</th>
                            <th class="text-center fs-valign-middle">Status</th>
                            <th class="text-center fs-valign-middle">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        <c:forEach items="${blogsList}" var="blogs">
                            <tr>
                                <td class="text-center fs-valign-middle">${blogs.blogID}</td>

                                <td class="text-center fs-valign-middle">
                                    ${blogs.blogCategory.blogCateName}
                                </td>  
                                <td class="text-center fs-valign-middle">${blogs.user.lastName} ${blogs.user.firstName}</td>
                                <td class="text-center fs-valign-middle">${blogs.blogTitle}</td>
                                <td class="text-center fs-valign-middle">${blogs.blogSummary}</td>
                                <td class="text-center fs-valign-middle">
                                     <img class="responsive" style="width: 100px" src="assets/images/blog/1/${blogs.blogImg}" alt=""/>
                                </td>
                                <td class="text-center fs-valign-middle">${blogs.content}</td>
                                <td class="text-center fs-valign-middle">  
                                    <fmt:formatDate value="${blogs.postedDate}" pattern="dd-MM-YYYY" />
                                </td>
                                <td class="text-center fs-valign-middle">${blogs.blogViews}</td>
                                <td class="text-center fs-valign-middle">
                                    ${blogs.status}
                                </td>
                                <td>
                                    <a href="admin/blog/edit/${blogs.blogID}.html" class="btn btn-warning">Update  <i class="fa fa-edit"></i></a>
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