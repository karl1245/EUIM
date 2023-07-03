package ee.ut.tuam.common;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiTestRepository extends JpaRepository<ApiTest, Long>, JpaSpecificationExecutor<ApiTest> {}
