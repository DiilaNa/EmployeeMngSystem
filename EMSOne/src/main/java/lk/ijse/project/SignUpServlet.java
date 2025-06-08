package lk.ijse.project;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.*;
import java.util.*;

@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {
    @Resource(name = "java:comp/env/jdbc/pool")
    private DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            Connection connection = ds.getConnection();
            ResultSet resultSet = connection.prepareStatement("select * from user").executeQuery();

            List<Map<String, String>> elist = new ArrayList<>();

            while (resultSet.next()) {
                Map<String, String> event = new HashMap<String, String>();
                event.put("uid", resultSet.getString("uid"));
                event.put("name", resultSet.getString("name"));
                event.put("email", resultSet.getString("email"));
                event.put("password", resultSet.getString("password"));
                elist.add(event);
            }

            resp.setContentType("application/json");
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(resp.getWriter(), elist);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> user = mapper.readValue(req.getInputStream(), Map.class);


        ServletContext sc = req.getServletContext();
        BasicDataSource dataSource = (BasicDataSource) sc.getAttribute("ds");


        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stmt = connection.prepareStatement(
                    "INSERT INTO user (uid,name,email, password) VALUES (?, ?, ?, ?)"
            );
            stmt.setString(1, UUID.randomUUID().toString());
            stmt.setString(2, user.get("name"));
            stmt.setString(3, user.get("email"));
            stmt.setString(4, user.get("password"));

            int rows = stmt.executeUpdate();
            resp.setContentType("application/json");
            if (rows>0){
                resp.setStatus(200);
            }else {
                resp.setStatus(500);
            }
            mapper.writeValue(resp.getWriter(), rows);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }


}