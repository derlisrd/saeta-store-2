import {Fab, Icon,} from '@mui/material'
import { Funciones } from '../../Funciones/Funciones';
import {Styles} from './Styles'
import { BASEURL } from "../../Config/globales";
import { useClientes } from './ClientesProvider';

export const Acciones = ({ id, extraprops }) => {

    const {BorrarCliente} = useClientes()

    const classes = Styles()
    return (
      <div className={classes.botones}>
        <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() => Funciones.goto(`${BASEURL}/clientes/new/${id}`)}
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={() => BorrarCliente(id, extraprops)}
        >
          <Icon>delete</Icon>
        </Fab>
      </div>
    );
  };