package ee.ut.euim.domain.validationcombination.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationCombinationRepository extends JpaRepository<ValidationCombination, Integer>, JpaSpecificationExecutor<ValidationCombination> {}
