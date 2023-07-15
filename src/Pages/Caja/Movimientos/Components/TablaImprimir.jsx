import { funciones } from '../../../../Functions';
import style from './style.module.css'


function TablaImprimir({listado,totales,desde,hasta,caja}) {
    return ( <div className={style.table_container}>
        <div className={style.detalles_dia}>
            <table className={style.table_detalles_dia} border={1}>
                <tbody>
                    <tr>
                        <td colSpan={2}><h3>REPORTE DE CAJA</h3></td>
                    </tr>
                    <tr>
                        <td width='20%'>{caja}</td>
                        <td className={style.rango_fecha}> <span>{funciones.getDateYMD( desde )}</span> A: <span>{funciones.getDateYMD( hasta )}</span> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table className={style.tabla_reporte} border='1' width='1200'>
        <thead>
            <tr>
                <th width="4%">OP</th>
                <th width="10%">FECHA</th>
                <th width="6%">INGRESO</th>
                <th width="6%">SALIDA</th>
                <th width="6%">ENTRADA SIN EFEC.</th>
                <th width="6%">SALIDA SIN EFEC.</th>
                <th width="12%">TIPO</th>
                <th width="50%">DETALLES</th>
            </tr>
        </thead>
        <tbody>
            {listado.map((e,i)=>(
                <tr key={i}>
                    <td>{e.id_cajas_movimiento}</td>
                    <td>{e.fecha_movimiento}</td>
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