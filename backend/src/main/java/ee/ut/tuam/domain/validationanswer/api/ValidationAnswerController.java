package ee.ut.tuam.domain.validationanswer.api;

import ee.ut.tuam.domain.validationanswer.service.ValidationAnswerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/validation-answer", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValidationAnswerController {

  private final ValidationAnswerService validationAnswerService;

  @PutMapping
  public void putValidationAnswer(@RequestBody @Valid ValidationAnswerRequest validationAnswer) {
    log.info("Saving validation answer: {}", validationAnswer);
    validationAnswerService.save(ValidationAnswerMapper.toValidationAnswerSaveParams(validationAnswer));
  }
}
