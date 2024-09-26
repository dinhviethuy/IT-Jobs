import LayoutDefault from "../layout/LayoutDefault/LayoutDefault.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Home from "../pages/Home/Home.jsx";
import Logout from "../pages/Logout/Logout.jsx";
import PrivateLogin from "../components/PrivateLogin/PrivateLogin.jsx";
import PrivateLogout from "../components/PrivateLogout/PrivateLogout.jsx";
import PrivateAdmin from "../components/PrivateAdmin/PrivateAdmin.jsx";
import AllCompany from "../pages/AllCompany/AllCompany.jsx";
import Search from "../pages/Search/Search.jsx";
import CompanyDelta from "../pages/CompanyDeltail/CompanyDeltail.jsx";
import JobsDetail from "../pages/JobsDetail/JobsDetail.jsx";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import InfoCompany from "../pages/InfoCompany/InfoCompany.jsx";
import JobAdmin from "../pages/JobAdmin/JobAdmin.jsx";
import CV from "../pages/CV/CV.jsx";
import CreateJob from "../pages/CreateJob/CreateJob.jsx";
import ViewJob from "../pages/ViewJob/ViewJob.jsx";
import ViewCv from "../pages/ViewCv/ViewCv.jsx";

export const routes = [
  {
    path: '/',
    element: <LayoutDefault/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: 'company',
        element: <AllCompany/>
      },
      {
        path: 'company/:id',
        element: <CompanyDelta/>
      },
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: 'jobs/:id',
        element: <JobsDetail/>
      },
      {
        element: <PrivateLogin/>,
        children: [
          {
            path: 'login',
            element: <Login/>,
          },
          {
            path: 'register',
            element: <Register/>,
          },
        ]
      },
      {
        element: <PrivateLogout/>,
        children: [
          {
            path: 'logout',
            element: <Logout/>,
          }
        ]
      }
    ]
  },
  {
    element: <PrivateAdmin/>,
    children: [
      {
        path: '/',
        element: <LayoutAdmin/>,
        children: [
          {
            path: 'admin',
            element: <Admin/>,
          },
          {
            path: 'info-company',
            element: <InfoCompany/>,
          },
          {
            path: 'job',
            element: <JobAdmin/>,
          },
          {
            path: 'cv',
            element: <CV/>,
          },
          {
            path: "create-job",
            element: <CreateJob />
          },
          {
            path: "view-job/:id",
            element: <ViewJob />
          },
          {
            path: "view-cv/:id",
            element: <ViewCv />
          }
        ]
      }
    ]
  }
]
