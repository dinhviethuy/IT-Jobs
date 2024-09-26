import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCv, updateCv} from "../../services/cvServices.jsx";
import GoBack from "../../components/GoBack/GoBack.jsx";
import {Card, Row, Spin, Tag} from "antd";
import {getJob} from "../../services/jobServices.jsx";

function ViewCv() {
  const param = useParams();
  const [data, setData] = useState({});
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCv(param.id);
      const resJob = await getJob(response.idJob);
      setData(response);
      setJob(resJob);
      const cvUpdate = {
        ...response,
        statusRead: true
      }
      const resUpdateCv = await updateCv(param.id, cvUpdate);
    }
    fetchApi();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])
  return (
    <>
      <GoBack/>
      {Object.keys(data).length > 0 ? (
        <>
          <div className="content-admin mt-20" justify="center">
            <Card bordered={false} title={`Ứng viên: ${data.name}`}>
              <p>Ngày gửi: <b>{data.createAt}</b></p>
              <p>Số điện thoại: <b>{data.phone}</b></p>
              <p>Email: <b>{data.email}</b></p>
              <p>Thành phố ứng tuyển: <b>{data.city}</b></p>
              <p>Giới thiệu bản thân: </p>
              <p>{data.description}</p>
              <p>Link project:</p>
              <p>{data.linkProject}</p>
            </Card>
            {Object.keys(job).length === 0 ? (
              <Card title={"Job đã bị xóa"} className="mt-20"></Card>
            ) : (<>
              <Card title={`Thông tin job: ${job.name}`} className="mt-20">
                <p>Trạng thái: {(job.status ? <Tag color="green">Đang bật</Tag> :
                  <Tag color="red">Đang tắt</Tag>)}</p>
                <p>Tags:
                  <span> {job.tags.map((item, index) => (
                    <Tag key={index} color="blue">{item}</Tag>
                  ))}
              </span>
                </p>
                <p>Mức lương: <b>{job.salary}$</b></p>
                <p>Ngày tạo: <b>{job.createAt}</b></p>
                <p>Cập nhật: <b>{job.updateAt}</b></p>
                <p>Thành phố:
                  <span> {job.city.map((item, index) => (
                    <Tag key={index} color="orange">{item}</Tag>
                  ))}</span>
                </p>
                <p>Mô tả:</p>
                <p>{job.description}</p>
              </Card>
            </>)}
          </div>
        </>
      ) : (<>
        <div className="content-admin">
          {loading ? <Row justify="center">
            <Spin spinning={loading}/>
          </Row> : (<h3 style={{textAlign: "center"}}>Không có dữ liệu</h3>)}
        </div>
      </>)}
    </>
  )
}

export default ViewCv