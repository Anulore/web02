<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<table class="result_table">
    <jsp:useBean id="hitBean" class="model.Results" scope="session"/>
    <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время отправки</th>
            <th>Время работы скрипта</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach var="hit" items="${hitBean.hitList}">
        <tr>
            <td>${hit.x}</td>
            <td>${hit.y}</td>
            <td>${hit.r}</td>
            <c:if test="${hit.result == 'YES'}">
                <td>
                    <span style="color:#24ca24; text-shadow: #24ca24 0 0 1px">${(hit.result)}</span>
                </td>
            </c:if>
            <c:if test="${hit.result == 'NO'}">
                <td>
                    <span style="color:#f50f0f; text-shadow: #f50f0f 0 0 1px">${(hit.result)}</span>
                </td>
            </c:if>
            <td>${hit.localTime}</td>
            <td>${hit.processingTime} ns</td>
        </tr>
        </c:forEach>
    </tbody>
</table>
