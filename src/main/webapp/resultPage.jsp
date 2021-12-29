<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <title>Результаты</title>
</head>
<body>
    <table class="result_page">
        <tr class="result_section">
            <td>
                <jsp:include page="resultTable.jsp" />
            </td>
        </tr>
        <tr>
            <td>
                <form method="get" action="<%= request.getContextPath() %>/controller">
                    <button id="back" type="submit">На главную</button>
                </form>
            </td>
        </tr>
    </table>
</body>
</html>
