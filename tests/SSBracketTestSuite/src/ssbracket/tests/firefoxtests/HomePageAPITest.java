package ssbracket.tests.firefoxtests;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class HomePageAPITest {

	static String homePageURL = "http://www.ssbracket.xyz";
	static String homePageAPI = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament";
	
	static String leaderBoardAPI = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homePageURL);
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	}
	
	@Test
	void popularEventsTest() throws IOException, ParseException {
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
	}
	
	@Test
	void tournamentSearchTests() throws IOException, ParseException {
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
        
        WebElement searchForm = driver.findElement(By.id("searchForm"));
        WebElement dropMenu;
        WebElement li;
        String name;
        
        JSONObject arrayElement;
        // search for three different tournaments
        for (int i = 0; i < 3; i++) {
        	arrayElement = (JSONObject) content.get(i);
        	name = (String) arrayElement.get("tname");
        	searchForm.sendKeys(name);
        	searchForm.sendKeys(Keys.ENTER);
        	
        	dropMenu = driver.findElement(By.id("drop_menu"));
        	li = dropMenu.findElement(By.tagName("li"));
        	assertTrue(li.getText().contains(name));
        	searchForm.clear();
        }
	}
	
	@Test
	void visitsdOrderTest() {
		int currentVal;
        int visitNum;
        String visitString;
        List<WebElement> visitParas = driver.findElements(By.className("visit_nums"));
        
        // get first element for comparison
        
        visitString = visitParas.get(0).getText();
    	visitString = visitString.replaceAll("\\D+", "");
    	visitNum = Integer.parseInt(visitString);
    	
        for (int i = 1; i < visitParas.size(); i++) {
        	currentVal = visitNum;
        	visitString = visitParas.get(i).getText();
        	visitString = visitString.replaceAll("\\D+", "");
        	visitNum = Integer.parseInt(visitString);
        	
        	assertTrue(currentVal >= visitNum);
        }
	}
	
	@Test
	void carouselTest() throws IOException, ParseException {
		URL url = new URL(leaderBoardAPI);
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
        
        int n = 0;
        Long numTourneyWins;
        JSONObject arrayElement;
        
        // count number of users with at least 5 tournaments won
        for (int i = 0; i < content.size(); i++) {
        	arrayElement = (JSONObject) content.get(i);
        	numTourneyWins = (Long) arrayElement.get("numtournamentswon");
        	if (numTourneyWins >= 5) n++;
        }
        
        WebElement carInner = driver.findElement(By.id("tcarousel"));
        List<WebElement> carItems;
        if (n > 0) {
        	/*
        	carItems = driver.findElements(By.className("item"));
        	assertEquals(n, carItems.size()); */
        	System.out.println(carInner.getText());
        }
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
