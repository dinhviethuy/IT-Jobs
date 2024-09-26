import {useRoutes} from "react-router-dom";
import {routes} from "../../router/routes.jsx";

function AllRouter() {
  const route = useRoutes(routes);
  return (
    <>
      {route}
    </>
  )
}

export default AllRouter