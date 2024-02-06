package ee.ut.euim.domain.featureprecondition.service;

import ee.ut.euim.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.euim.domain.featureprecondition.persistence.FeaturePreconditionRepository;
import ee.ut.euim.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeaturePreconditionService {

  private final FeaturePreconditionRepository featurePreconditionRepository;

  public FeaturePrecondition create(String answer) {
    log.info("Creating feature precondition with answer: {}", answer);

    return featurePreconditionRepository.save(new FeaturePrecondition().setAnswer(answer));
  }

  public FeaturePrecondition get(Integer id) {
    log.info("Getting feature precondition with id: {}", id);

    return featurePreconditionRepository.findById(id).orElseThrow(
      () -> new NoSuchElementException("Feature precondition not found with id:" + id)
    );
  }

  public FeaturePrecondition findOrCreatePrecondition(Integer id, String answer) {
    if (id == null) {
      return create(answer);
    }

    return get(id);
  }
}
