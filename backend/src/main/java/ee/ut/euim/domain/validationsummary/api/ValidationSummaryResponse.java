package ee.ut.euim.domain.validationsummary.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ValidationSummaryResponse {

  private Integer id;
  private String nameEt;
  private String nameEn;
  private Integer weight;
  private List<Integer> validationIds;
}
