package ee.ut.euim.domain.validationsummary.api;

import ee.ut.euim.domain.validation.persistence.Validation;
import ee.ut.euim.domain.validationsummary.persistence.ValidationSummary;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationSummaryMapper {

  public static List<ValidationSummaryResponse> toResponse(List<ValidationSummary> validationSummaries) {
    return validationSummaries.stream().map(ValidationSummaryMapper::toResponse).toList();
  }

  public static ValidationSummaryResponse toResponse(ValidationSummary validationSummary) {
    return new ValidationSummaryResponse(
      validationSummary.getId(),
      validationSummary.getNameEt(),
      validationSummary.getNameEn(),
      validationSummary.getWeight(),
      validationSummary.getValidations().stream().map(Validation::getId).toList()
    );
  }
}
