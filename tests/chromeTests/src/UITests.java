import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Ignore;
import org.junit.jupiter.api.BeforeAll;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.Test;

class UITests {
	String homePageURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/";
	String aboutPageURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/site_files/about_page/index.html";
	String logInPageURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/site_files/account_page/loginPrompt.html";
	String regPageURL = "http://www.ssbracket.xyz.s3-website.us-east-2.amazonaws.com/site_files/account_page/regPage.html";
	String accountPageURL = "http://www.ssbracket.xyz/site_files/account_page/accountDataPage.html";
	
	@BeforeAll
	static void setUpWebdriver() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		
	}
	

	@Test 
	void testHomePageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(homePageURL);
		
		String text;
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				text = pageLink.getText();
				System.out.println(text);
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.get(homePageURL);
			}
		}
		
		finally {
			driver.quit();
		}
	}

	@Test 
	void testAboutPageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(aboutPageURL);
		
		String text;
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				text = pageLink.getText();
				System.out.println(text);
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.get(aboutPageURL);
			}
		}
		
		finally {
			driver.quit();
		}
	}


	@Test 
	void testLogInPageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(logInPageURL);
		
		String text;
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				text = pageLink.getText();
				System.out.println(text);
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.get(logInPageURL);
			}
		}
		
		finally {
			driver.quit();
		}
	}

	
	
	@Test
	void testRegPageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(regPageURL);
		
		String text;
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				text = pageLink.getText();
				System.out.println(text);
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.get(regPageURL);
			}
		}
		
		finally {
			driver.quit();
		}
	}
	

	@Test
	void testAccPageNavBars() {
		WebDriver driver = new ChromeDriver();
		String[] navBarLinks = {"Home", "Tournaments", "LeaderBoard", "About Us", "Register", "Log In"};
		String[] pageIds = {"myCarousel","tweets", "sections", "NRequaUnitTests", "passwordOK", "submit"};
		driver.get(accountPageURL);
		
		String text;
		
		
		try {
			for( int i = 0; i < navBarLinks.length; i++) {
				WebElement pageLink = driver.findElement(By.linkText(navBarLinks[i]));
				text = pageLink.getText();
				System.out.println(text);
				pageLink.click();
				driver.findElement(By.id(pageIds[i]));
				driver.get(accountPageURL);
			}
		}
		
		finally {
			driver.quit();
		}
	}
	 

	@Test
	void testAccountDataButtons() {
		WebDriver driver = new ChromeDriver();
		String[] btnIds = {"showChar", "showFriend", "showSettings"};
		String[] sectIds = {"charSect", "friendsSect", "settingsSect"};
		boolean[] charVisible = {true, false, false};
		boolean[] friendVisible = {false, true, false};
		boolean[] settingsVisible = {false, false, true};
		
		List<boolean[]> visibility = new ArrayList<boolean[]>();
		visibility.add(charVisible);visibility.add(friendVisible);visibility.add(settingsVisible);
		
		try {
			driver.get(accountPageURL);

			for(int i = 0; i < btnIds.length; i++) {
				WebElement btn = driver.findElement(By.id(btnIds[i]));
				btn.click();
				
				WebElement charSection = driver.findElement(By.id(sectIds[0]));
				WebElement friendSection = driver.findElement(By.id(sectIds[1]));
				WebElement settingsSection = driver.findElement(By.id(sectIds[2]));
				
				// Check if div sections expected are dispalayed as expected
				assertEquals(visibility.get(i)[0], charSection.isDisplayed());
				assertEquals(visibility.get(i)[1], friendSection.isDisplayed());			
				assertEquals(visibility.get(i)[2], settingsSection.isDisplayed());			

			}
		}
		
		finally {
			driver.quit();
		}
		
	}

}
