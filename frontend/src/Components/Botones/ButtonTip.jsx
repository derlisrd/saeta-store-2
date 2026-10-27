import { Icon, IconButton, Tooltip,Zoom } from "@mui/material";

function ButtonTip({onClick,icon,title}) {
    return (<Tooltip TransitionComponent={Zoom}
    arrow
    placement="right-start"  title={<h3>{title}</h3>}><IconButton onClick={onClick}><Icon>{icon}</Icon></IconButton></Tooltip>);
}

export default ButtonTip;