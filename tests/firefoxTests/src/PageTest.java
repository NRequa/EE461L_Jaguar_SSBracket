import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTest {
	
	String leaderboardURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/site_files/leaderboard_page/index.html";

	@Test
	void buttonTest() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.get(leaderboardURL);
		
		WebElement overallBtn = driver.findElement(By.id("btn1"));
		overallBtn.click();
		
		WebElement list = driver.findElement(By.id("")
		
		driver.quit();
	}

}
