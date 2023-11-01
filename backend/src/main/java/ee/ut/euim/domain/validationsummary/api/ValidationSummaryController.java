package ee.ut.euim.domain.validationsummary.api;

import ee.ut.euim.domain.validationsummary.service.ValidationSummaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/validation-summary", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValidationSummaryController {

  private final ValidationSummaryService validationSummaryService;

  @GetMapping
  public List<ValidationSummaryResponse> getValidationSummaries() {
    log.info("Getting all validation summaries");

    return ValidationSummaryMapper.toResponse(validationSummaryService.get());
  }
}
