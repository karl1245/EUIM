package ee.ut.tuam.domain.validation.api;

import ee.ut.tuam.domain.validation.persistence.Validation;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationMapper {

  public static List<ValidationResponse> toResponse(List<Validation> validations) {
    return validations.stream().map(ValidationMapper::toResponse).toList();
  }

  public static ValidationResponse toResponse(Validation validation) {
    return new ValidationResponse(
      validation.getId(),
      validation.getNameEt(),
      validation.getNameEn()
    );
  }
}
