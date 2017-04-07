<option>-- Please choose a Size --</option>
<c:forEach items="${sizeList}" var="size">
    <c:if test="${size.status != 0}">
        <option value="${size.sizeID}">${size.productSize}</option>
    </c:if>
</c:forEach>