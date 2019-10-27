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
	static String localBracketURL="file:///home/up1007/461l/jaguar/EE461L_Jaguar_SSBracket/site_files/bracket_page/index.html";
	static String testTourURL= "http://www.ssbracket.xyz/site_files/bracket_page/bracket.html?id=146";

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
		createBtn.click();
		driver.navigate().back();
		}
		catch(Exception e){
			fail();
		}

	}

	@Test
	void emptyTourTest() {
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		createBtn.click();

		WebElement bracketBtn=driver.findElement(By.id("create-tour"));
		bracketBtn.click();
		//empty test bracket

		WebElement modMess=driver.findElement(By.id("modal-text"));
		assertEquals("Tournament Name must have some text.",modMess.getText());
	}

	@Test
	void emptyDescTest() {
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		createBtn.click();

		WebElement tourName=driver.findElement(By.id("tournament_name"));
		tourName.sendKeys("Test Tour");

		WebElement bracketBtn=driver.findElement(By.id("create-tour"));
		bracketBtn.click();
		//empty description

		WebElement modMess=driver.findElement(By.id("modal-text"));
		assertEquals("Tournament Description must have some text.",modMess.getText());
	}

	@Test
	void emptyPlayerTest() {
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		createBtn.click();

		WebElement tourName=driver.findElement(By.id("tournament_name"));
		tourName.sendKeys("Test Tour");

		WebElement tourDesc=driver.findElement(By.id("tournament_desc"));
		tourDesc.sendKeys("Test Description");

		WebElement bracketBtn=driver.findElement(By.id("create-tour"));
		bracketBtn.click();
		//empty player

		WebElement modMess=driver.findElement(By.id("modal-text"));
		assertEquals("Invalid player size",modMess.getText());
	}

	@Test
	void invalidPlayerTest() {
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		createBtn.click();

		WebElement tourName=driver.findElement(By.id("tournament_name"));
		tourName.sendKeys("Test Tour");

		WebElement tourDesc=driver.findElement(By.id("tournament_desc"));
		tourDesc.sendKeys("Test Description");

		WebElement tourPlay=driver.findElement(By.id("tournament_players"));
		tourPlay.sendKeys("Test Players");

		WebElement bracketBtn=driver.findElement(By.id("create-tour"));
		bracketBtn.click();

		WebElement modMess=driver.findElement(By.id("modal-text"));
		assertEquals("Invalid player size",modMess.getText());

		tourPlay.clear();
		tourPlay.sendKeys("2");
		bracketBtn.click();

		WebElement modMess=driver.findElement(By.id("modal-text"));
		assertEquals("Invalid player size",modMess.getText());
	}

	@Test
	void validTourTest() {
		WebElement createBtn=driver.findElement(By.id("bracket_btn"));
		createBtn.click();

		WebElement tourName=driver.findElement(By.id("tournament_name"));
		tourName.sendKeys("Test Tour");

		WebElement tourDesc=driver.findElement(By.id("tournament_desc"));
		tourDesc.sendKeys("Test Description");

		WebElement tourPlay=driver.findElement(By.id("tournament_players"));
		tourPlay.sendKeys("4");

		WebElement bracketBtn=driver.findElement(By.id("create-tour"));
		bracketBtn.click();

		WebElement tourTitle=driver.findElement(By.id("title"));
		assertEquals("Test Tour",tourTitle.getText());

		WebElement tourD=driver.findElement(By.id("desc"));
		assertEquals("Test Description",tourD.getText());

	}

	@Test
	void bracketNameEqualTest(){
		driver.get(testTourURL);
		WebElement player;
		WebElement modTa;
		WebElement modEnt;
		WebElement modCanc;
		String text;
		List <WebElement> playerText=driver.findElements(By.class("p-contain"));
		for(int i=0;i<30;i++){
			text=playerText.get(i).getText();
			player=driver.findElement(By.id(""+i));
			player.click();
			modTa=driver.findElement(By.id("modal-ta"));
			assertTrue(text.equals(modTa.getText()));
			modCanc=driver.findElement(By.id("modal-cancel"));
			modCanc.click();
		}
	}

	@Test
	void bracketNameChangeTest(){
		driver.get(testTourURL);
		WebElement player;
		WebElement modTa;
		WebElement modEnt;
		WebElement modCanc;
		String text;
		List <WebElement> playerText=driver.findElements(By.class("p-contain"));
		for(int i=0;i<30;i++){
			player=driver.findElement(By.id(""+i));
			player.click();
			modTa=driver.findElement(By.id("modal-ta"));
			modTa.sendKeys(""+i);
			modEnt=driver.findElement(By.id("modal-enter"));
			modEnt.click();
			text=playerText.get(i).getText();
			assertEquals(""+i,text);
		}
	}

	@AfterAll
	public static void tearDown() {
		driver.close();
	}


}
