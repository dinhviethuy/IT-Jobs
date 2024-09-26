import {Button, Card, Col, Row, Spin, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {getJobCompany} from "../../services/jobServices.jsx";
import {getCookie} from "../../helpers/cookie.jsx";
import DeleteJob from "../../components/DeleteJob/DeleteJob.jsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteAction} from "../../action/deleteAction.jsx";
import EditJob from "../../components/EditJob/EditJob.jsx";
import {PlusOutlined, EyeOutlined} from '@ant-design/icons'
import {useNavigate, useSearchParams} from "react-router-dom";
import {limit} from "../../helpers/contants.jsx";

function TableJob () {
  const id = getCookie("id");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.ReloadReducer);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/view-job/${e}`);
  }
  const page = searchParams.get("page") || "1";
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
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),

    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <>
          <div>Ngày tạo: {record.createAt}</div>
          <div>Cập nhật: {record.updateAt || ""}</div>
        </>
      )

    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        if(record.status)
          return (
            <Tag color="green">Đang bật</Tag>
          )
        else
          return (
            <Tag color="red">Đang tắt</Tag>
          )
      }
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record, index) => {
        return (
          <>
            <Row gutter={[10, 10]}>
              <Col>
                <Button size="small" icon={<EyeOutlined />} onClick={() => handleClick(record.id)}/>
              </Col>
              <Col>
                <DeleteJob record={record}/>
              </Col>
              <Col>
                <EditJob record={record} index={index}/>
              </Col>
            </Row>
          </>
        )
      }
    }
  ]
  const handleChange = (e) => {
    navigate(`/job?page=${e.current}`);
  }
  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <>
          <div className="content-admin">
            <Card bordered={false} title="Danh sách việc làm" extra={<Button type="primary" onClick={handleCreateJob} icon={<PlusOutlined />}>Tạo việc mới</Button>}>
              <Table onChange={handleChange} columns={columns} dataSource={data} rowKey="id" pagination={{current: parseInt(page), limit: limit}}/>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="content-admin">
            {loading ? <Row justify="center">
              <Spin spinning={loading}/>
            </Row> : (<Row justify="center">
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card bordered={false} title="Danh sách việc làm"
                      extra={<Button type="primary" onClick={handleCreateJob} icon={<PlusOutlined/>}>Tạo việc
                        mới</Button>}>
                  <h3 style={{textAlign: "center"}}>Chưa có job nào được tạo</h3>
                </Card>
              </Col>
            </Row>)}
          </div>
        </>
      )}
    </>
  )
}

export default TableJob