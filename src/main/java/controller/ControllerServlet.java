package controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setCharacterEncoding("UTF-8");
            if (req.getParameterValues("xArray") != null &&
                    req.getParameter("y") != null &&
                    req.getParameter("r") != null) {
                String[] xArray = req.getParameterValues("xArray");
                double y = Double.parseDouble(req.getParameter("y"));
                double r = Double.parseDouble(req.getParameter("r"));

                req.setAttribute("xArray", xArray);
                req.setAttribute("y", y);
                req.setAttribute("r", r);
                getServletContext().getRequestDispatcher("/areaCheckServlet").forward(req, resp);
            } else if (req.getParameter("delete").equals("true")) {
                getServletContext().getRequestDispatcher("/clear").forward(req, resp);
            } else getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } catch (NullPointerException | NumberFormatException e) {
            System.out.println(e.getClass());
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
}
