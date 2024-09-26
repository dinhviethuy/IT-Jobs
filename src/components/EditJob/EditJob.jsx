import {Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Spin, Switch} from "antd";
import {EditOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getCity} from "../../services/cityServices.jsx";
import {getTags} from "../../services/TagServices.jsx";
import TextArea from "antd/es/input/TextArea.js";
import {deleteAction} from "../../action/deleteAction.jsx";
import {updateJob} from "../../services/jobServices.jsx";
import getTime from "../../helpers/getTime.jsx";

const {Option} = Select;

function EditJob(props) {
  const {record, index} = props;
  const dispatch = useDispatch();
  const [showSpining, setShowSpining] = useState(false);
  const [notiApi, contextHolder] = notification.useNotification();
  const [city, setCity] = useState([])
  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const handelModal = () => {
    setShowModal(true);
  }
  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchApi = async () => {
      const resCity = await getCity();
      const resTag = await getTags();
      setTags(resTag);
      setCity(resCity);
    }
    fetchApi();
  }, [])
  const handleFinish = async (e) => {
    const time = getTime();
    const jobUpdate = {
      ...e,
      updateAt: time
    }
    const response = await updateJob(record.id, jobUpdate);
    setShowSpining(true);
    setTimeout(() => {
      if (response) {
        setShowSpining(false);
        notiApi.success({
          message: "Cập nhập thành công",
          description: `Bạn đã cập nhập thành công cho job ${record.name}`
        });
        setShowModal(false);
        dispatch(deleteAction(true));
      }
    }, 3000)
  }
  const rules = [
    {
      required: true,
      message: 'Bắt buộc',
    },
  ]
  return (
    <>
      {contextHolder}
      <Button size="small" type="primary" icon={<EditOutlined/>} onClick={handelModal}/>
      <Modal width={650} title={`Chỉnh sửa ${record.name}`} open={showModal} onCancel={handleCancel} footer={null}>
        <Spin spinning={showSpining} tip='Đang cập nhật'>
          <Form layout="vertical" name={record.name + index} onFinish={handleFinish} form={form} initialValues={record}>
            <Form.Item
              label="Tên job"
              name="name"
              rules={rules}
            >
              <Input/>
            </Form.Item>
            <Row gutter={[20, 20]}>
              <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
                <Form.Item name="tags" label="Tags" rules={rules}>
                  <Select style={{width: "100%"}} mode="multiple" allowClear>
                    {tags?.map((item) => {
                      return (
                        <Option value={item.value} key={item.key}>{item.value}</Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  label="Mức lương"
                  name="salary"
                  rules={rules}
                >
                  <InputNumber style={{width: "100%"}} addonAfter={"$"} min={1}/>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="city" label="Thành phố" rules={rules}>
              <Select style={{width: "100%"}} mode="multiple" allowClear>
                {city?.map((item) => {
                  return (
                    <Option value={item.value} key={item.key}>{item.value}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
            >
              <TextArea rows={8}/>
            </Form.Item>

            <Form.Item name="status" label="Trạng thái job" valuePropName="checked">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default EditJob