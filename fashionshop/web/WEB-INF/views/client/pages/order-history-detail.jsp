
<%@page import="java.math.RoundingMode"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="spring.entity.Orders"%>
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
                    <h4 class="account-title">
                        <span class="fa fa-chevron-right"></span>Order Details NO.${order.ordersID}
                    </h4>                                                                    
                    <div class="order-history">
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <!--<th>ID</th>-->
                                    <th>Product Name</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price for one</th>
                                    <th>Product discount</th>
                                    <th>SubTotal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${orderdetailList}" var="orderdetail">
                                    <tr>
                                        <!--<td align="center">${orderdetail.ordersDetailID}</td>-->
                                        <td align="center">${orderdetail.getProduct().getProductName()}</td>
                                        <td style="width: 50px;">${orderdetail.getSize().getColor().getColor()}</td>
                                        <td align="center">${orderdetail.getSize().productSize}</td>
                                        <td align="center">${orderdetail.quantity}</td>
                                        <td align="center">$${orderdetail.price}</td>
                                        <td align="center">-$${orderdetail.product.getProductDiscountPrice()}</td>
                                        <td align="center">$${orderdetail.getSubTotal()}</td>
                                        <td align="center">
                                            <c:choose>
                                                <c:when test="${orderdetail.status == 1}">Canceled</c:when>
                                                <c:when test="${orderdetail.status == 2}">New</c:when>
                                                <c:otherwise>--</c:otherwise>
                                            </c:choose>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6" style="padding-left: 770px;"><b>Order Discount</b></td>
                                    <td align="center">
                                        <c:set value="${order}" var="or"/>
                                        <%
                                            Orders orders = (Orders) pageContext.getAttribute("or");
                                            DecimalFormat df = new DecimalFormat("#.#");
                                            df.setRoundingMode(RoundingMode.FLOOR);
                                        %>
                                        -$<%= df.format(orders.getOrderDiscountPrice())%>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="6" style="padding-left: 770px;"><b>Order Total</b></td>
                                    <td align="center">$${order.getPaymentTotal()}</td>
                                    <td></td>   
                                </tr>
                            </tfoot>
                        </table>
                    </div><br/>
                    <div class="order-history">
                        <table class="cart-table">
                            <tr>
                                <th style="width: 200px;">Order Note</th>
                                <td>${order.note}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="clearfix space10"></div>
                    <c:if test="${order.status == 2}">
                        <div class="order-history">
                            <button class="btn btn-danger pull-right" id="btnClientCancelOrder" value="${order.ordersID}">CANCEL ORDER</button>
                        </div>
                    </c:if>
                </div>
            </div>                        
        </div>
    </div>
</div>
<div class="clearfix space20"></div>