import './GoBack.css';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

function GoBack() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  return (
    <div className="go-back">
      <div className="go-back__container">
        <Button onClick={handleClick}>Trở lại</Button>
      </div>
    </div>
  )
}

export default GoBack