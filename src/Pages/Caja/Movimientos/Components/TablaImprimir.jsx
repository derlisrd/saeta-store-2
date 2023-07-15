import { funciones } from '../../../../Functions';
import style from './style.module.css'


function TablaImprimir({listado,totales,desde,hasta,caja,cajasTotales}) {
    
    return ( <div className={style.table_container}>
        <div className={style.detalles_dia}>
            <table className={style.table_detalles_dia} border={1}>
                <tbody>
                    <tr>
                        <td width='20%'>{caja}</td>
                        <td className={style.rango_fecha}> <span>{funciones.getDateYMD( desde )}</span> A: <span>{funciones.getDateYMD( hasta )}</span> </td>
                    </tr>
                    {
                        cajasTotales.map((e,i)=>(
                            <tr key={i}>
                                <td width='20%'>
                                    {e.abreviatura_moneda}
                                </td>
                                <td>MONTO INICIAL: {funciones.numberFormat(e.monto_inicial_caja)} | MONTO TOTAL: {funciones.numberFormat(e.monto_caja_moneda)} | SIN EFECTIVO: {funciones.numberFormat(e.monto_no_efectivo)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <table className={style.tabla_reporte} border='1' width='1200'>
        <thead>
            <tr>
                <th width="4%">OP</th>
                <th width="10%">FECHA</th>
                <th width="4%">MONEDA</th>
                <th width="5%">INGRESO</th>
                <th width="5%">SALIDA</th>
                <th width="5%">ENTRADA SIN EFEC.</th>
                <th width="5%">SALIDA SIN EFEC.</th>
                <th width="12%">TIPO</th>
                <th width="50%">DETALLES</th>
            </tr>
        </thead>
        <tbody>
            {listado.map((e,i)=>(
                <tr key={i}>
                    <td>{e.id_cajas_movimiento}</td>
                    <td>{e.fecha_movimiento}</td>
                    <td><b>{e.abreviatura_moneda}</b></td>
                    <td>{funciones.numberFormat( e.ingresoEfectivo )}</td>
                    <td>{funciones.numberFormat( e.egresoEfectivo )}</td>
                    <td>{funciones.numberFormat(e.noEfectivo)}</td>
                    <td>{funciones.numberFormat(e.noEfectivoSalida)}</td>
                    <td className={style.descripcion}>{e.descripcion_registro}</td>
                    <td className={style.detalles}>{(e.detalles_movimiento).toLowerCase()}</td>
                </tr>
            ))}
            <tr>
                <td></td>
                <td><b>TOTALES:</b></td>
                <td className={style.total_ingreso}>{funciones.numberFormat(totales.ingresoEfectivo)}</td>
                <td className={style.total_egreso}>{funciones.numberFormat(totales.egresoEfectivo)}</td>
                <td className={style.total_no_efectivo}>{funciones.numberFormat(totales.ingresoNoEfectivo)}</td>
                <td className={style.total_salid_no_efectivo}>{funciones.numberFormat(totales.salidaNoEfectivo)}</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    </div>);
}

export default TablaImprimir;