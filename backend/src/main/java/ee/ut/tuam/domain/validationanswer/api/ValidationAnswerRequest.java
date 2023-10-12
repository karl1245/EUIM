package ee.ut.tuam.domain.validationanswer.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ValidationAnswerRequest {

  @Positive
  private Integer id;

  @NotNull
  @Positive
  private Integer rowId;

  @NotNull
  private String answer;

  @NotNull
  @Positive
  private Integer questionnaireId;
}
