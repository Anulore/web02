package model;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter output = resp.getWriter();
        try {
            String[] xArrayStr = (String[])req.getAttribute("xArray");
            double[] xArray = new double[xArrayStr.length];
            for (int i = 0; i < xArrayStr.length; i++) {
                xArray[i] = Double.parseDouble(xArrayStr[i]);
            }
            double y = (double) req.getAttribute("y");
            double r = (double) req.getAttribute("r");

            HttpSession session = req.getSession();
            if (isValid(r)) {
                List<Hit> listOfResult = new ArrayList<>();
                for (double x : xArray) {
                    listOfResult.add(createHit(x, y, r));
                }

                Results resultsBean = (Results) session.getAttribute("hitBean");

                if (resultsBean == null) {
                    session.setAttribute("hitBean", new Results(listOfResult));
                } else {
                    ((Results) session.getAttribute("hitBean")).getHitList().addAll(listOfResult);
                }

            } else {
                output.println("Incorrect coordinates type");
                return;
            }

            if (req.getParameter("fromCanvas") == null) {
                req.getRequestDispatcher(("resultPage.jsp")).forward(req, resp);
            } else {
                output.println(((Results) session.getAttribute("hitBean")).toJson());
            }
        } catch (NumberFormatException | ServletException e) {
            output.println("Incorrect coordinates type");
        } finally {
            output.close();
        }
    }


    private Hit createHit(double x, double y, double r) {
        long startTime = System.nanoTime();
        String answer = isHit(x, y, r) ? "YES" : "NO";
        System.out.println();
        return new Hit(x, y, r, answer, new SimpleDateFormat("HH:mm:ss").format(new Date()),
                String.valueOf(System.nanoTime() - startTime));
    }

    private boolean isValid(double r) {
        return (r > 2 && r < 5);
    }

    private boolean isHit(double x, double y, double r) {
        return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r);
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x <= 0 && y >= 0 && y <= r /2 && Math.abs(x) <= r;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && (r + x >= 2 * Math.abs(y));
    }

    private boolean checkCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && (x * x + y * y) <= r * r;
    }

}