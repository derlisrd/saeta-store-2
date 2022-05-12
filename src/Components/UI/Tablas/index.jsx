import { TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box,Typography,Icon,Alert } from '@mui/material'
import { useTablaStyles } from './TablaStyles';
import TablaLoading from './TablaLoading'

const Tablas = ({title,subtitle,loading,datas,columns,caption,inputs,Accions,showOptions}) => {
    const style = useTablaStyles();

    if(!columns){ console.warn("Missing props 'columns'"); return; }
    if(!datas){ console.warn("Missing props 'datas[]'"); return; }
    if(!Accions){console.warn("Missing props 'Accions'"); return; }
  return (
      <>
    <Box padding={1} margin={1}>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='caption'>{subtitle}</Typography>
    </Box>
    <Box borderRadius={3} boxShadow={4} padding={3}>
        <Box padding={1} marginBottom={1}>
            {inputs && inputs}
        </Box>
    {
        loading ? <TablaLoading />
        :
        datas.length > 0 ? (<TableContainer
            id="table_print"
            className={style.tcontainer}
        >
        <Table className={style.table}>
            <TableHead className={style.thead} >
                <TableRow className={style.trtitles} >
                    {
                        columns.map((item,index)=>(
                            <TableCell align='left' key={index}>
                                {item.title}:
                            </TableCell>
                        ))
                    }
                    <TableCell>
                        Opciones
                    </TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody className={style.tbody}>
                {
                    datas.map((data,index)=>(
                        <TableRow hover key={index} className={style.tableRow}>
                            {
                                columns.map((column,i)=>(
                                    <TableCell key={i} className={style.tableCell}>
                                        <span className={style.columntitleSpan}>
                                            {column.title}:
                                        </span>
                                        <span style={column.style? column.style : null}>{data[column.field]}</span>
                                    </TableCell>
                                ))
                            }
                            <TableCell>
                                {
                                    showOptions &&
                                    <Accions rowProps={data} />
                                    }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
        </TableContainer>) : (
            <Alert icon={<Icon>block</Icon>} severity="warning">
            <Typography variant="body1">No hay registros</Typography>
          </Alert>
        )
    }
    </Box>
    </>
  )
}

export default Tablas
