export const funciones = {

    splitFecha: (fecha)=>{
        let date = new Date();
        let split = fecha.split("-");
        return date.setFullYear(parseInt(split[0]),parseInt(split[1]) - 1,parseInt(split[2]));
        //retorna en timestamp ejemplo: 1669932926692
    },
    
    // retorna los dias de cierto mes
    getDaysInMonth: (year, month) => (  new Date(year, month, 0).getDate() ),
    
    firstDay: ()=>{
      //primer dia del mes
      let inputDate = new Date();
      return new Date(inputDate.getFullYear(),inputDate.getMonth(),1)
    },
    firstDayYMD: ()=>{
      //primer dia del mes
      let inputDate = new Date();
      let date=  new Date(inputDate.getFullYear(),inputDate.getMonth(),1)
      return [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        (date.getDate().toString().padStart(2, 0))
      ].join('-');
    },
    getDateYMD : (d)=>{
      let date = new Date(d)
      return [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        (date.getDate().toString().padStart(2, 0))
      ].join('-');
    },

    getDateMDY : (d)=>{
      let date = new Date(d)
      return [
        (date.getMonth() + 1).toString().padStart(2, 0),
        (date.getDate().toString().padStart(2, 0)),
        date.getFullYear(),
      ].join('-');
    },

    getDateDMY : (d)=>{
      let date = new Date(d)
      return [
        (date.getDate().toString().padStart(2, 0)),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getFullYear(),
      ].join('-');
    },

    getFechaHorarioString: (date = new Date())=>{
        let fecha =
        date.getFullYear().toString() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, 0) +
          "-" + date.getDate().toString().padStart(2, 0);
          let hora =
          date.getHours().toString().padStart(2, 0) +
          ":" +
          date.getMinutes().toString().padStart(2, 0) +
          ":" +
          date.getSeconds().toString().padStart(2, 0);
        let fh = `${fecha} ${hora}`; // retorna 2021-12-30 12:02:03
        return fh;
    },

    getHorarioActualString: () => {
        let date = new Date();
        let hora =
          date.getHours().toString().padStart(2, 0) +
          ":" +
          date.getMinutes().toString().padStart(2, 0) +
          ":" +
          date.getSeconds().toString().padStart(2, 0);
        return hora;
        //retorna 20:19 por ejemplo
    },

    getFechaActualString: () => {
        let date = new Date();
        let fecha =
          date.getDate().toString().padStart(2, 0) +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, 0) +
          "-" +
          date.getFullYear().toString();
        return fecha; // retorna 01-12-2020
      },
      fechaActualDMY: (f = null) => {
        var date = new Date();
        if (f === null) {
          date = new Date();
        } else {
          date = new Date(f);
        }
        let fecha =
          date.getDate().toString().padStart(2, 0) +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, 0) +
          "-" +
          date.getFullYear().toString();
        return fecha; // retorna formato 10-03-2022 dia-mes-ano
      },
    
      fechaActualYMD: () => {
        let date = new Date()
      return [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        (date.getDate().toString().padStart(2, 0)),
      ].join('-');

         /** RETORNA   2020-01-20 */
      },
      HoraActualHMS: () => {
        let f = new Date();
        let hour = `${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
        return hour;
      },
    
      fechaEs: (f = null) => {
        var fecha;
        if (f === null) {
          fecha = new Date();
        } else {
          fecha = new Date(f);
        }
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        };
    
        return fecha.toLocaleDateString("es-ES", options);
      },
      fechaMesEs: (f) => {
        let fc = new Date(f);
        let mounth = fc.getMonth() + 1;
        let fecha = new Date(2000, mounth, 1);
        return fecha.toLocaleDateString("es-ES", { month: "long" });
      },
      getDiasDelMes: (date) => {
        let year = date.substr(0,3);
        let month = date.substr(-2,2);
        // retorna los dias de cierto mes
        return new Date(year, month, 0).getDate();
      },
      fechaYMDMySQLtoEs : (fecha)=>{
        let split = fecha.split('-');
        let y = split[0], m = parseInt(split[1]) - 1 , d = split[2] ;
        let newfecha = new Date(y,m,d)
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return newfecha.toLocaleDateString("es-ES", options);
      },
      fechaEsDMY: (f = null) => {
        var fecha;
        if (f === null) {
          fecha = new Date();
        } else {
        let fc = new Date(f);
        let y = f.substr(0,4);
        let d = f.substr(-2,2);
        let m = fc.getMonth() + 1;
        fecha = new Date(y,m,d);
        }
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return fecha.toLocaleDateString("es-ES", options);
      },
    
      redondeo2decimales: (numero) => {
        var nro = parseFloat(numero);
        return Math.round(nro * 100) / 100;
      },
      redondeo: (numero) => {
        var nro = parseFloat(numero);
        return Math.round(nro);
      },
      numberFormat: n=> {
        if(isNaN(n) || !n){
          return "0"
        }
        return parseFloat(n).toLocaleString("de-DE")
      },
      SacarPunto: str=> str.replace(/[.\s]/g,''),
      ComaPorPunto: str=> str.replace(/[,\s]/g,'.'),
      numberSeparator: (nro) => parseFloat(nro).toLocaleString("de-DE"),
    
      NumeroALetras: (num, moneda) => {
        var data = {
          numero: num,
          enteros: Math.floor(num),
          centavos: Math.round(num * 100) - Math.floor(num) * 100,
          letrasCentavos: "",
          letrasMonedaPlural: moneda, //`PESOS`, 'Dólares', 'Bolívares', 'etcs'
          letrasMonedaSingular: moneda, //`PESO`, 'Dólar', 'Bolivar', 'etc'
    
          letrasMonedaCentavoPlural: ``,
          letrasMonedaCentavoSingular: ``,
        };
    
        if (data.centavos > 0) {
          data.letrasCentavos =
            `CON ` +
            (function () {
              if (data.centavos === 1)
                return (
                  Millones(data.centavos) + ` ` + data.letrasMonedaCentavoSingular
                );
              else
                return (
                  Millones(data.centavos) + ` ` + data.letrasMonedaCentavoPlural
                );
            })();
        }
    
        if (data.enteros === 0)
          return `CERO ` + data.letrasMonedaPlural + ` ` + data.letrasCentavos;
        if (data.enteros === 1)
          return (
            Millones(data.enteros) +
            ` ` +
            data.letrasMonedaSingular +
            ` ` +
            data.letrasCentavos
          );
        else
          return (
            Millones(data.enteros) +
            ` ` +
            data.letrasMonedaPlural +
            ` ` +
            data.letrasCentavos
          );
      },
    };
    
    function Unidades(num) {
      switch (num) {
        case 1:
          return `UN`;
        case 2:
          return `DOS`;
        case 3:
          return `TRES`;
        case 4:
          return `CUATRO`;
        case 5:
          return `CINCO`;
        case 6:
          return `SEIS`;
        case 7:
          return `SIETE`;
        case 8:
          return `OCHO`;
        case 9:
          return `NUEVE`;
        default:
          return ``;
      }
    } //Unidades()
    
    function Decenas(num) {
      var decena = Math.floor(num / 10);
      var unidad = num - decena * 10;
    
      switch (decena) {
        case 1:
          switch (unidad) {
            case 0:
              return `DIEZ`;
            case 1:
              return `ONCE`;
            case 2:
              return `DOCE`;
            case 3:
              return `TRECE`;
            case 4:
              return `CATORCE`;
            case 5:
              return `QUINCE`;
            default:
              return `DIECI` + Unidades(unidad);
          }
        case 2:
          switch (unidad) {
            case 0:
              return `VEINTE`;
            default:
              return `VEINTI` + Unidades(unidad);
          }
        case 3:
          return DecenasY(`TREINTA`, unidad);
        case 4:
          return DecenasY(`CUARENTA`, unidad);
        case 5:
          return DecenasY(`CINCUENTA`, unidad);
        case 6:
          return DecenasY(`SESENTA`, unidad);
        case 7:
          return DecenasY(`SETENTA`, unidad);
        case 8:
          return DecenasY(`OCHENTA`, unidad);
        case 9:
          return DecenasY(`NOVENTA`, unidad);
        case 0:
          return Unidades(unidad);
        default:
          return Unidades(unidad);
      }
    } //Unidades()
    
    function DecenasY(strSin, numUnidades) {
      if (numUnidades > 0) return strSin + ` Y ` + Unidades(numUnidades);
    
      return strSin;
    } //DecenasY()
    
    function Centenas(num) {
      var centenas = Math.floor(num / 100);
      var decenas = num - centenas * 100;
    
      switch (centenas) {
        case 1:
          if (decenas > 0) return `CIENTO ` + Decenas(decenas);
          return `CIEN`;
        case 2:
          return `DOSCIENTOS ` + Decenas(decenas);
        case 3:
          return `TRESCIENTOS ` + Decenas(decenas);
        case 4:
          return `CUATROCIENTOS ` + Decenas(decenas);
        case 5:
          return `QUINIENTOS ` + Decenas(decenas);
        case 6:
          return `SEISCIENTOS ` + Decenas(decenas);
        case 7:
          return `SETECIENTOS ` + Decenas(decenas);
        case 8:
          return `OCHOCIENTOS ` + Decenas(decenas);
        case 9:
          return `NOVECIENTOS ` + Decenas(decenas);
        default:
          return `` + Decenas(decenas);
      }
    } //Centenas()
    
    function Seccion(num, divisor, strSingular, strPlural) {
      var cientos = Math.floor(num / divisor);
      var resto = num - cientos * divisor;
    
      var letras = ``;
    
      if (cientos > 0)
        if (cientos > 1) letras = Centenas(cientos) + ` ` + strPlural;
        else letras = strSingular;
    
      if (resto > 0) letras += ``;
    
      return letras;
    } //Seccion()
    
    function Miles(num) {
      var divisor = 1000;
      var cientos = Math.floor(num / divisor);
      var resto = num - cientos * divisor;
    
      var strMiles = Seccion(num, divisor, `UN MIL`, `MIL`);
      var strCentenas = Centenas(resto);
    
      if (strMiles === ``) return strCentenas;
    
      return strMiles + ` ` + strCentenas;
    } //Miles()
    
    function Millones(num) {
      var divisor = 1000000;
      var cientos = Math.floor(num / divisor);
      var resto = num - cientos * divisor;
    
      var strMillones = Seccion(num, divisor, "UN MILLON ", "MILLONES ");
      var strMiles = Miles(resto);
    
      if (strMillones === "") return strMiles;
    
      return strMillones + " " + strMiles;
    } //Millones()