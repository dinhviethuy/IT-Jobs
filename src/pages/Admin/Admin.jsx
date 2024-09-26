import {Card, Col, Row, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {getJobCompany} from "../../services/jobServices.jsx";
import {getCookie} from "../../helpers/cookie.jsx";
import {getCompany, getCvCompany} from "../../services/companyServices.jsx";

function Admin () {
  const id = getCookie("id");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getJobCompany(parseInt(id));
      const resCvCom = await getCvCompany(parseInt(id));
      const resCom = await getCompany(parseInt(id));
      const cnt = response.reduce((total, item) => {
        return total + (item.status ? 1 : 0);
      }, 0);
      const cntCvOn = resCvCom.reduce((total, item) => {
        return total + (item.statusRead ? 1 : 0);
      }, 0);
      setData({
        on: cnt,
        len: response,
        cv: resCvCom,
        cvOn: cntCvOn,
        infoCom: resCom
      })
    }
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])
  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <>
          <h2>Tổng quan</h2>
          <Row justify="center" gutter={[20, 20]} className="content-admin">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Card bordered={false} title="Job">
                    <p>Số lượng job: <b>{data?.len?.length || 0}</b></p>
                    <p>Job đang bật: <b>{data?.on || 0}</b></p>
                    <p>Job đang tắt: <b>{data?.len?.length - data?.on || 0}</b></p>
                  </Card>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Card bordered={false} title="CV">
                    <p>Số lượng CV: <b>{data?.cv?.length || 0}</b></p>
                    <p>CV đã đọc: <b>{data?.cvOn || 0}</b></p>
                    <p>CV chưa đọc: <b>{data?.cv?.length - data?.cvOn || 0}</b></p>
                  </Card>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Card bordered={false} title="Thông tin công ty">
                    <p>Tên công ty: <b>{data?.infoCom?.companyName}</b></p>
                    <p>Email: <b>{data?.infoCom?.email || "Chưa có"}</b></p>
                    <p>Số điện thoại: <b>{data?.infoCom?.phone || "Chưa có"}</b></p>
                    <p>Số nhân viên: <b>{data?.infoCom?.quantityPeople || 0}</b></p>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div className="content-admin">
            <Row justify="center">
              <Spin spinning={true} />
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default Admin