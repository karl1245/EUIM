package ee.ut.tuam.deprecated;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name=ApiTest.TABLE)
@ToString
public class ApiTest {

  public static final String TABLE = "api_test";
  public static final String SCHEMA = "main";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name="text_message")
  private String textMessage;
}
