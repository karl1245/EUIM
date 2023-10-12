package ee.ut.tuam.domain.validationcombination.persistence;

import ee.ut.tuam.domain.validation.persistence.Validation;
import ee.ut.tuam.domain.validationcombinationresult.persistence.ValidationCombinationResult;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name= ValidationCombination.TABLE)
@ToString
public class ValidationCombination {

  public static final String TABLE = "validation_combination";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  private ValidationCombinationResult validationCombinationResult;

  @ManyToOne
  private Validation validation;

  @Column
  private String validationValue;
}
