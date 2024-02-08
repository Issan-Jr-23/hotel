import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MiComponente = () => {
  const [opcionesGrafica, setOpcionesGrafica] = useState({});
  const [pagina, setPagina] = useState(1);
  const [datosClientes, setDatosClientes] = useState([]);
  const [datosUsuarios, setDatosUsuarios] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await AxiosInstance.get(`/data?page=${pagina}`);
        const datos = response.data;
        setDatosClientes(datos.clients);
        setDatosUsuarios(datos.users);
        configurarGrafica(datos.clients, datos.users);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, [pagina]);

  const configurarGrafica = (clientes, usuarios) => {
    const categorias = [...clientes.map(cliente => cliente.nombre), ...usuarios.map(usuario => usuario.nombre)];

    const series = [{
      name: 'Bebidas',
      data: [...clientes.map(cliente => cliente.totalBebidas), ...usuarios.map(usuario => usuario.totalBebidas)]
    }, {
      name: 'Restaurante',
      data: [...clientes.map(cliente => cliente.totalRestaurante), ...usuarios.map(usuario => usuario.totalRestaurante)]
    }, {
      name: 'Descorche',
      data: [...clientes.map(cliente => cliente.totalDescorche), ...usuarios.map(usuario => usuario.totalDescorche)]
    }, {
      name: 'Recepción',
      data: [...clientes.map(cliente => cliente.totalRecepcion), ...usuarios.map(usuario => usuario.totalRecepcion)]
    }, {
      name: 'Pago Total',
      data: [...clientes.map(cliente => cliente.totalPago), ...usuarios.map(usuario => usuario.totalPago)]
    }];

    setOpcionesGrafica({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Desglose de Pagos por Cliente y Usuario'
      },
      xAxis: {
        categories: categorias,
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
      series: series
    });
  };

  const handlePaginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    setPagina(pagina + 1);
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={opcionesGrafica}
      />
      <div>
        <button onClick={handlePaginaAnterior} disabled={pagina === 1}>Página Anterior</button>
        <button onClick={handlePaginaSiguiente}>Página Siguiente</button>
      </div>
    </div>
  );
};

export default MiComponente;
