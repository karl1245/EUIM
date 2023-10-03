package ee.ut.tuam.domain.validation.api;

import ee.ut.tuam.domain.validation.persistence.Validation;
import ee.ut.tuam.domain.validationautofill.persistence.ValidationAutofill;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationMapper {

  public static List<ValidationResponse> toResponse(List<Validation> validations) {
    return validations.stream().map(ValidationMapper::toResponse).toList();
  }

  public static ValidationResponse toResponse(Validation validation) {
    return new ValidationResponse(
      validation.getId(),
      validation.getNameEt(),
      validation.getNameEn(),
      validation.getWeight(),
      validation.getType(),
      validation.getSummary().getId(),
      validation.getValidationAutofills().stream().map(ValidationMapper::toResponse).toList()
    );
  }

  public static ValidationResponse.ValidationAutofill toResponse(ValidationAutofill validationAutofill) {
    return new ValidationResponse.ValidationAutofill(
      validationAutofill.getValidationFilledBy() != null ? validationAutofill.getValidationFilledBy().getId() : null,
      validationAutofill.getWeight(),
      validationAutofill.getPlaceholder(),
      validationAutofill.getType()
    );
  }
}
