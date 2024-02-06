package ee.ut.euim.domain.validationanswer.api;

import ee.ut.euim.domain.featureprecondition.api.FeaturePreconditionResponse;
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
  private FeaturePreconditionResponse featurePreconditionResponse;
}
