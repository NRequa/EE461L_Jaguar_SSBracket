import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTest {
	
	//TODO: document all tests
	
	static String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	static String homepageURL = "file:///C:/school/sdl/EE461L_Jaguar_SSBracket/index.html";
	static String twitterLink = "https://twitter.com/SsBracket?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembedded"
			+ "timeline%7Ctwterm%5Eprofile%3ASsBracket&ref_url=file%3A%2F%2F%2FC%3A%2Fschool%2Fsdl%2F"
			+ "EE461L_Jaguar_SSBracket%2Findex.html";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(leaderboardURL);
	}

	@Test
	void overallTest() { 
		WebElement overallBtn = driver.findElement(By.id("btn1"));
		overallBtn.click();
		
		WebElement list = driver.findElement(By.id("top_list1"));
		String listText = list.getText();
		
		verifyContents("btn1", listText);
	}
	
	@Test
	void characterTest() { 		
		WebElement overallBtn = driver.findElement(By.id("btn2"));
		overallBtn.click();
		
		WebElement list = driver.findElement(By.id("top_list2"));
		String listText = list.getText();
		
		verifyContents("btn2", listText);
	}
	
	@Test
	void regionTest() { 	
		WebElement overallBtn = driver.findElement(By.id("btn3"));
		overallBtn.click();
		
		WebElement list = driver.findElement(By.id("top_list3"));
		String listText = list.getText();
		
		verifyContents("btn3", listText);
	}
	
	private void verifyContents(String id, String listText) {
		if (id.equals("btn1")) {
			assertTrue(listText.contains("testOverall"));
			assertFalse(listText.contains("testCharacter"));
			assertFalse(listText.contains("testRegion"));
			
		} else if (id.equals("btn2")) {
			assertFalse(listText.contains("testOverall"));
			assertTrue(listText.contains("testCharacter"));
			assertFalse(listText.contains("testRegion"));
			
		} else if (id.equals("btn3")) {
			assertFalse(listText.contains("testOverall"));
			assertFalse(listText.contains("testCharacter"));
			assertTrue(listText.contains("testRegion"));
			
		} else {
			assertTrue(false); //auto fail (prob a better way to do this)
		}
		
		for (int i = 1; i < 20; i++)
			assertTrue(listText.contains(Integer.toString(i)));
	}
	
	@Test
	void navBarTest() {
		String[] navBarLinks = {"Home", "LeaderBoard", "About Us", "Register", "Log In"};
		for( int i = 0; i < navBarLinks.length; i++) {
			try {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				pageLink.click();
				driver.navigate().back();
			} catch(Exception e) {
				assertTrue(false);
			}
		}
	}
	
	//Going straight into homepage test, using local file
	@Test
	void homePageSearch() {
		driver.get(homepageURL);
		WebElement searchForm = driver.findElement(By.id("searchForm"));
		searchForm.sendKeys("Selenium Test");
		searchForm.sendKeys(Keys.RETURN);
		
		WebElement eventsTitle = driver.findElement(By.id("search_ph"));
		assertEquals("Searching for: Selenium Test", eventsTitle.getText());
	}
	
	@Test
	void homePageButtons() {
		WebElement bracketBtn = driver.findElement(By.id("bracket_btn"));
		bracketBtn.click();
		driver.navigate().back();
		
		WebElement contactBtn = driver.findElement(By.id("contact_btn"));
		contactBtn.click();
		
		WebElement contactInfo = driver.findElement(By.id("contact_p"));
		//would be asserts
		System.out.println(contactBtn.getCssValue("display"));
		System.out.println(contactInfo.getCssValue("display"));
	}

	@AfterAll
	public static void tearDown() {
		//driver.close();
	}
}
