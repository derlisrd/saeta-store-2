import { TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box,Typography,Icon,Alert, Stack,Avatar } from '@mui/material'
import { useTablaStyles } from './TablaStyles';
import TablaLoading from './TablaLoading'
import { funciones } from '../../../Functions';

const Tablas = ({title,subtitle,loading,datas,columns,caption,inputs,Accions,showOptions,lang,icon,sort}) => {
    const style = useTablaStyles();

    if(!columns){ console.warn("Missing props 'columns'"); return; }
    if(!datas){ console.warn("Missing props 'datas[]'"); return; }
    if(!Accions){console.warn("Missing props 'Accions'"); return; }

return (
      <>
    <Box padding={1} margin={1} >
        <Stack direction="row" spacing={2}>
            <Box>
                <Avatar variant="rounded" sx={{ bgcolor: icon?.color? icon.color : 'inherit',padding:3 }} >
                    {icon && <Icon fontSize="large" >{icon.name}</Icon>}
                </Avatar>
            </Box>
            <Box>
                <Typography variant='h5'>{title}</Typography>
                <Typography variant='caption'>{subtitle}</Typography>
            </Box>
        </Stack>
    </Box>
    <Box borderRadius={3} boxShadow={4} padding={3} className={style.boxContainer}>
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
                        columns.map((col,index)=>(
                            <TableCell  align={col.align ? col.align : "left" } key={index}>
                               {sort?.desc && <span onClick={()=>sort.desc(col.field)} className={style.arrow}>↓</span> }
                               {col.title} 
                               {sort?.asc && <span onClick={()=>sort.asc(col.field)} className={style.arrow}>↑</span>}
                            </TableCell>
                        ))
                    }
                    <TableCell align='center'>
                        {lang? lang.opciones : "Opciones"}
                    </TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody className={style.tbody}>
                {
                    datas.map((data,index)=>(
                        <TableRow hover key={index} className={style.tableRow} >
                            {
                                columns.map((column,i)=>(
                                    <TableCell key={i} className={style.tableCell} align={column.align ? column.align : "left" }>
                                        <span className={style.columntitleSpan}>
                                            {column.title}:
                                        </span>
                                        <span style={
                                            column.style
                                                ? column.style
                                                : column.styleCondition
                                                ? column.styleCondition[data[column.styleItemCondition]]
                                                : null
                                            }>
                                            {
                                                column.before && column.before
                                            }
                                            { 
                                            column.isNumber ? 
                                            funciones.numberFormat(data[column.field]) :
                                            column.items ?
                                            column.items[data[column.compareField]] :
                                            column.html ? column.html :
                                            data[column.field]
                                            }
                                            {
                                                column.after && column.after
                                            }
                                            </span>
                                    </TableCell>
                                ))
                            }
                            <TableCell align='center'>
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
