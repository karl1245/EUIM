package ee.ut.tuam.deprecated;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController()
// we allow cors requests from our frontend environment
// note the curly braces that creates an array of strings ... required by the annotation
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequiredArgsConstructor
public class HelloController {

    private final GetApiTestFeature getApiTestFeature;
    private final PersistApiTestFeature persistApiTestFeature;

    // simple GET response for our example purpose, we return a JSON structure
    @GetMapping(value="/api/message", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<String>> getMessages() {
        List<ApiTest> apiTests = getApiTestFeature.getAll();
        List<String> messages = apiTests.stream().map(ApiTest::getTextMessage).toList();
        return Collections.singletonMap("message", messages);
    }

    @PostMapping(value="/api/message", produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveMessage(@RequestBody ApiTestRequest request) {
        ApiTest apiTest = new ApiTest();
        apiTest.setTextMessage(request.getMessage());
        persistApiTestFeature.save(apiTest);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApiTestRequest {
        private String message;
    }

}
