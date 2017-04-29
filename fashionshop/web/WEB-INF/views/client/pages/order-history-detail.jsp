<%-- 
    Document   : order-history
    Created on : Feb 28, 2017, 5:05:55 PM
    Author     : vinh.an
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!-- BREADCRUMBS -->
<jsp:include page="../blocks/breadcrumbs.jsp" flush="true" />

<!-- MY ACCOUNT -->
            <div class="account-wrap">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- HTML -->
                            <div id="account-id">
                                <h4 class="account-title"><span class="fa fa-chevron-right"></span>Your Order History</h4>                                                                    
                                <div class="order-history">
                                    <table class="cart-table">
                                        <thead>
                                            <tr>                                                
<!--                                                <th>Image</th>                                                                                             
                                                <th>Qty</th>  
                                                <th>Product Name</th>-->
                                                <th>Order ID</th>
                                                <th>total</th>
                                                <th>Delivered on</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:forEach items="${orderList}" var="map">
                                                <tr>                                              
    <!--                                                <td><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></td>                                                                                               
                                                    <td>x3</td>
                                                    <td>
                                                        <h4><a href="./single-product.html">Product fashion</a></h4>
                                                        <p>Size: M</p>
                                                        <p>Color: White</p>
                                                    </td>-->
                                                    <td align="center"><a href="#">Order No.${map.key.ordersID}</a></td>
                                                    <td align="center">
                                                        <div class="item-price">${map.value}</div>
                                                    </td>
                                                    <td align="center">
                                                        <fmt:formatDate value="${map.key.ordersDate}" pattern="hh:mm:ss dd-MM-yyyy"/>
                                                    </td>
                                                    <td align="center">
                                                        <!--<a href="return.html" class="btn-black">Return Order</a>-->
                                                        <a href="#" type="button" class="btn btn-primary">Re Order</a>
                                                    </td>
                                                </tr> 
                                            </c:forEach>
                                        </tbody>
                                        
<!--                                        <tr>                                              
                                            <td><img src="assets/images/products/fashion/5.jpg" class="img-responsive" alt=""/></td>                                                                                               
                                            <td>x3</td>
                                            <td>
                                                <h4><a href="./single-product.html">Product fashion</a></h4>
                                                <p>Size: M</p>
                                                <p>Color: White</p>
                                            </td>
                                            <td>
                                                <div class="item-price">$ 99.00</div>
                                            </td> 
                                            <td> OD31207</td>
                                            <td> 12th Dec'13 </td>
                                            <td>
                                                <a href="return.html" class="btn-black">Return Order</a>
                                                <a href="#" class="btn-black">Re Order</a>
                                            </td>
                                        </tr>-->
                                    </table>

                                    <div class="table-btn">
                                        <a href="my-account.html" class="btn-black">Back To Account</a>
                                    </div>
                                </div>                          
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            <div class="clearfix space20"></div>