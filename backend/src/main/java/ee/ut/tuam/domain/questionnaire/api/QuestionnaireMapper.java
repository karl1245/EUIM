package ee.ut.tuam.domain.questionnaire.api;

import ee.ut.tuam.domain.questionnaire.persistence.Questionnaire;
import ee.ut.tuam.domain.validationanswer.persistence.ValidationAnswer;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionnaireMapper {

  public static List<QuestionnaireResponse> toResponse(List<Questionnaire> questionnaires) {
    return questionnaires.stream().map(QuestionnaireMapper::toResponse).toList();
  }

  public static QuestionnaireResponse toResponse(Questionnaire questionnaire) {
    return new QuestionnaireResponse(
      questionnaire.getId(),
      questionnaire.getName(),
      questionnaire.getValidationAnswers().stream().map(QuestionnaireMapper::toResponse).toList()
    );
  }

  public static QuestionnaireResponse.ValidationAnswerResponse toResponse(ValidationAnswer validationAnswer) {
    return new QuestionnaireResponse.ValidationAnswerResponse(
      validationAnswer.getId(),
      validationAnswer.getRowId(),
      validationAnswer.getAnswer()
    );
  }

  public static Questionnaire toQuestionnaire(QuestionnaireRequest questionnaire) {
    return new Questionnaire().setId(questionnaire.getId()).setName(questionnaire.getName());
  }
}
