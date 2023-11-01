package ee.ut.tuam.domain.questionnaire.service;

import ee.ut.tuam.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionnaireDeleteService {

  private final ValidationAnswerService validationAnswerService;
  private final QuestionnaireService questionnaireService;

  public void delete(Integer id) {
    validationAnswerService.deleteByQuestionnaireId(id);
    questionnaireService.delete(id);
  }
}
