import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Button, Card, Col, Pagination, Row, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {getAllJobCompany, getCompany} from "../../services/companyServices.jsx";
import DrawJobSearch from "../Search/DrawJobSearch.jsx";
import GoBack from "../../components/GoBack/GoBack.jsx";
import {getCookie} from "../../helpers/cookie.jsx";

function CompanyDelta() {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const id = getCookie('id');
  const param = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState("");
  const [pagi, setPagi] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompany(param.id);
      const job = await getAllJobCompany(param.id);
      const jobFinal = job.filter(item => item.status)
      setCompany(response);
      setJobs(jobFinal.reverse());
      setName(response.companyName)
    }
    fetchApi();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [location.search])
  const handleChange = (e) => {
    setPagi(e);
    navigate(`/company/${param.id}?page=${e}`);
  }
  return (
    <>
      {Object.keys(company).length !== 0 ? (<>
        <Row justify="center">
          <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
            <div className='tool'>
              <GoBack/>
            </div>
          </Col>
          <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
            <Card bordered={false} title={"Công ty: " + company.companyName} className="mt-20" extra={parseInt(id) === company.id && <Link to='/admin'><Button type="primary">Quản lý</Button></Link>}>
              <p>Địa chỉ: <b>{company.address || "Chưa có địa chỉ cụ thể"}</b></p>
              <p>Số lượng nhân sự: <b>{company.quantityPeople || "Chưa có"}</b></p>
              <p>Thời gian làm việc: <b>{company.workingTime || "Chưa có thời gian làm việc cụ thể"}</b></p>
              <p>Link website: <b><a href={company.website} target="_blank">{company.website}</a></b></p>
              <p>Mô tả ngắn: </p>
              <p>{company.description}</p>
              <p>Mô tả chi tiết: </p>
              <p>{company.detail}</p>
            </Card>
          </Col>
          <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
            <Card title="Danh sách các job hiện có" className="mt-20" bordered={false}>
              {jobs.length > 0 ? (<>
                <Row gutter={[20, 20]} justify="center" className="mt-20 search">
                  {jobs.map((company, index) => {
                    if (index >= (page - 1) * 10 && index < page * 10) {
                      return (
                        <DrawJobSearch item={company} name={name} key={index}/>
                      )
                    }
                  })}
                </Row>
              </>) : (<div><b>Chưa có job</b></div>)}
            </Card>
          </Col>
        </Row>
        <Pagination className="mt-20" align="center" onChange={handleChange} current={page} total={jobs.length}/>
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

export default CompanyDelta