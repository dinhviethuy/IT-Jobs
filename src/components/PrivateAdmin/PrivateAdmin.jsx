import {Navigate, Outlet} from "react-router-dom";
import {getCookie} from "../../helpers/cookie.jsx";

function PrivateAdmin() {
  const token = getCookie("token");
  return (<>
    {token ? <Outlet/>: (<Navigate to="/login"/>)}
  </>)
}

export default PrivateAdmin