package ee.ut.tuam.deprecated;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetApiTestFeature {

  private final ApiTestRepository repository;

  @Transactional
  public List<ApiTest> getAll() {
    List<ApiTest> test = repository.findAll();
    return repository.findAll();
  }
}
