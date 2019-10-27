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
	String leaderBoardURL = "file:///E:/University%20of%20Texas/UT%20Fall%202019/EE461L_Jaguar_SSBracket/site_files/leaderboard_page/index.html";
	
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
				WebElement divSection = driver.findElement(By.id(sectIds[i]));
				// 
				assertEquals(visibility.get(i)[0], divSection.isDisplayed());			
			}
		}
		
		finally {
			driver.quit();
		}
		
	}

	@Test
	void testLeaderboards() throws InterruptedException {
		// Get URL
		WebDriver driver = new ChromeDriver();
		driver.get(leaderBoardURL);
		Thread.sleep(1000);
		// Build leaderboard top users
		WebElement usersList = driver.findElement(By.id("top_list1"));
		
		// Split into sorted array
		String fullString = usersList.getText();
		String[] splitString = fullString.split("[:\n]");
		
		// Build 2D array to sort like JSON return
		int length = (splitString.length / 2);
		String[][] siteOrder = new String[length][2];
		double prevWinPct = 0;
		double currWinPct;
		
		for(int i = 0; i < splitString.length - 2; i = i + 2) {
			String name = splitString[i];
			String winPct = splitString[i + 1].trim();
			
			siteOrder[i / 2][0] = name;
			siteOrder[i / 2][1] = winPct;
			
			
			
			if(i == 0) {
				prevWinPct = Double.parseDouble(winPct);
			}
			
			else {
				currWinPct = Double.parseDouble(winPct);
				
				assertTrue(prevWinPct >= currWinPct);
				
				prevWinPct = currWinPct;
			}
			
		}
		
		
	}

}
