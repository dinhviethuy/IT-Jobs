import {useNavigate} from "react-router-dom";
import {deleteAllCookies} from "../../helpers/cookie.jsx";
import {useEffect} from "react";
import {message} from "antd";
import {useDispatch} from "react-redux";
import {LogoutAction} from "../../action/LogoutAction.jsx";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    messageApi.open({
      type: 'success',
      content: 'Đăng xuất thành công',
      duration: 0.5
    });
    dispatch(LogoutAction());
    setTimeout(() => {
      navigate('/login');
    }, 500);
  }, []);
  return (
    <>
      {contextHolder}
    </>
  )
}

export default Logout

