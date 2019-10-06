

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
	private static final boolean isTesting = true;
	private static final boolean isHikari = true;
	private String DB_NAME = "test";
	private String DB_USER = "root";
	private String DB_PASS = "0321scks";
	private String CLOUD_SQL_CONNECTION_NAME = "ssbracket:us-central1:ssbracket";
	


	
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException {
	  if(!isHikari) {

    response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
    
    
    //////////////////////////////////////////////////////

    /*
     * To test database locally, change variables at top, be sure to start a proxy for google cloud sql
     * Warning: will not work on actual google website. Use only for testing locally
     * 
     * To test database on google, change variables at top
     * deploy
     * Warning: will not compile correctly on local computer
     */
    String myDriver;
    String myUrl;
    if(isTesting) {
        myDriver = "com.mysql.jdbc.Driver";
        myUrl = "jdbc:mysql:///test?useSSL=false";   
    } else {
    	myDriver = "com.mysql.jdbc.GoogleDriver";
        myUrl = "jdbc:google:mysql://" + CLOUD_SQL_CONNECTION_NAME+ "/" + DB_NAME + "?useSSL=false";
    }
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
	  } else {   
  //connection using Hikari
    HikariConfig config = new HikariConfig();

    // Configure which instance and what database user to connect with.
       try {
    	if(isTesting)  {
    		Class.forName("com.mysql.cj.jdbc.Driver");
    		config.setJdbcUrl(String.format("jdbc:mysql:///test?useSSL=false"));
    	} else {
    		Class.forName("com.mysql.jdbc.GoogleDriver");
    		config.setJdbcUrl(String.format("jdbc:google:mysql://%s/%s", CLOUD_SQL_CONNECTION_NAME,DB_NAME));
    	}
   	} catch (ClassNotFoundException e) {
   		// TODO Auto-generated catch block
   		e.printStackTrace();
   	}
    
    
    config.setUsername(DB_USER); // e.g. "root", "postgres"
    config.setPassword(DB_PASS); // e.g. "my-password"

    // For Java users, the Cloud SQL JDBC Socket Factory can provide authenticated connections.
    // See https://github.com/GoogleCloudPlatform/cloud-sql-jdbc-socket-factory for details.
    //config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.mysql.SocketFactory");
    config.addDataSourceProperty("cloudSqlInstance", CLOUD_SQL_CONNECTION_NAME);
    config.addDataSourceProperty("useSSL", "false");

    // ... Specify additional connection properties here.
    // ...

    // Initialize the connection pool using the configuration object.
    DataSource pool = new HikariDataSource(config);
    response.getWriter().print("Connection must have succeeded if this is shown\r\n");
	  }
  }
}