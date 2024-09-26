import {Button, Col, Form, Input, Row, Select, Tag} from "antd";
import {useEffect, useState} from "react";
import {getCity} from "../../services/cityServices.jsx";
import {getTags} from "../../services/TagServices.jsx";
import {Link, useNavigate} from "react-router-dom";
import './Home.css';

function HomeCity() {
  const navigate = useNavigate();
  const [citys, setCity] = useState([]);
  const [tags, setTags] = useState([]);
  let citi = "All";
  const handleFinish = (e) => {
    let {city, search} = e;
    search = search ? search : "";
    navigate(`/search?city=${city}&keyword=${search}`);
  }
  const handleClick = (e) => {
    const search = e.target.innerText;
    navigate(`/search?city=${citi}&keyword=${search}`);
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCity();
      const resTag = await getTags();
      response.unshift({key: 0, value: "All"});
      setCity(response);
      setTags(resTag);
    }
    fetchApi();
  }, []);
  const handleChange = (e) => {
    citi = e;
  }
  return (
    <>
      <Form onFinish={handleFinish}>
        <Row gutter={10}>
          <Col xxl={3} xl={4} lg={6} md={8} sm={10} xs={24}>
            <Form.Item name="city" initialValue="All">
              <Select placeholder="Chọn thành phố" onChange={handleChange}>
                {citys.map((city) => (
                  <Select.Option value={city.value} key={city.key}>{city.value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={10} lg={10} sm={14} xl={6} xxl={6}>
            <Form.Item name="search">
              <Input placeholder="Nhập từ khóa..."/>
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="mt-20">
            <Row gutter={[2, 4]}>
              {tags.map((tag) => (
                <Col key={tag.key}>
                  <Tag color="blue" onClick={handleClick}>
                    <Link style={{color: "blue"}}>{tag.value}</Link>
                  </Tag>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default HomeCity