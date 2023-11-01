package ee.ut.euim.domain.validationvalue.service;

import ee.ut.euim.domain.validationvalue.persistence.ValidationValue;
import ee.ut.euim.domain.validationvalue.persistence.ValidationValueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationValueService {

  private final ValidationValueRepository validationValueRepository;

  public List<ValidationValue> get() {
    return validationValueRepository.findAll();
  }
}
