package ee.ut.euim.domain.stakeholder.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StakeholderCreateRequest {

  @NotNull
  private String name;

  @NotNull
  private Integer questionnaireId;
}
