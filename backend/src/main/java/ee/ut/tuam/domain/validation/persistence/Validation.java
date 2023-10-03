package ee.ut.tuam.domain.validation.persistence;

import ee.ut.tuam.domain.validationautofill.persistence.ValidationAutofill;
import ee.ut.tuam.domain.validationcombination.persistence.ValidationCombination;
import ee.ut.tuam.domain.validationsummary.persistence.ValidationSummary;
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
@Table(name= Validation.TABLE)
@ToString
public class Validation {

  public static final String TABLE = "validation";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String nameEt;

  @Column
  private String nameEn;

  @Column
  private Integer weight;

  @Column
  private String type;

  @ManyToOne
  private ValidationSummary summary;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "validationToFill")
  private List<ValidationAutofill> validationAutofills = new ArrayList<>();
}
