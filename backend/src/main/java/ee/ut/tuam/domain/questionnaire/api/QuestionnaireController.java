package ee.ut.tuam.domain.questionnaire.api;

import ee.ut.tuam.domain.questionnaire.service.QuestionnaireService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/questionnaire", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuestionnaireController {

  private final QuestionnaireService questionnaireService;

  @GetMapping
  public List<QuestionnaireResponse> getQuestionnaires() {
    log.info("Getting all questionnaires");

    return QuestionnaireMapper.toResponse(questionnaireService.get());
  }

  @GetMapping(value = "/{id}")
  public QuestionnaireResponse getQuestionnaire(@PathVariable(value = "id") Integer id) {
    log.info("Getting questionnaire by id: {}", id);

    return QuestionnaireMapper.toResponse(questionnaireService.get(id));
  }

  @PutMapping
  public void putQuestionnaire(@RequestBody @Valid QuestionnaireRequest questionnaire) {
    log.info("Saving questionnaire: {}", questionnaire);
    questionnaireService.save(QuestionnaireMapper.toQuestionnaire(questionnaire));
  }
}
