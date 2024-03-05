package ee.ut.euim.domain.stakeholder.api;

import ee.ut.euim.domain.stakeholder.service.StakeholderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static ee.ut.euim.domain.stakeholder.api.StakeholderMapper.toCreateParams;
import static ee.ut.euim.domain.stakeholder.api.StakeholderMapper.toResponse;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/stakeholder", produces = MediaType.APPLICATION_JSON_VALUE)
public class StakeholderController {

  private final StakeholderService stakeholderService;

  @GetMapping("/questionnaire-id/{questionnaireId}")
  public List<StakeholderResponse> get(@PathVariable(value = "questionnaireId") @NotNull Integer id) {
    log.info("Getting stakeholders by questionnaire id: {}", id);

    return toResponse(stakeholderService.getByQuestionnaireId(id));
  }

  @PostMapping
  public StakeholderResponse create(@RequestBody @Valid StakeholderCreateRequest featureGroup) {
    log.info("Creating stakeholder: {}", featureGroup);

    return toResponse(stakeholderService.create(toCreateParams(featureGroup)));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable(value = "id") @NotNull Integer id) {
    log.info("Deleting stakeholder with id: {}", id);

    stakeholderService.delete(id);
  }
}
