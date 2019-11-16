package ssbracket.tests.firefoxtests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class TestPageLeader {
	
	static String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	
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
			fail();
		}
		
		for (int i = 1; i < 20; i++)
			assertTrue(listText.contains(Integer.toString(i)));
	}
	
	@Test
	void navBarTest() {
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		
		for( int i = 0; i < navBarLinks.length; i++) {
			try {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				pageLink.click();
				
				WebElement pageElement = driver.findElement(By.id(pageIds[i]));
				
				driver.navigate().back();
			} catch(Exception e) {
				fail();
			}
		}
	}

	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
