package controller;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ClearServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter output = resp.getWriter();
        try {
            req.getSession().setAttribute("hitBean", null);
            output.println("history deleted");
        } finally {
            output.close();
        }
    }
}
