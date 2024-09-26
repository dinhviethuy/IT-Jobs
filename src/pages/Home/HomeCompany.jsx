import {useEffect, useState} from "react";
import {getCompanys} from "../../services/companyServices.jsx";
import {Button, Card, Col, Row} from "antd";
import {Link} from "react-router-dom";

function HomeCompany() {
  const [companys, setCompany] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompanys();
      setCompany(response.reverse());
    }
    fetchApi();
  }, []);
  return (
    <>
      <Row gutter={[20, 20]} className="mt-20">
        {companys.map((company, index) => {
          if (index < 10) {
            return (
              <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24} key={company.id}>
                <Link to={`/company/${company.id}`}>
                  <Card bordered={false} hoverable>
                    <p>Công ty: <b>{company.companyName}</b></p>
                    <p>Số nhân sự: <b>{company.quantityPeople || "Chưa rõ"}</b></p>
                    <p>Địa chỉ: <b>{company.address || "Chưa rõ"}</b></p>
                  </Card>
                </Link>
              </Col>
            )
          }
        })}
        <Col xxl={24} xl={24} sm={24} lg={24} md={24} xs={24}>
          <Link to="/company">
            <Button>Xem thêm</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default HomeCompany