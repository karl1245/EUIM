package ee.ut.tuam.domain.validationanswer.api;

import ee.ut.tuam.domain.validationanswer.service.ValidationAnswerService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationAnswerMapper {

  public static ValidationAnswerService.SaveParameters toValidationAnswerSaveParams(ValidationAnswerRequest validationAnswer) {
    return new ValidationAnswerService.SaveParameters(
      validationAnswer.getId(),
      validationAnswer.getRowId(),
      validationAnswer.getAnswer(),
      validationAnswer.getQuestionnaireId()
    );
  }
}
