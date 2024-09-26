import {Button, Card, Col, Pagination, Row, Spin, Tag} from "antd";
import React, { useEffect, useState } from "react";
import { getJobCompany } from "../../services/jobServices.jsx";
import { getCookie } from "../../helpers/cookie.jsx";
import DeleteJob from "../../components/DeleteJob/DeleteJob.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction } from "../../action/deleteAction.jsx";
import EditJob from "../../components/EditJob/EditJob.jsx";
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from "react-router-dom";
import {getCvCompany} from "../../services/cvServices.jsx";
import DeleteCv from "../../components/DeleteCv/DeleteCv.jsx";

function GridCv() {
  const id = getCookie("id");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.ReloadReducer);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/view-cv/${e}`);
  }
  const fetchData = async () => {
    const response = await getCvCompany(parseInt(id));
    const resJob = await getJobCompany(parseInt(id));
    const resCvFinal = response.map(item => ({
      ...item,
      jobName: (resJob.length > 0 ? (resJob.find(itemJob => itemJob.id === item.idJob)?.name || "Job đã bị xóa") : "Job đã bị xóa")
    }))
    setData(resCvFinal.reverse());
  }
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])
  if(isLoad) {
    fetchData();
    dispatch(deleteAction(false));
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }
  const page = parseInt(searchParams.get("page") || "1");
  const handleChange = (e) => {
    navigate(`/cv?page=${e}`);
  }
  return (
    <>
      <div className="content-admin">
        <h2>Danh sách CV</h2>
        <div className="job-grid">
          {loading ? (
            <Row justify="center">
              <Spin spinning={loading} />
            </Row>
          ) : data.length > 0 ? (
            <Row gutter={[16, 16]}>
              {data.map((record, index) => {
                if(index >= (page - 1) * 10 && index < page * 10) {
                  return (
                    <Col xs={24} sm={12} md={12} key={record.id}>
                      <Card title={'Job: ' + record.jobName}>
                        <p>Họ tên: <b>{record.name}</b></p>
                        <p>Email: <b>{record.email}</b></p>
                        <p>Số điện thoại: <b>{record.phone}</b></p>
                        <p>Ngày gửi: <b>{record.createAt}</b></p>
                        {record.updateAt && <p>Cập nhật: <b>{record.updateAt} </b></p>}
                        <div style={{marginBottom: "10px"}}>
                          <span>Trạng thái: </span>
                          {record.statusRead ? (
                            <Tag color="green">Đã đọc</Tag>
                          ) : (
                            <Tag color="red">Chưa đọc</Tag>
                          )}
                        </div>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <Button size="small" icon={<EyeOutlined/>} onClick={() => handleClick(record.id)}/>
                          </Col>
                          <Col>
                            <DeleteCv record={record}/>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  )
                }
              })}
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Pagination onChange={handleChange} align="center" current={page} total={data.length}/>
              </Col>
            </Row>
          ) : (
            <h3 style={{textAlign: "center"}}>Chưa có cv nào được gửi đến</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default GridCv;
