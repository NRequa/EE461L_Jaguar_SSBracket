import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

//TODO: also limit popular events to 20 -> meaning I have to sort in the test
//TODO: also split up tests
//TODO: figure out best way to deal with space(s) at end of name
// - could be better during tournament creation, right now just using trim()

public class PageTestHomeAPINew {

	static String homePageURL = "file:///C:/backup/school/sdl/EE461L_Jaguar_SSBracket/index.html";
	static String homePageAPI = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homePageURL);
	}
	
	@Test
	void homePageTest() throws IOException, ParseException {
		URL url = new URL(homePageAPI);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null)
            response.append(inputLine);

        in.close();
        
        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(response.toString());
        
        JSONObject data = (JSONObject) obj.get("data");
        JSONArray content = (JSONArray) data.get("content");
        
        System.out.println("CONTENT SIZE: " + content.size());
        
        WebElement popList = driver.findElement(By.id("popular"));
        
        // First check all content from JSON response exists on page
        String listText = popList.getText();
        
        JSONObject arrayElement;
        String popContent;
        for (int i = 0; i < content.size(); i++) {
        	arrayElement = (JSONObject) content.get(i);
        	popContent = (String) arrayElement.get("tname");
        	assertTrue(listText.contains(popContent.trim()));
        	
        	popContent = (String) arrayElement.get("description");
        	assertTrue(listText.contains(popContent.trim()));
        	
        	popContent = ((Long) arrayElement.get("visits")).toString();
        	assertTrue(listText.contains(popContent.trim()));
        }
        
        // checking if order of views if correct
        // TODO: VERY IMPORTANT:
        // need to parse divs with more detail
        // for this to work the title nor the desc. could have numbers (only views)
        String viewsString = listText.replaceAll("\\D+"," ");
        String[] views = viewsString.split(" ");
        System.out.println(Arrays.toString(views));
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
