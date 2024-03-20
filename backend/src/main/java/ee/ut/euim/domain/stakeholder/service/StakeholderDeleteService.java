package ee.ut.euim.domain.stakeholder.service;

import ee.ut.euim.domain.stakeholder.persistence.StakeholderRepository;
import ee.ut.euim.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StakeholderDeleteService {

  private final StakeholderRepository stakeholderRepository;
  private final ValidationAnswerService validationAnswerService;

  public void deleteAndRemoveFromValidationAnswers(Integer id) {
    validationAnswerService.removeStakeHolderById(id);
    delete(id);
  }

  public void delete(Integer id) {
    stakeholderRepository.deleteById(id);
  }
}
