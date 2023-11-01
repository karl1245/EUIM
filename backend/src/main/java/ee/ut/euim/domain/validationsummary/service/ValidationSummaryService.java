package ee.ut.euim.domain.validationsummary.service;

import ee.ut.euim.domain.validationsummary.persistence.ValidationSummary;
import ee.ut.euim.domain.validationsummary.persistence.ValidationSummaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationSummaryService {

  private final ValidationSummaryRepository validationSummaryRepository;

  public List<ValidationSummary> get() {
    return validationSummaryRepository.findAll();
  }
}
