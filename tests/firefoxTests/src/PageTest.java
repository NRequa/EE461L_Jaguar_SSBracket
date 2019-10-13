import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTest {
	
	//TODO: document all tests
	
	static String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	static String homepageURL = "http://www.ssbracket.xyz/index.html";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homepageURL);
	}

	/*
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
			fail();
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
				fail();
			}
		}
	} */
	
	@Test
	void homePageButtons() {
		WebElement bracketBtn = driver.findElement(By.id("bracket_btn"));
		
		//click on something on the page to hide dropdown
		WebElement twitterTitle = driver.findElement(By.id("twitter_title"));
		twitterTitle.click();
		
		bracketBtn.click();
		driver.navigate().back();
		
		WebElement contactBtn = driver.findElement(By.id("contact_btn"));
		contactBtn.click();
		
		WebElement contactInfo = driver.findElement(By.id("contact_p"));
		assertEquals("none", contactBtn.getCssValue("display"));
		assertEquals("block", contactInfo.getCssValue("display"));
	}
	
	@Test
	void carouselTest() throws InterruptedException {
		WebElement leftArrow = driver.findElement(By.className("glyphicon-chevron-left"));
		WebElement rightArrow = driver.findElement(By.className("glyphicon-chevron-right"));
		//should only be the carousel images
		List<WebElement> images = driver.findElements(By.tagName("img"));
		
		assertTrue(images.get(0).isDisplayed());
		assertFalse(images.get(1).isDisplayed());
		assertFalse(images.get(2).isDisplayed());
		
		moveRightTest(rightArrow, images);
		moveLeftTest(leftArrow, images);
	}
	
	private void moveRightTest(WebElement arrow, List<WebElement> images) {
		//two click acts as one with enough delay time for tests
		arrow.click();
		arrow.click();
				
		assertFalse(images.get(0).isDisplayed());
		assertTrue(images.get(1).isDisplayed());
		assertFalse(images.get(2).isDisplayed());
				
		arrow.click();
		arrow.click();
				
		assertFalse(images.get(0).isDisplayed());
		assertFalse(images.get(1).isDisplayed());
		assertTrue(images.get(2).isDisplayed());
	}
	
	private void moveLeftTest(WebElement arrow, List<WebElement> images) {
		//two click acts as one with enough delay time for tests
		arrow.click();
		arrow.click();
				
		assertFalse(images.get(0).isDisplayed());
		assertTrue(images.get(1).isDisplayed());
		assertFalse(images.get(2).isDisplayed());
				
		arrow.click();
		arrow.click();
				
		assertTrue(images.get(0).isDisplayed());
		assertFalse(images.get(1).isDisplayed());
		assertFalse(images.get(2).isDisplayed());
	}
	
	@Test
	void homePageSearch() {
		WebElement searchForm = driver.findElement(By.id("searchForm"));
		searchForm.sendKeys("Selenium Test");
		searchForm.sendKeys(Keys.RETURN);
		
		WebElement eventsTitle = driver.findElement(By.id("search_ph"));
		assertEquals("Searching for: Selenium Test", eventsTitle.getText());
	}

	@AfterAll
	public static void tearDown() {
		//driver.close();
	}
}
