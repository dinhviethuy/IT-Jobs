import {Button, notification, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {deleteAction} from "../../action/deleteAction.jsx";
import {deleteJob} from "../../services/jobServices.jsx";
import {useDispatch} from "react-redux";

function DeleteJob(props) {
  const {record} = props;
  const dispatch = useDispatch();
  const [notiApi, contextHolder] = notification.useNotification();
  const handleDelete = async (id) => {
    const result = await deleteJob(id);
    if (result) {
      notiApi.success({
        message: "Xóa thành công", description: `Bạn đã xóa thành công job ${record.name}`, duration: 0.5
      })
      setTimeout(() => {
        dispatch(deleteAction(true));
      }, 500)
    } else {
      notiApi.error({
        message: "Xóa thất bại", description: `Bạn xóa thất bại job ${record.name}`
      })
    }
  }
  return (<>
      {contextHolder}
      <Popconfirm title="Bạn có chắc chắn muốn xóa job này?" onConfirm={() => handleDelete(record.id)}>
        <Button danger size="small" icon={<DeleteOutlined/>}/>
      </Popconfirm>
    </>)
}

export default DeleteJob