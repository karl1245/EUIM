package ee.ut.euim.domain.validationanswer.persistence;

import ee.ut.euim.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.euim.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.euim.domain.questionnaire.persistence.Questionnaire;
import ee.ut.euim.domain.validation.persistence.Validation;
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

  @Column
  private String type;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="questionnaire_id")
  private Questionnaire questionnaire;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="validation_id")
  private Validation validation;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="feature_group_id")
  private FeatureGroup featureGroup;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="feature_precondition_id")
  private FeaturePrecondition featurePrecondition;
}
