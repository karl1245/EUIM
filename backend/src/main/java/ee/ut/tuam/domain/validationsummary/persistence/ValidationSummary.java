package ee.ut.tuam.domain.validationsummary.persistence;

import ee.ut.tuam.domain.validation.persistence.Validation;
import ee.ut.tuam.domain.validationcombinationresult.persistence.ValidationCombinationResult;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name= ValidationSummary.TABLE)
@ToString
public class ValidationSummary {

  public static final String TABLE = "validation_summary";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String nameEt;

  @Column
  private String nameEn;

  @Column
  private Integer weight;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "summary")
  private List<Validation> validations = new ArrayList<>();
}
