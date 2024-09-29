import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Col, Pagination, Row, Spin, Tag} from "antd";
import './Search.css';
import {getAllJob} from "../../services/jobServices.jsx";
import DrawJobSearch from "./DrawJobSearch.jsx";
import {getCompanys} from "../../services/companyServices.jsx";
import GoBack from "../../components/GoBack/GoBack.jsx";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [company, setCompany] = useState([]);
  const [pagi, setPagi] = useState(1)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const city = searchParams.get('city');
    const keyword = searchParams.get('keyword');
    setCity(city);
    setKeyword(keyword);
    const fetchApi = async () => {
      const response = await getAllJob();
      const resCompany = await getCompanys();
      setCompany(resCompany);
      if (city === "All" && keyword === "") {
        const dataFinal = response.filter(item => item.status)
        setData(dataFinal.reverse());
      } else {
        const jobNeed = response.filter(item => {
          if (item.status) {
            if (city !== "All" && keyword !== "") {
              return (item.city.includes(city) && item.tags.includes(keyword));
            } else if (city !== "All") {
              return item.city.includes(city);
            } else if (keyword !== "") {
              return item.tags.includes(keyword);
            }
          }
        })
        setData(jobNeed.reverse());
      }
    }
    fetchApi();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [location.search])
  const handleChange = (e) => {
    setPagi(e);
    navigate(`?city=${city}&keyword=${keyword}&page=${e}`);
  }
  return (
    <>
      <Row justify="center">
        <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
          <GoBack/>
        </Col>
        <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20} className="form-res-search">
          <span className="res-search">Kết quả tìm kiếm:</span>
          {city !== "All" && <Tag>{city}</Tag>}
          {keyword !== "" && <Tag>{keyword}</Tag>}
        </Col>
        <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20} className="form-res-search">
          {data.length > 0 ? (<>
            <Row gutter={[20, 20]} className="mt-20 search" justify="center">
              {data.map((item, index) => {
                if (index >= (page - 1) * 10 && index < page * 10) {
                  return <DrawJobSearch item={item} name={company[item.idCompany - 1].companyName} key={index}/>
                }
              })}
            </Row>
            <Pagination className="mt-20" align="center" onChange={handleChange} current={page} total={data.length}/>
          </>) : (
            <>
              {loading ? <Row justify="center">
                <Spin spinning={loading}/>
              </Row> : (<h3>Không có dữ liệu</h3>)}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Search
