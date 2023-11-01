package ee.ut.euim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class SpringAngularDemoApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(SpringAngularDemoApplication.class, args);
		Runtime rt = Runtime.getRuntime();
		String url = "http://localhost:8080";
		rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
		System.out.println("Press 'Enter' key to exit.");
		System.console().readLine();

	}

}
