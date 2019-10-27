import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

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
	
	private ArrayList<ArrayList> popContent;
	
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
        
        popContent = getPopList(content);
        // check if API get was successful
        assertEquals(content.size(), popContent.size());
	}
	
	private ArrayList getPopList(JSONArray content) {
		ArrayList<ArrayList> holder = new ArrayList();
		ArrayList<String> tmp = new ArrayList();
		JSONObject tourney;
		
		for (int i = 0; i < content.size(); i++) {
			tourney = (JSONObject) content.get(i);
			tmp.add(tourney.get("tname").toString());
			tmp.add(tourney.get("description").toString());
			tmp.add(tourney.get("id").toString());
			tmp.add(tourney.get("visits").toString());
			holder.add(tmp);
		}
		
		return holder;
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
