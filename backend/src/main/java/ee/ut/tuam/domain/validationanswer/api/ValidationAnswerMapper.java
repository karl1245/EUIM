package ee.ut.tuam.domain.validationanswer.api;

import ee.ut.tuam.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.tuam.domain.validationanswer.service.ValidationAnswerService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationAnswerMapper {

  public static ValidationAnswerService.SaveParameters toValidationAnswerSaveParams(ValidationAnswerRequest validationAnswer) {
    return new ValidationAnswerService.SaveParameters(
      validationAnswer.getId(),
      validationAnswer.getRowId(),
      validationAnswer.getAnswer(),
      validationAnswer.getType(),
      validationAnswer.getQuestionnaireId(),
      validationAnswer.getValidationId()
    );
  }

  public static List<ValidationAnswerResponse> toResponse(List<ValidationAnswer> validationAnswers) {
    return validationAnswers.stream().map(ValidationAnswerMapper::toResponse).toList();
  }
  public static ValidationAnswerResponse toResponse(ValidationAnswer validationAnswer) {
    return new ValidationAnswerResponse(
      validationAnswer.getId(),
      validationAnswer.getRowId(),
      validationAnswer.getAnswer(),
      validationAnswer.getType(),
      validationAnswer.getValidation().getId(),
      validationAnswer.getQuestionnaire().getId()
    );
  }
}
