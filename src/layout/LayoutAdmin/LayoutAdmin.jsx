import {Button, Col, Layout, Row} from "antd";
import {MenuFoldOutlined, UserOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from "react";
import MenuSider from "../../components/Menu/index.jsx";
import {Link, NavLink, Outlet, useLocation} from 'react-router-dom'
import {Space } from 'antd';
import './LayoutAdmin.css';
import {getCookie} from "../../helpers/cookie.jsx";
import {useMediaQuery} from "react-responsive";

const logo = "IT Admin"
const logoFold = "ITA"

const {Sider, Content, Footer} = Layout;

function LayoutAdmin() {
  const token = getCookie('token');
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [reloadCom, setReloadCom] = useState(false)
  const isSmallScreen = useMediaQuery({ query: '(max-width: 992px)' });
  useEffect(() => {
    setCollapsed(isSmallScreen);
  }, [isSmallScreen]);
  useEffect(() => {
    setReloadCom(!reloadCom);
  }, [location.pathname]);
  const check = location.pathname === '/admin' || location.pathname === '/info-company' || location.pathname === '/cv' || location.pathname === '/job' || location.pathname !== 'create-job';
  return (
    <>
      <Layout className="layout">
        <header className='header-admin'>
          <div className={"header-logo " + (collapsed ? 'collapsed' : '')}>
            <Link to="/" className='admin-logo'>{collapsed ? logoFold : logo}</Link>
          </div>
          <div className="header-nav">
            <div className="header-nav-left">
              <div className="header-collapse header-nav-left-icon" onClick={() => setCollapsed(!collapsed)}>
                <MenuFoldOutlined />
              </div>
            </div>
            <div className="header-nav-right">
              <Space >
                <Row gutter={10} justify="center">
                  {token ? (<>
                    <Col>
                      {(check) ? (<>
                        <NavLink to='/'>
                          <Button icon={<HomeOutlined />} >Home</Button>
                        </NavLink>
                      </>):(<>
                        <NavLink to='/admin'>
                          <Button icon={<UserOutlined />} >Quản trị</Button>
                        </NavLink>
                      </>)}
                    </Col>
                    <Col>
                      <NavLink to='/logout'>
                        <Button icon={<LogoutOutlined />} >Đăng xuất</Button>
                      </NavLink>
                    </Col>
                  </>):(<>
                    <Col>
                      <NavLink to='/login'>
                        <Button>Đăng nhập</Button>
                      </NavLink>
                    </Col>
                    <Col>
                      <NavLink to='/register'>
                        <Button type="primary">Đăng ký</Button>
                      </NavLink>
                    </Col>
                  </>)}
                </Row>
                {/*<Avatar src={user} size="large" icon={<UserOutlined />} />*/}
              </Space>
            </div>
          </div>
        </header>
        <Layout className='layout-middle'>
          <Sider className="sider" collapsed={collapsed} theme="light">
            <MenuSider />
          </Sider>
          <Content className='content'>
            <Outlet />
            <Footer className='footer mt-20'>
              Copyright © 2024 Đinh Viết Huy - All rights reserved.
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutAdmin