package ee.ut.tuam.domain.validation.api;

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
public class ValidationResponse {

  private Integer id;
  private String nameEt;
  private String nameEn;
}
