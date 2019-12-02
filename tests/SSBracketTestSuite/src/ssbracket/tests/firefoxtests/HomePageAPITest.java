import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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

	private static String homePageURL = "http://www.ssbracket.xyz";
	private static String homePageAPI = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament";
	
	private static String leaderBoardAPI = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user";
	
	private static JSONArray tournamentContent = null;
	private static JSONArray leaderContent = null;
	
	private static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homePageURL);
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
		
		// get all appropriate JSON information
		
		JSONReader reader = new JSONReader();
		
		tournamentContent = reader.getContent(homePageAPI);
		leaderContent = reader.getContent(leaderBoardAPI);
	}
	
	@Test
	void popularEventsTest() throws IOException, ParseException {    
        WebElement popList = driver.findElement(By.id("popular"));
        
        // check if all content from JSON response exists on page
        
        String listText = popList.getText();
        
        JSONObject arrayElement;
        String popContent;
        for (int i = 0; i < tournamentContent.size(); i++) {
        	arrayElement = (JSONObject) tournamentContent.get(i);
        	popContent = (String) arrayElement.get("tname");
        	assertTrue(listText.contains(popContent.trim()));
        	
        	popContent = ((Long) arrayElement.get("visits")).toString();
        	assertTrue(listText.contains(popContent.trim()));
        } 
	}
	
	@Test
	void tournamentSearchTests() throws IOException, ParseException {
        WebElement searchForm = driver.findElement(By.id("searchForm"));
        WebElement dropMenu = driver.findElement(By.id("drop_menu"));
        
        // search for three unique tournaments
        
        WebElement li; String name;
        JSONObject arrayElement;
        for (int i = 0; i < 3; i++) {
        	arrayElement = (JSONObject) tournamentContent.get(i);
        	name = (String) arrayElement.get("tname");
        	searchForm.sendKeys(name);
        	searchForm.sendKeys(Keys.ENTER);
        	
        	li = dropMenu.findElement(By.tagName("li"));
        	assertTrue(li.getText().contains(name));
        	searchForm.clear();
        }
	}
	
	@Test
	void visitsdOrderTest() {
		List<WebElement> visitParas = driver.findElements(By.className("visit_nums"));
		
        int visitNum = -1;
        int currentVal = visitNum;
        
        // checking if largest visit #'s on top
        
        String visitString;
        for (int i = 0; i < visitParas.size(); i++) {
        	currentVal = visitNum;
        	visitString = visitParas.get(i).getText();
        	visitString = visitString.replaceAll("\\D+", "");
        	visitNum = Integer.parseInt(visitString);
        	
        	if (currentVal != -1)
        		assertTrue(currentVal >= visitNum);
        }
	}
	
	@Test
	void carouselTest() throws IOException, ParseException {
        // count number of users with at least 5 tournaments won
        
        int n = 0; Long numTourneyWins;
        JSONObject arrayElement;
        for (int i = 0; i < leaderContent.size(); i++) {
        	arrayElement = (JSONObject) leaderContent.get(i);
        	numTourneyWins = (Long) arrayElement.get("numtournamentswon");
        	if (numTourneyWins >= 5) n++;
        }
        
        List<WebElement> carouselItems;
        if (n > 0) {
        	carouselItems = driver.findElements(By.className("item"));
        	assertEquals(n, carouselItems.size()); 
        }
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
