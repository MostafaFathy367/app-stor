import { Row, Col, Input } from "antd";

const FilterProducts = ({ handelSearch }) => {
  return (
    <Row gutter={[10, 15]}>
      <Col md={12}>
        <Input
          placeholder="Search By Name"
          onChange={(e) => handelSearch(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default FilterProducts;
