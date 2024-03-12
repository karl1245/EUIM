package ee.ut.euim.domain.export.service;

import ee.ut.euim.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.euim.domain.featuregroup.service.FeatureGroupService;
import ee.ut.euim.domain.questionnaire.persistence.Questionnaire;
import ee.ut.euim.domain.questionnaire.service.QuestionnaireService;
import ee.ut.euim.domain.validation.service.ValidationService;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.euim.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelComposerService {

  private final QuestionnaireService questionnaireService;
  private final ValidationAnswerService validationAnswerService;
  private final ValidationService validationService;
  private final FeatureGroupService featureGroupService;

  public XSSFWorkbook compose(CreateParameters params) {
    Questionnaire questionnaire = questionnaireService.get(params.questionnaireId());
    if (params.exportFeatureGroupsToSeparateSheets()) {
      List<FeatureGroup> featureGroups = featureGroupService.getByQuestionnaireId(params.questionnaireId());
      HashMap<FeatureGroup, List<ValidationAnswer>> answersByFeatureGroup = new HashMap<>();

      for (FeatureGroup featureGroup : featureGroups) {
        answersByFeatureGroup.put(featureGroup, validationAnswerService.findByFeatureGroupId(featureGroup.getId()));
      }
    }

    //validationAnswerService.findByFeatureGroupId()
    XSSFWorkbook workbook = new XSSFWorkbook();
    //workbook.createSheet()
    return  workbook;
  }

  public record CreateParameters(Integer questionnaireId, String language, Boolean exportFeatureGroupsToSeparateSheets) {}

}
