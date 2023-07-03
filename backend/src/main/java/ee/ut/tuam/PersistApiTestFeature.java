package ee.ut.tuam;

import ee.ut.tuam.common.ApiTest;
import ee.ut.tuam.common.ApiTestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersistApiTestFeature {

  private final ApiTestRepository repository;

  @Transactional
  public ApiTest save(ApiTest apiTest) {
    return repository.save(apiTest);
  }
}
