<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<base href="${pageContext.servletContext.contextPath}/"/> 
<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<div class="space10"></div>

<!-- BLOG CONTENT -->
<div class="blog-content">
    <div class="container">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-sm-4">
                <div class="side-widget space50">
                    <h3><span>Search</span></h3>
                    <form role="form" class="search-widget">
                        <input class="form-control" type="text">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="side-widget space50">
                    <h3><span>Categories</span></h3>
                    <c:forEach items="${getBlogCateList}" var="blogcateclientcate">
                        <ul class="list-unstyled cat-list">
                            <li><a href="blog-categories/${blogcateclientcate.blogCateID}.html">${blogcateclientcate.blogCateName}</a></li>     
                        </ul>
                    </c:forEach>
                </div>
                <div class="side-widget space50">
                    <h3><span>Popular Post</span></h3>
                    <ul class="list-unstyled popular-post">
                        <c:forEach items="${PopularPosts}" var="blogpopularclient" begin="0" end="2" varStatus="no">
                            <li>
                                <div class="popular-img">
                                    <a href="blog-detail/${blogpopularclient.blogID}.html"> <img src="assets/images/blog/1/${blogpopularclient.blogImg}" class="img-responsive" alt=""></a>
                                </div>
                                <div class="popular-desc">
                                    <h5> <a href="blog-detail/${blogpopularclient.blogID}.html">${blogpopularclient.blogTitle}</a></h5>
                                    <span>By ${blogpopularclient.user.lastName} ${blogpopularclient.user.firstName}</span>
                                </div>
                            </li>
                        </c:forEach>

                    </ul>
                </div>
                <div class="side-widget space50">
                    <h3><span>Archives</span></h3>
                    <ul class="list-unstyled cat-list">
                        <li> <a href="#">June 2015</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">May 2015</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">April 2015</a> <i class="icon-plus2"></i></li>
                    </ul>
                </div>
            </aside>
            <div class="col-md-9 col-sm-8 blog-content">
                <article class="blogpost">
                    <div class="space30"></div>
                    <!-- Media Gallery -->
                    <div class="post-media">
                        <div class="blog-slider">
                            <div class="item">						
                                <img src="" class="img-responsive" alt="">
                                <img src="assets/images/blog/1/a3size.jpg" alt=""/>
                            </div>
                            <div class="item">						
                                <img src="" class="img-responsive" alt="">
                                <img src="assets/images/blog/1/a2size.jpg" alt=""/>
                            </div>
                            <div class="item">						
                                <img src="assets/images/blog/1/a1size.jpg"  class="img-responsive" alt="">
                            </div>
                        </div>
                    </div>
                </article>

                <c:forEach items="${getBlogsListByCate}" var="blogclient" begin="0" end="10" varStatus="no">
                    <div class="col-md-9 col-sm-8 blog-content">
                        <article class="blogpost">
                            <blockquote class="style2">
                                <span class="icon-quote"></span>
                                <div class="quote-one-right">
                                     <p>Posts.${blogclient.blogID}</p>
                                    <p>${blogclient.blogTitle}</p>
                                </div>
                            </blockquote>
                            <div class="quote-meta">
                                <div class="post-meta">
                                    <span><i class="fa fa-calendar"></i>&nbsp; ${blogclient.postedDate}</span>
                                    <span><i class="fa fa-user"></i> ${blogclient.user.firstName}</span>
                                   <span><i class="fa fa-folder"></i><a href="blog-categories/${blogclient.blogCategory.blogCateID}.html">&nbsp; ${blogclient.blogCategory.blogCateName}</a></span>
                                </div>
                                <div class="space20"></div>
                                 <div class="post-media">
                                    <img src="assets/images/blog/1/${blogclient.blogImg}" class="img-responsive" alt="">
                                </div>
                                <div class="post-excerpt">
                                    <p>${blogclient.blogSummary}</p>
                                </div>
                                <a href="blog-detail/${blogclient.blogID}.html" class="btn-black">Read More&nbsp;<i class="fa fa-angle-right"></i></a>
                            </div>
                        </article>
                        <div class="blog-sep"></div>
                    </div>
                </c:forEach>
                <!-- End Content -->
            </div>
        </div>
    </div>
</div>
    <div class="clearfix space20"></div>