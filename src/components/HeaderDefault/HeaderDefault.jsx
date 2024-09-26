import {Link, NavLink, useLocation} from "react-router-dom";
import {Button, Col, Row} from "antd";
import './HaderDefault.css';
import {getCookie} from "../../helpers/cookie.jsx";
import {UserOutlined, LogoutOutlined, HomeOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";

function HeaderDefault() {
  const token = getCookie('token');
  const location = useLocation();
  const [reloadCom, setReloadCom] = useState(false);
  useEffect(() => {
    setReloadCom(!reloadCom);
  }, [location.pathname]);
  return (
    <>
      <header className="header">
        <Row justify="center">
          <Col xl={20} lg={20} md={20} sm={20} xs={22} className='inner-header'>
            <div className="logo-text">
              <Link to='/'>IT Jobs</Link>
            </div>
            <div className="menu">
              <Row gutter={10} justify="center">
                {token ? (<>
                  <Col>
                    {(location.pathname === '/admin') ? (<>
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
            </div>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default HeaderDefault