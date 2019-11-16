import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTestHome {

	static String homepageURL = "http://www.ssbracket.xyz";
	
	static WebDriver driver;
	
	@BeforeAll
	public static void setup() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		driver = new FirefoxDriver();
		driver.get(homepageURL);
	}
	
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

	@AfterAll
	public static void tearDown() {
		driver.close();
	}
}
