import { Dialog, Zoom } from "@mui/material";
import { useCobrar } from "./CobrarProvider";

function DialogDetalles() {
    const {dialogs,setDialogs} = useCobrar()


    const close = () => {setDialogs({ ...dialogs, detalles: false });};

    return (<Dialog onClose={close} TransitionComponent={Zoom} maxWidth="lg" fullWidth open={dialogs.detalles}>
        </Dialog>);
}

export default DialogDetalles;