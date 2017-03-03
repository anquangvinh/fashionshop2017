<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
                    <ul class="list-unstyled cat-list">
                        <li> <a href="#">Marketing</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">Photography</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">Webdesign</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">Fashion</a> <i class="icon-plus2"></i></li>
                        <li> <a href="#">Seo Strategy</a> <i class="icon-plus2"></i></li>
                    </ul>
                </div>
                <div class="side-widget space50">
                    <h3><span>Popular Post</span></h3>
                    <ul class="list-unstyled popular-post">
                        <li>
                            <div class="popular-img">
                                <a href="#"> <img src="assets/images/blog/1/1.jpg" class="img-responsive" alt=""></a>
                            </div>
                            <div class="popular-desc">
                                <h5> <a href="#">Mattis arcu viverra vel</a></h5>
                                <span>By Admin</span>
                            </div>
                        </li>
                        <li>
                            <div class="popular-img">
                                <a href="#"> <img src="assets/images/blog/1/2.jpg" class="img-responsive" alt=""></a>
                            </div>
                            <div class="popular-desc">
                                <h5> <a href="#">Sed vel diam sit amet</a></h5>
                                <span>By John Doe</span>
                            </div>
                        </li>
                        <li>
                            <div class="popular-img">
                                <a href="#"> <img src="assets/images/blog/1/3.jpg" class="img-responsive" alt=""></a>
                            </div>
                            <div class="popular-desc">
                                <h5> <a href="#">Cras vulputate dolor</a></h5>
                                <span>By Admin</span>
                            </div>
                        </li>
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
                <div class="side-widget">
                    <h3><span>Tags</span></h3>
                    <ul class="widget-tags">
                        <li><a href="#">fashion</a></li>
                        <li><a href="#">sports</a></li>
                        <li><a href="#">business</a></li>
                        <li><a href="#">news</a></li>
                        <li><a href="#">night</a></li>
                        <li><a href="#">freedom</a></li>
                        <li><a href="#">design</a></li>
                        <li><a href="#">miracle</a></li>
                        <li><a href="#">gallery</a></li>
                        <li><a href="#">collection</a></li>
                        <li><a href="#">pen</a></li>
                        <li><a href="#">pants</a></li>
                        <li><a href="#">jeans</a></li>
                        <li><a href="#">photos</a></li>
                        <li><a href="#">oscar</a></li>
                        <li><a href="#">smile</a></li>
                        <li><a href="#">love</a></li>
                        <li><a href="#">sunshine</a></li>
                        <li><a href="#">luxury</a></li>
                        <li><a href="#">forever</a></li>
                        <li><a href="#">inlove</a></li>
                    </ul>
                </div>
            </aside>
            <div class="col-md-9 col-sm-8 blog-content">
                <article class="blogpost">
                    <h2 class="post-title"><a href="#">Post with media gallery</a></h2>
                    <div class="post-meta">
                        <span><a href="#"><i class="fa fa-calendar"></i> 23 May</a></span>
                        <span><a href="#"><i class="fa fa-user"></i> John Doe</a></span>
                        <span><i class="fa fa-folder"></i><a href="">Vector</a>, <a href="#">Design</a></span>
                        <span><a href="#"><i class="fa fa-comments"></i> 13 Comments</a></span>
                    </div>
                    <div class="space30"></div>
                    <!-- Media Gallery -->
                    <div class="post-media">
                        <div class="blog-slider">
                            <div class="item">						
                                <img src="assets/images/blog/1.jpg" class="img-responsive" alt="">
                            </div>
                            <div class="item">						
                                <img src="assets/images/blog/2.jpg" class="img-responsive" alt="">
                            </div>
                            <div class="item">						
                                <img src="assets/images/blog/3.jpg"  class="img-responsive" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="post-excerpt">
                        <p>Morbi interdum, lectus eget mattis vehicula, est nisi dapibus risus, a vestibulum enim leo sed velit. Etiam rhoncus dui quis tellus consectetur laoreet et a nulla. Suspendisse eleifend velit vitae lectus faucibus, vel consectetur magna pellentesque. Aliquam a efficitur ipsum.</p>
                    </div>
                    <a href="#" class="btn-black">Read More&nbsp;&nbsp;<i class="fa fa-angle-right"></i></a>
                </article>
                <div class="blog-sep"></div>
                <article class="blogpost">
                    <blockquote class="style2">
                        <span class="icon-quote"></span>
                        <div class="quote-one-right">
                            <p>Sed pulvinar arcu, non aliquet orci ante sed suscipit ultricies hendrerit leo ornare, luctus lacus quis, mattis dolor.</p>
                        </div>
                    </blockquote>
                    <div class="quote-meta">
                        <div class="post-meta">
                            <span><a href="#"><i class="fa fa-calendar"></i> 20 May</a></span>
                            <span><a href="#"><i class="fa fa-user"></i> John Doe</a></span>
                            <span><i class="fa fa-folder"></i><a href="">Fashion</a>, <a href="#">Marketing</a></span>
                            <span><a href="#"><i class="fa fa-comments"></i> 7 Comments</a></span>
                        </div>
                        <div class="space10"></div>
                        <a href="#" class="btn-black">Read More&nbsp;&nbsp;<i class="fa fa-angle-right"></i></a>
                    </div>
                </article>
                <div class="blog-sep"></div>
                <article class="blogpost">
                    <h2 class="post-title"><a href="#">Post with media video</a></h2>
                    <div class="post-meta">
                        <span><a href="#"><i class="fa fa-calendar"></i> 15 May</a></span>
                        <span><a href="#"><i class="fa fa-user"></i> John Doe</a></span>
                        <span><i class="fa fa-folder"></i><a href="">Design</a>, <a href="#">Photoshop</a></span>
                        <span><a href="#"><i class="fa fa-comments"></i> 5 Comments</a></span>
                    </div>
                    <div class="space30"></div>
                    <div class="post-media">
                        <div class="video">
                            <iframe src="https://player.vimeo.com/video/129346968?title=0&amp;byline=0&amp;portrait=0" width="500" height="375"></iframe>
                        </div>
                    </div>
                    <div class="space20"></div>
                    <div class="post-excerpt">
                        <p>Morbi interdum, lectus eget mattis vehicula, est nisi dapibus risus, a vestibulum enim leo sed velit. Etiam rhoncus dui quis tellus consectetur laoreet et a nulla. Suspendisse eleifend velit vitae lectus faucibus, vel consectetur magna pellentesque. Aliquam a efficitur ipsum.</p>
                    </div>
                    <a href="#" class="btn-black">Read More&nbsp;&nbsp;<i class="fa fa-angle-right"></i></a>
                </article>
                <div class="blog-sep"></div>
                <article class="blogpost">
                    <h2 class="post-title"><a href="#">Post with media image</a></h2>
                    <div class="post-meta">
                        <span><a href="#"><i class="fa fa-calendar"></i> 5 May</a></span>
                        <span><a href="#"><i class="fa fa-user"></i> John Doe</a></span>
                        <span><i class="fa fa-folder"></i><a href="">Illustration</a>, <a href="#">Branding</a></span>
                        <span><a href="#"><i class="fa fa-comments"></i> 1 Comment</a></span>
                    </div>
                    <div class="space20"></div>
                    <div class="post-media">
                        <img src="assets/images/blog/4.jpg" class="img-responsive" alt="">
                    </div>
                    <div class="space20"></div>
                    <div class="post-excerpt">
                        <p>Morbi interdum, lectus eget mattis vehicula, est nisi dapibus risus, a vestibulum enim leo sed velit. Etiam rhoncus dui quis tellus consectetur laoreet et a nulla. Suspendisse eleifend velit vitae lectus faucibus, vel consectetur magna pellentesque. Aliquam a efficitur ipsum.</p>
                    </div>
                    <a href="#" class="btn-black">Read More&nbsp;&nbsp;<i class="fa fa-angle-right"></i></a>
                </article>
                <div class="blog-sep"></div>
                <article class="blogpost">
                    <h2 class="post-title"><a href="#">Post with text only</a></h2>
                    <div class="post-meta">
                        <span><a href="#"><i class="fa fa-calendar"></i> 17 April</a></span>
                        <span><a href="#"><i class="fa fa-user"></i> John Doe</a></span>
                        <span><i class="fa fa-folder"></i><a href="">Photography</a>, <a href="#">Branding</a></span>
                        <span><a href="#"><i class="fa fa-comments"></i> 8 Comments</a></span>
                    </div>
                    <div class="space20"></div>
                    <div class="post-excerpt">
                        <p>Morbi interdum, lectus eget mattis vehicula, est nisi dapibus risus, a vestibulum enim leo sed velit. Etiam rhoncus dui quis tellus consectetur laoreet et a nulla. Suspendisse eleifend velit vitae lectus faucibus, vel consectetur magna pellentesque. Aliquam a efficitur ipsum.</p>
                    </div>
                    <a href="#" class="btn-black">Read More&nbsp;&nbsp;<i class="fa fa-angle-right"></i></a>
                </article>
                <div class="space50"></div>
                <!-- Pagination -->
                <div class="page_nav">
                    <a href=""><i class="fa fa-angle-left"></i></a>
                    <a href="" class="active">1</a>
                    <a href="">2</a>
                    <a href="">3</a>
                    <a class="no-active">...</a>
                    <a href="">9</a>
                    <a href=""><i class="fa fa-angle-right"></i></a>
                </div>
                <!-- End Pagination -->
            </div>
            <!-- End Content -->
        </div>
    </div>
</div>

<div class="clearfix space20"></div>