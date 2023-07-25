package ee.ut.tuam.domain.validation.service;

import ee.ut.tuam.domain.validation.persistence.Validation;
import ee.ut.tuam.domain.validation.persistence.ValidationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationService {

  private final ValidationRepository validationRepository;

  public List<Validation> get() {
    return validationRepository.findAll();
  }
}
