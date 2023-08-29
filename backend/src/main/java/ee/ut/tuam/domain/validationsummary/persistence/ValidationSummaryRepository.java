package ee.ut.tuam.domain.validationsummary.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationSummaryRepository extends JpaRepository<ValidationSummary, Integer>, JpaSpecificationExecutor<ValidationSummary> {}
