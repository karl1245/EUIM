package ee.ut.euim.domain.validationanswer.service;

import ee.ut.euim.domain.feature.service.FeatureService;
import ee.ut.euim.domain.featuregroup.service.FeatureGroupService;
import ee.ut.euim.domain.featureprecondition.service.FeaturePreconditionService;
import ee.ut.euim.domain.questionnaire.service.QuestionnaireService;
import ee.ut.euim.domain.validation.service.ValidationService;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerRepository;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static ee.ut.euim.domain.validationanswer.persistence.ValidationAnswerSpecification.rowId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ValidationAnswerService {

  private final ValidationAnswerRepository validationAnswerRepository;
  private final QuestionnaireService questionnaireService;
  private final ValidationService validationService;
  private final FeaturePreconditionService featurePreconditionService;
  private final FeatureGroupService featureGroupService;
  private final FeatureService featureService;

  public ValidationAnswer save(SaveParameters params) {
    return validationAnswerRepository.save(
      new ValidationAnswer()
        .setAnswer(params.answer())
        .setId(params.id())
        .setRowId(params.rowId())
        .setType(params.type())
        .setQuestionnaire(questionnaireService.get(params.questionnaireId()))
        .setValidation(validationService.getById(params.validationId()))
        .setFeatureGroup(featureGroupService.get(params.featureGroupId))
        .setFeature(featureService.get(params.featureId))
        .setFeaturePrecondition(featurePreconditionService.findOrCreatePrecondition(params.featurePreconditionId, params.answer()))
    );
  }

  public List<ValidationAnswer> findByQuestionnaireId(Integer id) {
    return validationAnswerRepository.findAll(ValidationAnswerSpecification.questionnaireId(id));
  }
  public List<ValidationAnswer> findByFeatureGroupId(Integer id) {
    return validationAnswerRepository.findAll(ValidationAnswerSpecification.featureGroupId(id));
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

  public record SaveParameters(
    Integer id,
    Integer rowId,
    String answer,
    String type,
    Integer questionnaireId,
    Integer validationId,
    Integer featurePreconditionId,
    Integer featureGroupId,
    Integer featureId
  ) { }
}
