import {Button, Card, Col, Row, Spin, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {getJobCompany} from "../../services/jobServices.jsx";
import {getCookie} from "../../helpers/cookie.jsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteAction} from "../../action/deleteAction.jsx";
import {EyeOutlined} from '@ant-design/icons'
import {useNavigate, useSearchParams} from "react-router-dom";
import {limit} from "../../helpers/contants.jsx";
import {getCvCompany} from "../../services/cvServices.jsx";
import DeleteCv from "../../components/DeleteCv/DeleteCv.jsx";

function TableCv () {
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
  const page = searchParams.get("page") || "1";
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
  const columns = [
    {
      title: "Tên job",
      dataIndex: "jobName",
      key: "jobName"
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt"
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRed",
      render: (_, record) => {
        if(record.statusRead)
          return (
            <Tag color="green">Đã đọc</Tag>
          )
        else
          return (
            <Tag color="red">Chưa đọc</Tag>
          )
      }
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        return (
          <>
            <Row gutter={[10, 10]}>
              <Col>
                <Button size="small" icon={<EyeOutlined />} onClick={() => handleClick(record.id)}/>
              </Col>
              <Col>
                <DeleteCv record={record}/>
              </Col>
            </Row>
          </>
        )
      }
    }
  ]
  const handleChange = (e) => {
    navigate(`/cv?page=${e.current}`);
  }
  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <>
          <div className="content-admin">
            <Card bordered={false} title="Danh sách CV" >
              <Table onChange={handleChange} columns={columns} dataSource={data} rowKey="id" pagination={{current: parseInt(page), limit: limit}}/>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="content-admin">
            {loading ? <Row justify="center">
              <Spin spinning={loading}/>
            </Row> : (<h3 style={{textAlign: "center"}}>Chưa có cv nào được gửi đến</h3>)}
          </div>
        </>
      )}
    </>
  )
}

export default TableCv