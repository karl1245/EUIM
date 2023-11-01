package ee.ut.euim.domain.validationanswer.persistence;

import ee.ut.euim.domain.questionnaire.persistence.Questionnaire_;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationAnswerSpecification {

  public static Specification<ValidationAnswer> questionnaireId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.questionnaire).get(Questionnaire_.id), id);
  }

  public static Specification<ValidationAnswer> rowId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.rowId), id);
  }
}
