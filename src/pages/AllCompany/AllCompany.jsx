import React, {useEffect, useState} from "react";
import {getCompanys} from "../../services/companyServices.jsx";
import {Card, Col, Pagination, Row, Spin} from "antd";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";

function AllCompany() {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [companys, setCompany] = useState([])
  const [pagi, setPagi] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setPagi(parseInt(page));
    const fetchApi = async () => {
      const response = await getCompanys();
      setCompany(response.reverse());
    }
    fetchApi()
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [location.search]);
  const handleChange = (e) => {
    setPagi(e);
    navigate(`/company?page=${e}`);
  }
  return (
    <>
      {companys.length > 0 ? (<>
        <Row justify="center">
          <Col xxl={20} xl={20} lg={20} sm={20} md={20} xs={20}>
            <h2>Danh sách công ty</h2>
          </Col>
          <Col xxl={20} xl={20} lg={20} sm={20} md={20} xs={20}>
            <Row gutter={[20, 20]}>
              {companys.map((company, index) => {
                if (index >= (page - 1) * 10 && index < page * 10) {
                  return (
                    <Col xl={6} lg={8} md={12} sm={12} xs={24} key={index}>
                      <Link to={`/company/${company.id}`}>
                        <Card bordered={false} hoverable>
                          <p>Công ty: <b>{company.companyName}</b></p>
                          <p>Số điện thoại: <b>{company.phone || "Chưa rõ"}</b></p>
                          <p>Số nhân sự: <b>{company.quantityPeople || "Chưa rõ"}</b></p>
                          <p>Website: <b>{company.website || "Chưa rõ"}</b></p>
                          <p>Địa chỉ: <b>{company.address || "Chưa rõ"}</b></p>
                        </Card>
                      </Link>
                    </Col>
                  )
                }
              })}
            </Row>
          </Col>
        </Row>
        <Pagination className="mt-20" align="center" onChange={handleChange} current={page} total={companys.length}/>
      </>) : (
        <>
          {loading ? <Row justify="center">
            <Spin spinning={loading}/>
          </Row> : (<h3 style={{textAlign: "center"}}>Không có dữ liệu</h3>)}
        </>
      )}
    </>
  )
}

export default AllCompany

