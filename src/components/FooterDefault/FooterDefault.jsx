import {Layout} from "antd";
import './FooterDefault.css';

const { Footer } = Layout;
function FooterDefault() {
  return (
    <>
      <footer className="footer">
        <Layout>
          <Footer>
            Copyright © {new Date().getFullYear()} Created by Đinh Viết Huy
          </Footer>
        </Layout>
      </footer>
    </>
  )
}

export default FooterDefault