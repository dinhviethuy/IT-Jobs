import {Menu} from "antd";
import {DashboardOutlined, ExceptionOutlined, UserOutlined, UnorderedListOutlined} from '@ant-design/icons'
import {Link, useLocation} from 'react-router-dom';
function MenuSider() {
  const location = useLocation();
  const items = [
    {
      label:<Link to='/admin'>Tổng quan</Link> ,
      icon: <DashboardOutlined />,
      key: "/admin",
    },
    {
      label: <Link to='/info-company'>Thông tin công ty</Link>,
      icon: <UserOutlined />,
      key: "/info-company"
    },
    {
      label: <Link to='/job'>Quản lý việc làm</Link>,
      icon: <UnorderedListOutlined />,
      key: "/job"
    },
    {
      label: <Link to='/cv'>Quản lý CV</Link>,
      icon: <ExceptionOutlined />,
      key: "/cv",
    }
  ]
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={location.pathname}
        defaultOpenKeys={location.pathname}
      />
    </>
  )
}

export default MenuSider