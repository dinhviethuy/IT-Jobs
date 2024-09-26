import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getJob} from "../../services/jobServices.jsx";
import {Button, Card, Col, Form, Input, notification, Row, Select, Spin, Tag, Tooltip} from "antd";
import GoBack from "../../components/GoBack/GoBack.jsx";
import {getCompany} from "../../services/companyServices.jsx";
import getTime from "../../helpers/getTime.jsx";
import {createCv} from "../../services/cvServices.jsx";
import {getCookie} from "../../helpers/cookie.jsx";

function JobsDetail() {
  const id = getCookie('id');
  const param = useParams();
  const [jobs, setJobs] = useState({});
  const [form] = Form.useForm()
  const [notiApi, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJob(param.id);
      if (Object.keys(response).length !== 0 && response?.status) {
        const resCompany = await getCompany(response.idCompany)
        const jobFinally = {
          ...response, companyInfo: resCompany
        };
        setJobs(jobFinally);
      }
    }
    fetchApi();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])
  const rule = [{
    required: true
  }]
  const onFinish = async (e) => {
    form.resetFields();
    const time = getTime();
    const cv = {
      ...e, createAt: time, idJob: parseInt(param.id), idCompany: jobs.idCompany
    }
    const response = await createCv(cv);
    if (response) {
      notiApi.success({
        message: "Gửi CV thành công", description: `Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất`
      });
    } else {
      notiApi.error({
        message: "Gửi CV thất bại", description: `Gặp lỗi khi gửi CV của bạn`
      });
    }
  }
  return (<>
    {contextHolder}
    {Object.keys(jobs).length !== 0 ? (<Row justify="center">
      <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
        <div className="tool">
          <GoBack/>

        </div>
      </Col>
      <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
        <Card bordered={false} className="mt-20" title={"Job: " + jobs.name} extra={<>
          {parseInt(id) === jobs.idCompany &&
            <Link to="/admin" style={{marginRight: "10px"}}><Button type="primary">Quản lý</Button></Link>}
          <Button type="primary" href="#formApply">
            ỨNG TUYỂN NGAY
          </Button>
        </>} >
          <h2 style={{marginTop: "0"}}>Công ty: {jobs.companyInfo?.companyName}</h2>
          <p>Tags: {jobs.tags && jobs.tags.map((item, index) => <Tag color="blue" key={index}>{item}</Tag>)}</p>
          <p>Thành phố: {jobs.city && jobs.city.map((item, index) => <Tag color="orange"
                                                                          key={index}>{item}</Tag>)}</p>
          <p>Mức lương: <b>{jobs.salary}$</b></p>
          <p>Địa chỉ công ty: <b>{jobs.companyInfo?.address}</b></p>
          <p>Thời gian đăng bài: <b>{jobs.createAt}</b></p>
          <p>Mô tả công việc: </p>
          <p>{jobs.description}</p>
        </Card>
      </Col>
      <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
        <Card bordered={false} title="Ứng tuyển ngay" id="formApply" className="mt-20">
          <Form form={form} name="FormApply" onFinish={onFinish} layout="vertical"
                disabled={(parseInt(id) === jobs.idCompany)}>
            <Row gutter={20}>
              <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
                <Form.Item
                  name="name"
                  label="Họ tên"
                  rules={rule}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={rule}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={rule}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
                <Form.Item label="Thành phố" name="city" rules={rule}>
                  <Select>
                    {jobs.city?.map((item, index) => (
                      <Select.Option value={item} key={index}>{item}</Select.Option>))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24} sm={24}>
                <Form.Item
                  name="description"
                  label="Giới thiệu bản thân"
                  rules={rule}
                >
                  <Input.TextArea rows={6}/>
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24} sm={24}>
                <Form.Item
                  name="linkProject"
                  label="Danh sách link project đã làm"
                  rules={rule}
                >
                  <Input.TextArea rows={6}/>
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24} sm={24}>
                <Tooltip title={(parseInt(id) === jobs.idCompany) && ("Bạn không thể gửi cv cho jobs này")}>
                  <Button disabled={(parseInt(id) === jobs.idCompany)} type="primary" htmlType="submit">Gửi yêu
                    cầu</Button>
                </Tooltip>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>) : (<>
      {loading ? <Row justify="center">
        <Spin spinning={loading}/>
      </Row> : (<h3 style={{textAlign: "center"}}>Không có dữ liệu</h3>)}
    </>)}
  </>)
}

export default JobsDetail;