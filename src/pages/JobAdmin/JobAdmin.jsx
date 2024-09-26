import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import TableJob from "./TableJob.jsx";
import GridJob from "./GridJob.jsx";

function JobAdmin () {
  const [show, setShow] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(min-width: 992px)' });
  useEffect(() => {
    setShow(isSmallScreen);
  }, [isSmallScreen]);
  return (
    <>
      {show ? <TableJob/> : <GridJob />}
    </>
  )
}

export default JobAdmin