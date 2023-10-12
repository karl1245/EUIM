package ee.ut.tuam.domain.validationanswer.service;

import ee.ut.tuam.domain.questionnaire.service.QuestionnaireService;
import ee.ut.tuam.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.tuam.domain.validationanswer.persistence.ValidationAnswerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationAnswerService {

  private final ValidationAnswerRepository validationRepository;
  private final QuestionnaireService questionnaireService;

  public void save(SaveParameters params) {
    validationRepository.save(
      new ValidationAnswer()
        .setAnswer(params.answer())
        .setId(params.id())
        .setRowId(params.rowId())
        .setQuestionnaire(questionnaireService.get(params.questionnaireId()))
    );
  }

  public record SaveParameters(Integer id, Integer rowId, String answer, Integer questionnaireId) { }
}
