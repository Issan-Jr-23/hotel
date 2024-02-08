import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "../../api/axios.js"

const MyComponent = () => {
  
  const [totalVentaPasadia, setTotalVentaPasadia] = useState(0);
  const [totalVentaCabania, setTotalVentaCabania] = useState(0);
  const [totalVentaHabitaciones, setTotalVentaHabitaciones] = useState(0); 
  const [bar, setBar] = useState(0);
  const [restaurante, setRestaurante] = useState(0);
  const [recepcion, setRecepcion] = useState(0);
  const [descorche, setDescorche] = useState(0);
  const [barC, setBarC] = useState(0);
  const [restauranteC, setRestauranteC] = useState(0);
  const [recepcionC, setRecepcionC] = useState(0);
  const [descorcheC, setDescorcheC] = useState(0);
  const [barH, setBarH ] = useState(0);
  const [restauranteH, setRestauranteH] = useState(0);
  const [recepcionH, setRecepcionH] = useState(0);
  const [descorcheH, setDescorcheH] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/obtain-pasadia-ventas');
        console.log(response);

        const { totalCompras } = response.data;
        setTotalVentaPasadia(totalCompras);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //resuelto
        const response = await AxiosInstance.get('/obtain-cabania-ventas');
        console.log(response);

        const { totalCompras } = response.data;
        setTotalVentaCabania(totalCompras);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/obtain-habitaciones-ventas');
        console.log(response);

        const { totalCompras } = response.data;
        setTotalVentaHabitaciones(totalCompras);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/total-generado-ventas-brad`)
        const { bar, restaurante, recepcion, descorche } = response.data
        console.log("muestra: ",recepcion)
        setBar(bar)
        setRestaurante(restaurante)
        setRecepcion(recepcion)
        setDescorche(descorche)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await AxiosInstance.get('/total-generado-ventas-cabania-brad')
        const {bar, restaurante, recepcion, descorche} = response.data
        console.log(bar, restaurante, recepcion, descorche)
        setBarC(bar)
        setRestauranteC(restaurante)
        setRecepcionC(recepcion)
        setDescorcheC(descorche)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await AxiosInstance.get('/total-generado-ventas-habitaciones-brad')
        const {bar, restaurante, recepcion, descorche} = response.data
        setBarH(bar)
        setRestauranteH(restaurante)
        setRecepcionH(recepcion)
        setDescorcheH(descorche)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])





  useEffect(() => {
    // Función para filtrar los datos
    function filterData(data) {
      return data.filter(point => point.y !== 0);
    }
  
    Highcharts.chart('myChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [""]
      },
      yAxis: {
        min: 0,
        startOnTick: false,
        title: {
          text: 'Total Generado ($)',
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
            }
          }
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          minPointLength: 7,
          pointPadding: 0.1, // Ajusta el ancho de las barras
          groupPadding: 0.15 // Ajusta el espacio entre grupos de barras
        }
      },
      series: [
        {
          name: 'Total Pasadía',
          data: filterData([{ y: totalVentaPasadia }]),
        },
        {
          name: 'Bar pasadía',
          data: filterData([{ y: bar }]),
          showInLegend: true,
        },
        {
          name: 'Restaurante pasadía',
          data: filterData([{ y: restaurante }]),
          showInLegend: true,
        },
        {
          name: 'Recepcion pasadía',
          data: filterData([{ y: recepcion }]),
          showInLegend: true,
        },
        {
          name: 'Descorche pasadía',
          data: filterData([{ y: descorche }]),
          showInLegend: true,
        },
        {
          name: 'Total Cabaña',
          data: filterData([{ y: totalVentaCabania }]),
          stack: 'Cabaña',
        },
        {
          name: 'Bar Cabaña',
          data: filterData([{ y: barC }]),
          stack: 'Cabaña',
          showInLegend: true,
        },
        {
          name: 'Restaurante Cabaña',
          data: filterData([{ y: restauranteC }]),
          stack: 'Cabaña',
          showInLegend: true,
        },
        {
          name: 'Recepción Cabaña',
          data: filterData([{y: recepcionC}]),
          stack: 'Cabaña',
          showInLegend: true

        },
        {
          name: 'Descorche Cabaña',
          data: filterData([{y: descorcheC}]),
          stack: 'Cabaña',
          showInLegend: true
        },
        {
          name: 'Total Habitaciones',
          data: filterData([{y: totalVentaHabitaciones}]),
          stack: 'Habitaciones'
        },
        {
          name: 'Bar habitaciones',
          data: filterData([{y: barH}]),
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Restaurante Habitaciones',
          data: filterData([{y:restauranteH}]),
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Recepcion Habitaciones',
          data: filterData([{y: recepcionH}]),
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Descorche Habitaciones',
          data: filterData([{y: descorcheH}]),
          stack:'Habitaciones',
          showInLegend: true
        }
      ]
    });
  }, [totalVentaPasadia, bar, restaurante, recepcion, descorche, totalVentaCabania, barC, restauranteC, recepcionC, descorcheC, barH, restauranteH, recepcionH, descorcheH]);
  


  return (
    <div id="myChart" className='h-full'></div>
  );
};

export default MyComponent;
