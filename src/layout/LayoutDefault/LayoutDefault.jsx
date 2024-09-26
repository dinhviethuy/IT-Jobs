import HeaderDefault from "../../components/HeaderDefault/HeaderDefault.jsx";
import {Outlet, useLocation} from "react-router-dom";
import FooterDefault from "../../components/FooterDefault/FooterDefault.jsx";
import './LayoutDefault.css';
import {useSelector} from "react-redux";

function LayoutDefault() {
  const reload = useSelector(state => state.ReloadReducer);
  return (
    <>
      <div className="container">
        <HeaderDefault />
        <main className='main'>
          <Outlet />
        </main>
        <FooterDefault />
      </div>
    </>
  )
}

export default LayoutDefault