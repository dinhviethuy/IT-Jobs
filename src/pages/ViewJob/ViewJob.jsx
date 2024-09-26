import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getJob} from "../../services/jobServices.jsx";
import {Tag, Card} from "antd";
import GoBack from "../../components/GoBack/GoBack.jsx";

function ViewJob(props) {
  const param = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJob(parseInt(param.id));
      setData(response);
    }
    fetchApi();
  }, [])
  return (
    <>
      <GoBack/>
      {Object.keys(data).length > 0 ? (
        <>
          <div className="content-admin mt-20" justify="center">
            <Card title={`Tên job: ${data.name}`}>
              <p>Trạng thái: {(data.status ? <Tag color="green">Đang bật</Tag> :
                <Tag color="red">Đang tắt</Tag>)}</p>
              <p>Tags:
                <span> {data.tags.map((item, index) => (
                  <Tag key={index} color="blue">{item}</Tag>
                ))}
              </span>
              </p>
              <p>Mức lương: <b>{data.salary}$</b></p>
              <p>Ngày tạo: <b>{data.createAt}</b></p>
              <p>Cập nhật: <b>{data.updateAt}</b></p>
              <p>Thành phố:
                <span> {data.city.map((item, index) => (
                  <Tag key={index} color="orange">{item}</Tag>
                ))}</span>
              </p>
              <p>Mô tả:</p>
              <p>{data.description}</p>
            </Card>
          </div>
        </>
      ) : (<>ddd</>)}

    </>
  )
}

export default ViewJob