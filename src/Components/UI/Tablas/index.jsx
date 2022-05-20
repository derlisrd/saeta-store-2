import { TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box,Typography,Icon,Alert, Stack,Avatar } from '@mui/material'
import { useTablaStyles } from './TablaStyles';
import TablaLoading from './TablaLoading'

const Tablas = ({title,subtitle,loading,datas,columns,caption,inputs,Accions,showOptions,lang,icon}) => {
    const style = useTablaStyles();

    if(!columns){ console.warn("Missing props 'columns'"); return; }
    if(!datas){ console.warn("Missing props 'datas[]'"); return; }
    if(!Accions){console.warn("Missing props 'Accions'"); return; }
  return (
      <>
    <Box padding={1} margin={1}>
        <Stack direction="row" spacing={2}>
            <Box>
                <Avatar variant="rounded" sx={{ bgcolor: icon.color? icon.color : 'inherit',padding:3 }} >
                    {icon && <Icon fontSize="large" >{icon.name}</Icon>}
                </Avatar>
            </Box>
            <Box>
                <Typography variant='h5'>{title}</Typography>
                <Typography variant='caption'>{subtitle}</Typography>
            </Box>
        </Stack>
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
            {caption && <caption><b>{caption}</b></caption>}
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
                        {lang? lang.opciones : "Opciones"}
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
            <Typography variant="body1">{lang? lang.sin_registros : "Sin registros"}</Typography>
          </Alert>
        )
    }
    </Box>
    </>
  )
}

export default Tablas
