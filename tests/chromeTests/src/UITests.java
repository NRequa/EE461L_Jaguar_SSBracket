import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.Test;

class UITests {
	String homePageURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/";
	
	@BeforeAll
	static void setUpWebdriver() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		
	}
	
	@Test
	void testHomePageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(homePageURL);
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.navigate().back();
			}
		}
		
		finally {
			driver.quit();
		}
		
	}
	
	@Test
	void testHomePage() {
		
	}
	

}
