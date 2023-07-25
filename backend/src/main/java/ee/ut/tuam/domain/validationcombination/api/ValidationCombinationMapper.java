package ee.ut.tuam.domain.validationcombination.api;

import ee.ut.tuam.domain.validation.api.ValidationMapper;
import ee.ut.tuam.domain.validationcombination.persistence.ValidationCombination;
import ee.ut.tuam.domain.validationcombinationresult.api.ValidationCombinationResultMapper;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationCombinationMapper {

  public static List<ValidationCombinationResponse> toResponse(List<ValidationCombination> validationCombinations) {
    return validationCombinations.stream().map(ValidationCombinationMapper::toResponse).toList();
  }

  public static ValidationCombinationResponse toResponse(ValidationCombination validationCombination) {
    return new ValidationCombinationResponse(
      validationCombination.getId(),
      ValidationMapper.toResponse(validationCombination.getValidation()),
      validationCombination.getValidationValue().getName(),
      ValidationCombinationResultMapper.toResponseNoCombinations(validationCombination.getValidationCombinationResult())
    );
  }
}
