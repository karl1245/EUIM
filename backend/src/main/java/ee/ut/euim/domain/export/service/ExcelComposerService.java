package ee.ut.euim.domain.export.service;

import ee.ut.euim.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.euim.domain.featuregroup.service.FeatureGroupService;
import ee.ut.euim.domain.questionnaire.persistence.Questionnaire;
import ee.ut.euim.domain.questionnaire.service.QuestionnaireService;
import ee.ut.euim.domain.validation.service.ValidationService;
import ee.ut.euim.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.euim.domain.validationanswer.service.ValidationAnswerService;
import ee.ut.euim.domain.validationsummary.persistence.ValidationSummary;
import ee.ut.euim.domain.validationsummary.service.ValidationSummaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelComposerService {

  private final QuestionnaireService questionnaireService;
  private final ValidationAnswerService validationAnswerService;
  private final ValidationService validationService;
  private final FeatureGroupService featureGroupService;
  private final ValidationSummaryService validationSummaryService;

  public XSSFWorkbook compose(CreateParameters params) {

    if (Boolean.TRUE.equals(params.exportFeatureGroupsToSeparateSheets())) {
      List<FeatureGroup> featureGroups = featureGroupService.getByQuestionnaireId(params.questionnaireId());
      HashMap<FeatureGroup, List<ValidationAnswer>> answersByFeatureGroup = new HashMap<>();

      for (FeatureGroup featureGroup : featureGroups) {
        answersByFeatureGroup.put(featureGroup, validationAnswerService.findByFeatureGroupId(featureGroup.getId()));
      }
    }

    return createWithoutGroups(params.questionnaireId(), params.language());
  }

  public XSSFWorkbook createWithoutGroups(Integer questionnaireId, String language) {
    Questionnaire questionnaire = questionnaireService.get(questionnaireId);
    List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(questionnaireId);
    List<ValidationSummary> validationSummaries = validationSummaryService.get();

    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Vastused");

    createHeaderRow(language, sheet, workbook, validationSummaries);
    createDataLines(workbook, sheet, validationAnswers);
    return workbook;
  }

  private void createHeaderRow(String language, XSSFSheet sheet, XSSFWorkbook workbook, List<ValidationSummary> validationSummaries) {
    XSSFRow row = sheet.createRow(0);
    XSSFCellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setBold(true);
    font.setFontHeight(16);
    style.setFont(font);

    createCell(row, 0, "ID", style, sheet);

    if (language.toLowerCase().equals("et")) {
      for (int i = 0; i < validationSummaries.size(); i++) {
        createCell(row, i + 1 /*Take ID field into accordance*/ , validationSummaries.get(i).getNameEt(), style, sheet);
      }
    }
  }


  private void createDataLines(XSSFWorkbook workbook, XSSFSheet sheet, List<ValidationAnswer> validationAnswers) {
    HashMap<Integer, List<ValidationAnswer>> answers = getAnswersSortedByRow(validationAnswers);

    int rowCount = 1;

    XSSFCellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setFontHeight(14);
    style.setFont(font);

    for (Map.Entry<Integer, List<ValidationAnswer>> answerByRow : answers.entrySet()) {
      XSSFRow row = sheet.createRow(rowCount++);
      List<ValidationAnswer> answerList = answerByRow.getValue();
      createCell(row, 0, answerByRow.getKey(), style, sheet); //TODO Or just auto increment ID either or
      for (int i = 0; i < answerList.size(); i++) {
        int columnCount = 0;
        createCell(row, i + 1 /*Take ID field into accordance*/, answerList.get(i).getAnswer(), style, sheet);

      }
    }

  }

  private HashMap<Integer, List<ValidationAnswer>> getAnswersSortedByRow(List<ValidationAnswer> validationAnswers) {
    HashMap<Integer, List<ValidationAnswer>> answersSortedByRow = new HashMap<>();
    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (!answersSortedByRow.containsKey(validationAnswer.getRowId())) {
        answersSortedByRow.put(validationAnswer.getRowId(), new ArrayList<>(validationAnswers));

        continue;
      }
      List<ValidationAnswer> rowAnswers = answersSortedByRow.get(validationAnswer.getRowId());
      rowAnswers.add(validationAnswer);
      answersSortedByRow.put(validationAnswer.getRowId(), rowAnswers);
    }

    return answersSortedByRow;
  }

  private void createCell(XSSFRow row, int columnCount, Object value, XSSFCellStyle style, XSSFSheet sheet) {
    sheet.autoSizeColumn(columnCount);
    XSSFCell cell = row.createCell(columnCount);
    if (value instanceof Integer) {
      cell.setCellValue((Integer) value);
    } else if (value instanceof Boolean) {
      cell.setCellValue((Boolean) value);
    } else if (value == null) {
      cell.setCellType(CellType.BLANK);
    } else {
      cell.setCellValue((String) value);
    }
    cell.setCellStyle(style);
  }
  public record CreateParameters(Integer questionnaireId, String language,
                                 Boolean exportFeatureGroupsToSeparateSheets) {
  }

}
