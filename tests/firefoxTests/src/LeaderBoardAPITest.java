import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

public class LeaderBoardAPITest {

	static String leaderBoardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	static String leaderBoardAPI = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user";
	
	static JSONArray leaderContent = null;
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(leaderBoardURL);
		
		// get appropriate JSON information
		
		leaderContent = getContent(leaderBoardAPI);
	}
	
	private static JSONArray getContent(String url) {
		JSONReader reader = new JSONReader(url);
		JSONObject obj = reader.getResponse();
		
		JSONObject data = (JSONObject) obj.get("data");
        return (JSONArray) data.get("content");
	}
	
	@Test
	void leaderBoardTest() throws IOException, ParseException {
        WebElement topList = driver.findElement(By.id("top_list1"));
        
        // First check all names from JSON response exist on page
        
        String listText = topList.getText();
        
        JSONObject arrayElement;
        String userName;
        for (int i = 0; i < leaderContent.size(); i++) {
        	arrayElement = (JSONObject) leaderContent.get(i);
        	userName = (String) arrayElement.get("username");
        	assertTrue(listText.contains(userName));
        }
        
        // Next check that webpage list goes from highest to lowest value
        
        String[] listItems = listText.split("\n");
        
        // gather values in webpage's ordered list
        // TODO: could use regular array if we have no NaN's, since you can allocate 
        ArrayList<String> winRates = new ArrayList<>();
        for (String li : listItems) {
        	// TODO: if statement should be temporary
        	if (li.contains("NaN")) continue;
        	String[] nameAndRate = li.split(" ");
        	// indexing last element of array guarantees you get the winrate number
        	winRates.add(nameAndRate[nameAndRate.length - 1]);
        }
        
        // checking if order of values if correct
        Double nextVal;
        Double currentVal = Double.parseDouble(winRates.get(0));
        for (int i = 1; i < winRates.size(); i++) {
        	nextVal = Double.parseDouble(winRates.get(i));
        	assertTrue(nextVal <= currentVal);
        	currentVal = nextVal;
        }
	}
	
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
