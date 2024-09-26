import {useMediaQuery} from "react-responsive";
import React, {useEffect, useState} from "react";
import TableCv from "./TableCv.jsx";
import GridCv from "./GridCv.jsx";

function CV () {
  const [show, setShow] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(min-width: 992px)' });
  useEffect(() => {
    setShow(isSmallScreen);
  }, [isSmallScreen]);
  return (
    <>
      {show ? <TableCv/> : <GridCv />}
    </>
  )
}

export default CV