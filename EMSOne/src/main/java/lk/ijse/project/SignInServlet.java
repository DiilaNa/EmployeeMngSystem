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

@WebServlet("/signIn")
public class SignInServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> user = mapper.readValue(req.getInputStream(), Map.class);

        ServletContext sc = req.getServletContext();
        BasicDataSource ds = (BasicDataSource) sc.getAttribute("ds");

        String email = user.get("email");
        String password = user.get("password");
        try {
            Connection connection = ds.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM user WHERE email=? AND password=?");
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);
            preparedStatement.execute();

            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();

            if (preparedStatement.executeUpdate()>0) {
                resp.setStatus(200);
                mapper.writeValue(out,Map.of(
                        "code","200",
                        "status","Login Success",
                        "message","Login Success"
                ));
            }else {
                resp.setStatus(401);
                mapper.writeValue(out,Map.of(
                        "code","401",
                        "status","Unauthorized",
                        "message","Unauthorized Behaviour"

                ));
            }
            connection.close();
        } catch (SQLException e) {
           PrintWriter out = resp.getWriter();
           mapper.writeValue(out,Map.of(
                   "code","500",
                   "status","Error",
                   "message",e.getMessage()
           ));
           throw new RuntimeException(e);
        }
    }
}



