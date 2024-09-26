import {Navigate, Outlet} from "react-router-dom";
import {getCookie} from "../../helpers/cookie.jsx";

function PrivateLogin() {
  const token = getCookie("token");
  return (<>
    {token ? (<Navigate to="/"/>) : <Outlet/>}
  </>)
}

export default PrivateLogin