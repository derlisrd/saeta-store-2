import { Bar } from "react-chartjs-2";
import { useInformes } from "./InformesProvider";


const GraficosMensuales = () => {
    const { labelDiarioMes, datosEgresosDiariosMes,datosIngresosDiariosMes} = useInformes()
  return (
    <Bar
      height="40vh"
      width="100%"
      data={{
        labels: labelDiarioMes,
        datasets: [
          {
            label: "Ingresos del día",
            data: datosIngresosDiariosMes,
            backgroundColor: "#b9ddff",
            borderWidth: 1,
            borderColor: "#1976d2",
            fill: true,
          },
          {
            label: "Egresos del día",
            data: datosEgresosDiariosMes,
            backgroundColor: "#f5005791",
            borderWidth: 1,
            borderColor: "#f50057",
            fill: true,
          },
        ],
      }}
    />
  );
};

export default GraficosMensuales;
