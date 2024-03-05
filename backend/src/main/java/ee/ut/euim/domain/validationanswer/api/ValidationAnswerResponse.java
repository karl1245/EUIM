package ee.ut.euim.domain.validationanswer.api;

import ee.ut.euim.domain.feature.api.FeatureResponse;
import ee.ut.euim.domain.featureprecondition.api.FeaturePreconditionResponse;
import ee.ut.euim.domain.stakeholder.api.StakeholderResponse;
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
public class ValidationAnswerResponse {

  private Integer id;
  private Integer rowId;
  private String answer;
  private String type;
  private Integer validationId;
  private Integer questionnaireId;
  private Integer featureGroupId;
  private FeaturePreconditionResponse featurePrecondition;
  private FeatureResponse feature;
  private StakeholderResponse stakeholderResponse;
}
