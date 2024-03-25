package ee.ut.euim.domain.featureprecondition.service;

import ee.ut.euim.domain.featureprecondition.persistence.FeaturePreconditionRepository;
import ee.ut.euim.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FeaturePreconditionDeleteService {

  private final FeaturePreconditionRepository featurePreconditionRepository;
  private final ValidationAnswerService validationAnswerService;


  public void deleteAndDeleteValidationAnswersRelatedToPreconditionId(Integer id) {
    validationAnswerService.deleteByFeaturePreconditionId(id);
    delete(id);
  }

  public void delete(Integer id) {
    featurePreconditionRepository.deleteById(id);
  }
}
