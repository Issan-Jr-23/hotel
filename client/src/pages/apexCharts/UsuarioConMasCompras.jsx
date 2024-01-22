import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js';

const UserMasCompras = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuestaMayorCompra = await AxiosInstance.get('/mayor-compra');
        const datosMayorCompra = respuestaMayorCompra.data;

        const respuestaTotal = await AxiosInstance.get('/obtener-historial-usuarios');
        const datosTotal = respuestaTotal.data;

        const datosCombinados = combinarYProcesarDatos(datosMayorCompra, datosTotal);

        const datosOrdenados = datosCombinados.sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 10);

        setDatos(datosOrdenados);

      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const combinarYProcesarDatos = (datosMayorCompra, datosTotal) => {
    const mapaUsuarios = new Map();

    datosMayorCompra.forEach(usuario => {
      mapaUsuarios.set(usuario.identificacion, usuario);
    });

    datosTotal.forEach(usuario => {
      if (mapaUsuarios.has(usuario.identificacion)) {
        const usuarioExistente = mapaUsuarios.get(usuario.identificacion);
        usuarioExistente.valorTotal += usuario.valorTotal;
        mapaUsuarios.set(usuario.identificacion, usuarioExistente);
      } else {
        mapaUsuarios.set(usuario.identificacion, usuario);
      }
    });

    return Array.from(mapaUsuarios.values());
  };

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'USUARIO CON MAS COMPRAS'
    },
    plotOptions: {
        pie: {
          innerSize: '70%',
          showInLegend: true
        }
      },
    series: [{
      name: 'Valor Total',
      colorByPoint: true,
      data: datos.map(d => ({
        name: d.nombre.toUpperCase(),
        y: d.valorTotal
      }))
    }]
  };

  return (
    <div >
      <HighchartsReact highcharts={Highcharts} options={options}  />
    </div>
  );
};

export default UserMasCompras;
