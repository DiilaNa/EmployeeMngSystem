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
import java.util.*;

@WebServlet("/dashboard")
public class MainServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String>  emp = mapper.readValue(req.getInputStream(), Map.class);

            ServletContext sc = getServletContext();
            BasicDataSource dataSource = (BasicDataSource) sc.getAttribute("ds");

            Connection connection = dataSource.getConnection();
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO employee (empid,empName,empMail,empDepartment,empPosition,empPhone,empSalary) VALUES (?,?,?,?,?,?,?)"
            );
            stmt.setString(1, UUID.randomUUID().toString());
            stmt.setString(2, emp.get("name"));
            stmt.setString(3, emp.get("email"));
            stmt.setString(4, emp.get("department"));
            stmt.setString(5, emp.get("position"));
            stmt.setString(6, emp.get("phone"));
            stmt.setString(7, emp.get("salary"));
            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");
            if (stmt.executeUpdate() > 0){
                resp.setStatus(HttpServletResponse.SC_CREATED);
                mapper.writeValue(out,Map.of(
                        "code","201",
                        "status","success",
                        "message","Employee saved successfully"
                ));
            }else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                mapper.writeValue(out,Map.of(
                        "code","400",
                        "status","error",
                        "message","Bad Request"
                ));
                connection.close();
            }
        } catch (RuntimeException | SQLException e) {
            ObjectMapper mapper = new ObjectMapper();
            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            mapper.writeValue(out,Map.of(
                    "code","500",
                    "status","error",
                    "message","Internal Server Error"
            ));
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            ServletContext sc = getServletContext();
            BasicDataSource ds = (BasicDataSource) sc.getAttribute("ds");
            Connection connection = ds.getConnection();

            ResultSet rs = connection.prepareStatement("SELECT * FROM employee").executeQuery();

            List<Map<String,String>> employees = new ArrayList<>();
            while (rs.next()){
                Map<String,String> emp = new HashMap<>();
                emp.put("empid", rs.getString("empid"));
                emp.put("empName", rs.getString("empName"));
                emp.put("empMail", rs.getString("empMail"));
                emp.put("empDepartment", rs.getString("empDepartment"));
                emp.put("empPosition", rs.getString("empPosition"));
                emp.put("empPhone", rs.getString("empPhone"));
                emp.put("empSalary", rs.getString("empSalary"));
                employees.add(emp);
            }
            resp.setContentType("application/json");
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(resp.getWriter(),employees);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
