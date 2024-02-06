package ee.ut.euim.domain.featuregroup.api;

import ee.ut.euim.domain.featuregroup.service.FeatureGroupService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static ee.ut.euim.domain.featuregroup.api.FeatureGroupMapper.toCreateParams;
import static ee.ut.euim.domain.featuregroup.api.FeatureGroupMapper.toResponse;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/feature-group", produces = MediaType.APPLICATION_JSON_VALUE)
public class FeatureGroupController {

  private final FeatureGroupService featureGroupService;

  @GetMapping("/questionnaire-id/{questionnaireId}")
  public List<FeatureGroupResponse> get(@PathVariable(value = "questionnaireId") @NotNull Integer id) {
    log.info("Getting feature groups by questionnaire id: {}", id);

    return toResponse(featureGroupService.getByQuestionnaireId(id));
  }

  @PostMapping
  public FeatureGroupResponse create(@RequestBody @Valid FeatureGroupCreateRequest featureGroup) {
    log.info("Creating feature group: {}", featureGroup);

    return toResponse(featureGroupService.create(toCreateParams(featureGroup)));
  }
}
