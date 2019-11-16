package ssbracket.tests.firefoxtests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTestLeaderTest {
	
	static String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(leaderboardURL);
	}

	@Test
	void buttonTest() { 
		WebElement btn = driver.findElement(By.id("btn1"));
		assertEquals(btn.getText(), "TOP WINRATES");
	}
	
	@Test 
	void contentsTest() {
		WebElement list = driver.findElement(By.id("top_list1"));
		assertTrue(list.getText() != "");
	}
	
	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
