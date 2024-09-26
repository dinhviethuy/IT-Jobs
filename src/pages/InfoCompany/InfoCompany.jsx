import {getCookie} from "../../helpers/cookie.jsx";
import React, {useEffect, useState} from "react";
import {getCompany, updateCompany} from "../../services/companyServices.jsx";
import {Button, Card, Col, Form, Input, InputNumber, notification, Row, Spin} from "antd";
import TextArea from "antd/es/input/TextArea.js";

function InfoCompany() {
  const [edit, setEdit] = useState(true);
  const [showSpining, setShowSpining] = useState(false);
  const [notiApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const id = getCookie("id");
  const [data, setData] = useState({});
  const rules = [
    {
      required: true,
      message: 'Bắt buộc',
    },
  ]
  const handleClick = () => {
    setEdit(!edit);
    form.resetFields();
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCompany(parseInt(id));
      setData(response);
    }
    fetchData();
  }, [])
  const handleSubmit = async (e) => {
    setShowSpining(true);
    const id = getCookie("id");
    const response = await updateCompany(parseInt(id), e);
    if (response) {
      setEdit(true);
      setShowSpining(false);
      notiApi.success({
        message: "Cập nhập thành công",
        description: `Bạn đã cập nhập thành công thông tin cho công ty`
      });
    } else {
      notiApi.error({
        message: "Cập nhập thất bại",
        description: `Bạn đã cập nhập không thành công`
      });
      setShowSpining(false);
    }
  }
  return (
    <>
      {contextHolder}
      {Object.keys(data).length !== 0 ? (
        <Card bordered={false} title="Thông tin công ty" extra={edit ? (<Button onClick={handleClick}>Chỉnh sửa</Button>) : (
          <Button onClick={handleClick}>Hủy</Button>)}>
          <Row justify="end" gutter={[20, 20]} className="content-admin">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Spin spinning={showSpining} tip="Đang cập nhật">
                <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={data} disabled={edit}
                      name="info-form">
                  <Row gutter={[20, 20]}>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item rules={rules} name="companyName" label="Tên công ty">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item rules={rules} name="email" label="Email">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item name="phone" label="Số điện thoại">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item rules={rules} name="address" label="Địa chỉ">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item rules={rules} name="quantityPeople" label="Số lượng nhân sự">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item name="workingTime" label="Thời gian làm việc">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <Form.Item name="website" label="Link website">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item name="description" label="Mô tả ngắn">
                        <TextArea rows={8}/>
                      </Form.Item>
                    </Col>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item name="detail" label="Mô tả chi tiết">
                        <TextArea rows={12}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  {edit === false && (<>
                    <Col>
                      <Button htmlType="submit" type="primary" style={{marginRight: "10px"}}>Cập nhật</Button>
                      <Button onClick={handleClick}>Hủy</Button>
                    </Col>
                  </>)}
                </Form>
              </Spin>
            </Col>
          </Row>
        </Card>
      ) : (
        <div className="content-admin">
          <Row justify="center">
            <Spin spinning={true}/>
          </Row>
        </div>
      )}
    </>
  )
}

export default InfoCompany