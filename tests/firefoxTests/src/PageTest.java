import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

class PageTest {
	
	//TODO: document all tests
	
	String leaderboardURL = "http://www.ssbracket.xyz/site_files/leaderboard_page/index.html";

	@Test
	void buttonTest() {
		System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.get(leaderboardURL);
		
		WebElement overallBtn = driver.findElement(By.id("btn1"));
		overallBtn.click();
		
		WebElement list = driver.findElement(By.id("top_list1"));
		System.out.println(list.getText());
		
		driver.quit();
	}

}
