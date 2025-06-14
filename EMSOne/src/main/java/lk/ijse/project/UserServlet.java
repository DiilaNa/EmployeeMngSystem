package lk.ijse.project;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.dbcp2.BasicDataSource;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

@WebServlet("/user")
public class UserServlet extends HttpServlet {
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        ObjectMapper mapper = new ObjectMapper();
        resp.setContentType("application/json");

        if (email == null || email.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            mapper.writeValue(resp.getWriter(), Map.of(
                    "status", "error",
                    "message", "Email parameter is missing"
            ));
            return;
        }

        BasicDataSource ds = (BasicDataSource) getServletContext().getAttribute("ds");

        try (Connection con = ds.getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM user WHERE email = ?");
            ps.setString(1, email);
                ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                Map<String, Object> user = Map.of(
                        "name", rs.getString("name"),
                        "email", rs.getString("email"),
                        "password", rs.getString("password")
                );

                resp.setStatus(200);
                mapper.writeValue(resp.getWriter(), user);
            } else {
                resp.setStatus(401);
                mapper.writeValue(resp.getWriter(), Map.of(
                        "status", "error",
                        "message", "User not found"
                ));
            }
        } catch (SQLException e) {
            resp.setStatus(500);
            mapper.writeValue(resp.getWriter(), Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(req.getInputStream(), Map.class);

            ServletContext sc = getServletContext();
            BasicDataSource ds = (BasicDataSource) sc.getAttribute("ds");

            Connection connection = ds.getConnection();
            PreparedStatement ps = connection.prepareStatement("UPDATE user SET name = ?, email = ?, password = ? WHERE email = ?");
            ps.setString(1, map.get("name"));
            ps.setString(2, map.get("email"));
            ps.setString(3, map.get("password"));
            ps.executeUpdate();
            resp.setStatus(200);
        } catch (Exception e) {
            resp.setStatus(500);
            throw new RuntimeException(e);
        }
    }
}
