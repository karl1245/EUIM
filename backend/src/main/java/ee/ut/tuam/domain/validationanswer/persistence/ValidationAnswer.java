package ee.ut.tuam.domain.validationanswer.persistence;

import ee.ut.tuam.domain.questionnaire.persistence.Questionnaire;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name= ValidationAnswer.TABLE)
@ToString
@Accessors(chain = true)
public class ValidationAnswer {

  public static final String TABLE = "validation_answer";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String answer;

  @Column
  private Integer rowId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="questionnaire_id")
  private Questionnaire questionnaire;
}
