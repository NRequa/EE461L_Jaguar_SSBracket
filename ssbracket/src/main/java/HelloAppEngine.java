

import com.zaxxer.hikari.HikariDataSource;

import com.zaxxer.hikari.HikariConfig;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.sql.DataSource;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class HelloAppEngine extends HttpServlet {
	private String DB_NAME = "test";
	private String DB_USER = "root";
	private String DB_PASS = "0321scks";
	private String CLOUD_SQL_CONNECTION_NAME = "ssbracket:us-central1:ssbracket";

	
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException {

    response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
    
    /*
     * To test database locally, uncomment below and comment other myDriver and myUrl
     * Also, be sure to start a proxy for google cloud sql
     * Warning: will not work on actual google website. Use only for testing locally
     */
    //String myDriver = "com.mysql.jdbc.Driver";
    //String myUrl = "jdbc:mysql:///test?useSSL=false";
    
    /*
     * To test database on google, uncomment below and comment other myDriver and myUrl
     * Then deploy
     * Warning: will not compile correctly on local computer
     */
    String myDriver = "com.mysql.jdbc.GoogleDriver";
    String myUrl = "jdbc:google:mysql://" + CLOUD_SQL_CONNECTION_NAME+ "/" + DB_NAME + "?useSSL=false";
    
    try {
    Class.forName(myDriver);
    Connection conn = DriverManager.getConnection(myUrl, DB_USER, DB_PASS);
    conn.close();
    } catch (Exception e) {
    	System.out.println(e);
    	response.getWriter().print(e);
    	return;
    }
    
    response.getWriter().print("Connection must have succeeded if this is shown\r\n");

  }
}