import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MiComponente = () => {
  const [datosCombinados, setDatosCombinados] = useState([]);
  const [opcionesGrafica, setOpcionesGrafica] = useState({});

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resClientes, resUsuarios] = await Promise.all([
          AxiosInstance.get('/obtain-clientes-cabanias'),
          AxiosInstance.get('/obtain-clientes-historial-cabanias')
        ]);

        const clientData = resClientes.data;
        const userData = resUsuarios.data;

        let datosCombinados = combinarRegistros(clientData, userData);

        datosCombinados = datosCombinados.slice(0, 17);

        setDatosCombinados(datosCombinados);

        configurarGrafica(datosCombinados);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);


  const combinarRegistros = (clients, users) => {
    const combinedData = [];
    const identificacionesCombinadas = new Map();

    clients.forEach(client => {
      const { identificacion } = client;
      identificacionesCombinadas.set(identificacion, { ...client });
    });

    users.forEach(user => {
      const { identificacion } = user;
      if (identificacionesCombinadas.has(identificacion)) {
        const existingRecord = identificacionesCombinadas.get(identificacion);
        identificacionesCombinadas.set(identificacion, {
          ...existingRecord,
          totalBebidas: existingRecord.totalBebidas + user.totalBebidas,
          totalRestaurante: existingRecord.totalRestaurante + user.totalRestaurante,
          totalDescorche: existingRecord.totalDescorche + user.totalDescorche,
          totalRecepcion: existingRecord.totalRecepcion + user.totalRecepcion,
          totalPago: existingRecord.totalPago + user.totalPago,
        });
      } else {
        identificacionesCombinadas.set(identificacion, user);
      }
    });

    identificacionesCombinadas.forEach((value) => combinedData.push(value));
    return combinedData;
  };

  const configurarGrafica = (datos) => {
    const opciones = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Desglose de Pagos por Cliente'
      },
      xAxis: {
        categories: datos.map(dato => dato.nombre),
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Pagado ($)',
          align: 'high'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        }
      },
      tooltip: {
        valuePrefix: '$',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: [{
        name: 'Bebidas',
        data: datos.map(dato => dato.totalBebidas)
      }, {
        name: 'Restaurante',
        data: datos.map(dato => dato.totalRestaurante)
      }, {
        name: 'Descorche',
        data: datos.map(dato => dato.totalDescorche)
      }, {
        name: 'Recepción',
        data: datos.map(dato => dato.totalRecepcion)
      }, {
        name: 'Pago Total',
        data: datos.map(dato => dato.totalPago)
      }]
    };

    setOpcionesGrafica(opciones);
  };


  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={opcionesGrafica}
      />
    </div>
  );
};

export default MiComponente;
