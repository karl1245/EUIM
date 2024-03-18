package ee.ut.euim.domain.export.api;

import ee.ut.euim.domain.export.service.ExcelComposerService;
import ee.ut.euim.domain.questionnaire.api.QuestionnaireMapper;
import ee.ut.euim.domain.questionnaire.api.QuestionnaireResponse;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/excel", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExcelExportController {

  private final ExcelComposerService excelComposerService;

  @GetMapping(value = "/{id}") //TODO add params
  public void getQuestionnaire(@PathVariable(value = "id") Integer id, HttpServletResponse response) throws IOException {
    log.info("Exporting excel by questionnaire id: {}", id);
    response.setContentType("application/octet-stream");
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());

    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx"; //TODO change name
    response.setHeader(headerKey, headerValue);
    ExcelComposerService.CreateParameters createparams = new ExcelComposerService.CreateParameters(id, "et", false); //TODO use params
    XSSFWorkbook workbook = excelComposerService.compose(createparams);
    ServletOutputStream outputStream = response.getOutputStream();
    workbook.write(outputStream);
    workbook.close();

    outputStream.close();
  }
}
