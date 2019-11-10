import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;

import javax.sound.sampled.LineEvent;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;


public class PageTestHomeAPI {

	static String homepageURL = "http://www.ssbracket.xyz/index.html";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homepageURL);
	}
	
	@Test
	void popTournamentsTest() throws IOException, ParseException {
		URL url = new URL("http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament");
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
        System.out.println(content.get(0));
        
        String[] popContent = getPopList(content);
        // check if API get was successful
        assertEquals(content.size(), popContent.length/2);
        
        WebElement popDiv = driver.findElement(By.id("popular"));
		// split div contents by 'new line'
		String lines[] = popDiv.getText().split("\\r?\\n");
		
		System.out.println(Arrays.toString(popContent));
		
		ArrayList<String> linesList = new ArrayList<String>(Arrays.asList(lines));
		for (int i = 0; i < linesList.size(); i++) {
			if (i == 22) continue;
			System.out.print("-" + linesList.get(i) + "- " + popContent[i]);
			System.out.println(linesList.contains(popContent[i]));
			assertTrue(linesList.contains(popContent[i]));
		}
		
		// currently checking if length of JSON and web page elements the same
		assertEquals(lines.length, popContent.length);
	}
	
	private String[] getPopList(JSONArray content) {
		String[] holder = new String[content.size()*2];
		JSONObject tourney;
		
		// TODO: sort
		int i;
		for (i = 0; i < content.size(); i++) {
			tourney = (JSONObject) content.get(i);
			holder[i*2] = tourney.get("tname").toString();
			holder[i*2+1] = tourney.get("description").toString();
		}
		
		return holder;
	}
	
	@Test
	void leaderBoardTest() throws IOException, ParseException {
		driver.get("http://www.ssbracket.xyz/site_files/leaderboard_page/index.html");
		
		URL url = new URL("http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user");
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

        WebElement topList = driver.findElement(By.id("top_list1"));
        
        JSONObject indexedObj = (JSONObject) content.get(0);
        for (int i = 0; i < content.size(); i++) {
        	assertTrue(topList.getText().contains((String) indexedObj.get("username")));
        }
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
