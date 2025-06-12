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
public class EmployeeServlet extends HttpServlet {

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
            stmt.executeUpdate();

            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");

            if (stmt.executeUpdate() > 0){
                resp.setStatus(200);
                mapper.writeValue(out,Map.of(
                        "code","200",
                        "status","success",
                        "message","Employee saved successfully"
                ));
            }else {
                resp.setStatus(401);
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
            resp.setStatus(500);
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
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext sc = getServletContext();
        BasicDataSource ds = (BasicDataSource) sc.getAttribute("ds");

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> emp = mapper.readValue(req.getReader(), Map.class);

        try (Connection conn = ds.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                    "UPDATE employee SET empName=?, empMail=?, empDepartment=?, empPosition=?, empPhone=?, empSalary=? WHERE empid=?"
            );
            ps.setString(1, emp.get("name"));
            ps.setString(2, emp.get("email"));
            ps.setString(3, emp.get("department"));
            ps.setString(4, emp.get("position"));
            ps.setString(5, emp.get("phone"));
            ps.setString(6, emp.get("salary"));
            ps.setString(7, emp.get("empid"));
            ps.executeUpdate();
            resp.setStatus(200);
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext sc = getServletContext();
        BasicDataSource ds = (BasicDataSource) sc.getAttribute("ds");

        String empid = req.getParameter("empid");

        if (empid == null || empid.isEmpty()) {
            resp.setStatus(400); // Bad request
            resp.getWriter().write("Missing id");
            return;
        }

        try (Connection conn = ds.getConnection()) {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM employee WHERE empid = ?");
            ps.setString(1, empid);
            int rows = ps.executeUpdate();

            if (rows > 0) {
                resp.setStatus(200);
            } else {
                resp.setStatus(404); // Not found
                resp.getWriter().write("Employee not found");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(500);
            resp.getWriter().write("SQL error: " + e.getMessage());
        }
    }


}
