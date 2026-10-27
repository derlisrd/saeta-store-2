import React from "react";
import { makeStyles } from "@mui/styles";
import { Icon, IconButton } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  modal: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000087",//theme.palette.background.paper,
    transform: "scale(1)",
    visibility: "visible",
    overflow: "hidden",
    zIndex: "10000",
    opacity: "1",
    transition:
      "opacity .2s ease, visibility .2s ease,transform .2s ease-in-out",
  },
  closeModal: {
    visibility: "hidden",
    transform: "scale(0)",
    opacity: "0",
  },
  imagen: {
    maxWidth: "100%",
    lineHeight: 0,
    height: "auto",
    margin: "0 auto",
    width: "40vh",
    display: "block",
    padding: "20px 0 20px",
    boxSizing: "border-box",
    objectFit: "cover",
  },
}));

const ImagenViewer = ({ open, isClose, imgSrc }) => {
  const style = useStyle();

  const close = ()=>{ isClose()}

  return (
    <>
      <div className={open ? style.modal : style.closeModal}>
        {open && (
          <div >
            <img className={style.imagen} src={imgSrc} alt="..." />
            <IconButton onClick={close}>Cerrar <Icon sx={{color:"white"  }}>close</Icon></IconButton>
          </div>
        )}
      </div>
    </>
  );
};

export default ImagenViewer;