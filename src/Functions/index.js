export const funciones = {

    splitFecha: (fecha)=>{
    
        let date = new Date();
        let split = fecha.split("-");
        return date.setFullYear(parseInt(split[0]),parseInt(split[1]) - 1,parseInt(split[2]));
        //retorna en timestamp ejemplo: 1669932926692
    },
    numberFormat: n=> parseFloat(n).toLocaleString("de-DE"),

}