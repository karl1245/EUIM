package ee.ut.euim.domain.validationanswer.service;

import ee.ut.euim.domain.questionnaire.service.QuestionnaireService;
import ee.ut.euim.domain.validation.service.ValidationService;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerRepository;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerSpecification.rowId;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationAnswerService {

  private final ValidationAnswerRepository validationAnswerRepository;
  private final QuestionnaireService questionnaireService;
  private final ValidationService validationService;

  public ValidationAnswer save(SaveParameters params) {
    return validationAnswerRepository.save(
      new ValidationAnswer()
        .setAnswer(params.answer())
        .setId(params.id())
        .setRowId(params.rowId())
        .setType(params.type())
        .setQuestionnaire(questionnaireService.get(params.questionnaireId()))
        .setValidation(validationService.getById(params.validationId()))
    );
  }

  public List<ValidationAnswer> findByQuestionnaireId(Integer id) {
    return validationAnswerRepository.findAll(ValidationAnswerSpecification.questionnaireId(id));
  }

  public void delete(Integer id) {
    validationAnswerRepository.deleteById(id);
  }

  public void deleteByQuestionnaireId(Integer id) {
    validationAnswerRepository.delete(ValidationAnswerSpecification.questionnaireId(id));
  }

  public void delete(Integer questionnaireId, Integer rowId) {
    validationAnswerRepository.delete(ValidationAnswerSpecification.questionnaireId(questionnaireId).and(rowId(rowId)));
  }

  public record SaveParameters(Integer id, Integer rowId, String answer, String type, Integer questionnaireId, Integer validationId) { }
}
