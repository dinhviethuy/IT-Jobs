import {Col, Row} from "antd";
import HomeCity from "./HomeCity.jsx";
import HomeCompany from "./HomeCompany.jsx";

function Home() {
  return (
    <>
      <Row justify="center">
        <Col xl={20} lg={20} md={20} sm={20} xs={20}>
          <h1>1000+ IT Jobs For Developers</h1>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} xs={20}>
          <HomeCity />
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} xs={20}>
          <h2>Danh sách một số công ty</h2>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} xs={20}>
          <HomeCompany />
        </Col>
      </Row>
    </>
  )
}

export default Home