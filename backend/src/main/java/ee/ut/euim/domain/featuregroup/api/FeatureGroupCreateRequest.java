package ee.ut.euim.domain.featuregroup.api;

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
public class FeatureGroupCreateRequest {

  private String name;
  private Integer questionnaireId;
}
