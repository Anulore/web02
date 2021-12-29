<%@ page contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="hitBean" class="model.Results" scope="session"/>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <title>Lab 02</title>
</head>
<body>
<table class="main_table">
    <thead>
    <tr class="header">
        <td colspan="2">
            Выполнил: Бобринёв Кирилл<br>
            Учебная группа: P3212<br>
            Вариант: 12044<br>
        </td>
    </tr>
    </thead>
    <tbody>
    <tr class="content">
        <td class="graph">
            <canvas id="canvas"></canvas>
        </td>
        <td class="input_section">
            <form id="form" method="get" action="<%= request.getContextPath() %>/controller">
            <p id="input-x">
                Координата X: <br>
                <input type="checkbox" name="xArray" id = "xbox_00" value="-2"><label for="xbox_00">-2</label>
                <input type="checkbox" name="xArray" id = "xbox_01" value="-1.5"><label for="xbox_01">-1.5</label>
                <input type="checkbox" name="xArray" id = "xbox_02" value="-1"><label for="xbox_02">-1</label>
                <input type="checkbox" name="xArray" id = "xbox_03" value="-0.5"><label for="xbox_03">-0.5</label>
                <input type="checkbox" name="xArray" id = "xbox_04" value="0"><label for="xbox_04">0</label>
                <input type="checkbox" name="xArray" id = "xbox_05" value="0.5"><label for="xbox_05">0.5</label>
                <input type="checkbox" name="xArray" id = "xbox_06" value="1"><label for="xbox_06">1</label>
                <input type="checkbox" name="xArray" id = "xbox_07" value="1.5"><label for="xbox_07">1.5</label>
                <input type="checkbox" name="xArray" id = "xbox_08" value="2"><label for="xbox_08">2</label>
            <p id="fieldX"></p>
            </p>
            <p id="input-y">
                Координата Y: <br>
                <input type="text" name="y" maxlength="10" placeholder="-3 ... 3">
            <p id="fieldY"></p>
            </p>
            <p id="input-r">
                Координата R: <br>
                <input type="text" name="r" maxlength="10" placeholder="2 ... 5">
            <p id="fieldR"></p>
            </p>
            <br>
            <button type="submit" id="send">Отправить</button>

            </form>
            <button type="submit" id="clear">Очистить результат</button>
        </td>
    </tr>
    <tr class="result_section">
        <td colspan="2">
            <table class="result_table">
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
        </td>
    </tr>
    <tr class="footer">
        <td colspan="2">
            <span id="itmo">Университет ИТМО</span>
            <span id="year">2021</span>
        </td>
    </tr>
    </tbody>
</table>
<script src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<script src="script.js"></script>
<script src="canvas.js"></script>
</body>
</html>