import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, message, Row} from 'antd';
import './Login.css';
import {checkLogin} from "../../services/checkLogin.jsx";
import {setCookie} from "../../helpers/cookie.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LoginAction} from "../../action/LoginAction.jsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    setLoading(true);
    const {email, password} = values;
    const result = await checkLogin(email, password);
    if (result.length > 0) {
      const {id, token, companyName} = result[0];
      messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công',
        duration: 0.5
      });
      setCookie('email', email, 1);
      setCookie('id', id, 1);
      setCookie('token', token, 1);
      setCookie('companyName', companyName, 1);
      setTimeout(() => {
        dispatch(LoginAction());
        navigate('/');
      }, 500)
    } else {
      messageApi.open({
        type: 'error',
        content: 'Email hoặc mật khẩu sai',
      });
    }
    setLoading(false);
  };
  return (
    <>
      {contextHolder}
      <Row className="login-form">
        <Col xxl={5} xl={6} lg={8} md={10} sm={12} xs={16}>
          <Card
            title="Đăng nhập"
            bordered={false}
            className="card-login">
            <Form className="login" onFinish={onFinish} layout="vertical">
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
                <Input placeholder="dinhviethuy055@gmail.com"/>
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
                <Input.Password placeholder="123456"/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
};
export default Login
