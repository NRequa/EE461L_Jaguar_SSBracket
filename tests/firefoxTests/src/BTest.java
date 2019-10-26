import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class BTest {

	static String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";
	static String homepageURL = "http://www.ssbracket.xyz/index.html";
	static String bracketURL = "http://www.ssbracket.xyz/site_files/bracket_page/index.html";

	static WebDriver driver;
	@BeforeAll
	public static void setUp(){
		//this is for linux:for windows add .exe after geckodriver
		System.setProperty("webdriver.gecko.driver", "geckodriver");
		driver = new FirefoxDriver();
		driver.get(bracketURL);
	}
	@Test
	void bracketNavBarTest() {
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
	}
	@Test
	void buttonTest(){
		try{
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		driver.navigate().back();
		}
		finally{
			driver.quit();
		}

	}
	@AfterAll
	public static void tearDown() {
		driver.close();
	}


}
