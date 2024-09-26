import {Card, Col, Tag} from "antd";
import {Link} from "react-router-dom";
import './Search.css';

function DrawJobSearch(props) {
  const {item, name} = props;
  return (
    <>
      <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
        <Link to={`/jobs/${item.id}`}>
          <Card
            classNames="card-search"
            hoverable
            title={item.name}
            bordered={false}>
            <p>Ngôn ngữ: {item.tags.map((tag, index) => <span key={index}><Tag color="blue">{tag}</Tag></span>)}</p>
            <p>Thành phố: {item.city.map((citi, index) => <span key={index}><Tag
              color="orange">{citi}</Tag></span>)}</p>
            <p>Lương: <b>{item.salary}$</b></p>
            <p>Công ty: <b>{name}</b></p>
            <p>Ngày tạo: <b>{item.createAt}</b></p>
          </Card>
        </Link>
      </Col>
    </>
  )
}

export default DrawJobSearch