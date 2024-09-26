import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, message, Row} from 'antd';
import './Register.css';
import {checkRegister} from "../../services/checkRegister.jsx";
import {useNavigate} from "react-router-dom";
import {register} from "../../services/registerServices.jsx";
import generatorToken from "../../helpers/generatorToken.jsx";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    setLoading(true);
    const {email, password, phone} = values;
    const resultEmail = await checkRegister('email', email);
    let resultPhone = [];
    if (phone) {
      resultPhone = await checkRegister('phone', phone);
    } else {
      values.phone = "";
    }
    if (resultEmail.length > 0) {
      messageApi.open({
        type: 'error',
        content: 'Email đã tồn tại',
      });
    } else if (resultPhone.length > 0) {
      messageApi.open({
        type: 'error',
        content: 'Số điện thoại đã tồn tại',
      });
    } else {
      values.token = generatorToken();
      const result = await register(values);
      if (result) {
        messageApi.open({
          type: 'success',
          content: 'Đăng ký tài khoản thành công',
          duration: 0.5
        });
        setTimeout(() => {
          navigate('/login');
        }, 500)
      } else {
        messageApi.open({
          type: 'error',
          content: 'Đăng ký tài khoản thất bại',
        });
      }
    }
    setLoading(false);
  };
  return (
    <>
      {contextHolder}
      <Row className="register-form">
        <Col xxl={5} xl={6} lg={8} md={10} sm={12} xs={16}>
          <Card
            title="Đăng ký tài khoản"
            bordered={false}
            className="card-register">
            <Form className="register" onFinish={onFinish} layout="vertical" initialValues={{prefix: '84'}}>
              <Form.Item
                label="Tên công ty"
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
};
export default Register