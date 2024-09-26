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

function GridJob() {
  const id = getCookie("id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.ReloadReducer);
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/view-job/${e}`);
  }

  const fetchData = async () => {
    const response = await getJobCompany(parseInt(id));
    setData(response.reverse());
  }

  const handleCreateJob = () => {
    navigate('/create-job');
  }

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  if (isLoad) {
    fetchData();
    dispatch(deleteAction(false));
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }
  const page = parseInt(searchParams.get("page") || "1");
  const handleChange = (e) => {
    navigate(`/job?page=${e}`);
  }
  return (
    <>
      <div className="content-admin">
        <h2>Danh sách việc làm</h2>
        <Button onClick={handleCreateJob} icon={<PlusOutlined />} style={{ marginBottom: "20px" }}>Tạo việc mới</Button>
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
                    <Col xs={24} sm={12} md={8} key={record.id}>
                      <Card title={record.name}>
                        <div>
                          {record.tags.map(tag => (
                            <Tag color="blue" key={tag}>{tag}</Tag>
                          ))}
                        </div>
                        <p>Mức lương: <b>{record.salary}$</b></p>
                        <p>Ngày tạo: <b>{record.createAt}</b></p>
                        {record.updateAt && <p>Cập nhật: <b>{record.updateAt} </b></p>}
                        <div style={{marginBottom: "10px"}}>
                          <span>Trạng thái: </span>
                          {record.status ? (
                            <Tag color="green">Đang bật</Tag>
                          ) : (
                            <Tag color="red">Đang tắt</Tag>
                          )}
                        </div>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <Button size="small" icon={<EyeOutlined/>} onClick={() => handleClick(record.id)}/>
                          </Col>
                          <Col>
                            <DeleteJob record={record}/>
                          </Col>
                          <Col>
                            <EditJob record={record} index={index}/>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  )
                }
              })}
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Pagination onChange={handleChange} align="center" current={page} total={data.length} />
              </Col>
            </Row>
          ) : (
            <h3 style={{textAlign: "center"}}>Chưa có job nào được tạo</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default GridJob;
