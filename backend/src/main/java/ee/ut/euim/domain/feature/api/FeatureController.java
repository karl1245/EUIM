package ee.ut.euim.domain.feature.api;

import ee.ut.euim.domain.feature.service.FeatureService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static ee.ut.euim.domain.feature.api.FeatureMapper.toResponse;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/feature", produces = MediaType.APPLICATION_JSON_VALUE)
public class FeatureController {

  private final FeatureService featureService;

  @PostMapping
  public FeatureResponse create(@RequestBody @Valid FeatureCreateRequest featureCreateRequest) {
    log.info("Creating feature : {}", featureCreateRequest);

    return toResponse(featureService.create(featureCreateRequest.getAnswer()));
  }

  @PutMapping("/{id}")
  public FeatureResponse update(
    @RequestBody @Valid FeatureCreateRequest featureCreateRequest,
    @PathVariable(value = "id") @NotNull Integer id
  ) {
    log.info("Updating feature with id: {}, with values: {}",id, featureCreateRequest);

    return toResponse(featureService.update(id, featureCreateRequest.getAnswer()));
  }
}
