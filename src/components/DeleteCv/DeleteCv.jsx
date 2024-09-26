import {useDispatch} from "react-redux";
import {Button, notification, Popconfirm} from "antd";
import {deleteAction} from "../../action/deleteAction.jsx";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteCv} from "../../services/cvServices.jsx";

function DeleteCv(props) {
  const {record} = props;
  const dispatch = useDispatch();
  const [notiApi, contextHolder] = notification.useNotification();
  const handleDelete = async (id) => {
    const result = await deleteCv(id);
    if (result) {
      notiApi.success({
        message: "Xóa thành công", description: `Bạn đã xóa thành công cv của ${record.name}`, duration: 0.5
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
    <Popconfirm title="Bạn có chắc chắn muốn xóa cv này?" onConfirm={() => handleDelete(record.id)}>
      <Button danger size="small" icon={<DeleteOutlined/>}/>
    </Popconfirm>
  </>)
}

export default DeleteCv