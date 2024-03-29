import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class JSONReader {
	
	private URL url;
	HttpURLConnection connection = null;
	
	public JSONArray getContent(String urlString) {
		try {
			url = new URL(urlString);
		} catch (MalformedURLException e) {
			System.err.println("Incorrect URL format.");
		}
		JSONObject obj = getResponse();
		
		JSONObject data = (JSONObject) obj.get("data");
        return (JSONArray) data.get("content");
	}

	private JSONObject getResponse() {
		try {
			setup();
		} catch (IOException e) {
			System.err.println("Could not open HTTP connection to API URL.");
		}
		
		try {
			JSONParser parser = new JSONParser();
	        JSONObject object = (JSONObject) parser.parse(readResponse());
	        return object;
		} catch (Exception e) {
			System.err.println("Could not get JSON response from URL.");
		}
		
		return null;
	}
	
	private void setup() throws IOException {
		connection = (HttpURLConnection) url.openConnection();
		
		connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");
	}
	
	private String readResponse() throws IOException {
		StringBuilder response = new StringBuilder();
		
		if (connection != null) {
			InputStreamReader isr = new InputStreamReader(connection.getInputStream());
			BufferedReader br = new BufferedReader(isr);
	        String inputLine;
	
	        while ((inputLine = br.readLine()) != null)
	            response.append(inputLine);
	        br.close();
		}
        
        return response.toString();
	}
}
