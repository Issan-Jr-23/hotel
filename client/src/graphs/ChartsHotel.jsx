import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { API_URL } from '../config';

const GraficaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch( API_URL+'/productos/mas-vendidos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al obtener los datos:', error));
    }, []);

    const opcionesGrafica = {
        chart: {
            type: 'column', backgroundColor: "transparent"
        },
        title: {
            text: 'Productos Más Vendidos', style: {
              color: '#fff' // Replace with your desired color
            }
        },
        xAxis: {
            categories: productos.map(producto => producto.Descripcion)
        },
        yAxis: {
            title: {
                text: 'Ventas'
            }
        },
        series: [{
            name: 'Ventas',
            data: productos.map(producto => producto.ProductosVendidos)
        }]
    };

    return (
        <div style={{ backdropFilter: "blur(10px) saturate(90%) brightness(130%)", border:"1px solid #272c3d", borderRadius: "15px", color:"white" }}>
            <HighchartsReact highcharts={Highcharts} options={opcionesGrafica} />
        </div>
    );
};

export default GraficaProductos;
