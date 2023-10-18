import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del servidor:', error);
    throw error;
  }
};

const DataFetcher = ({ onDataFetched }) => {
  useEffect(() => {
    fetchData()
      .then(data => {
        // Llamar a la función onDataFetched con los datos obtenidos
        onDataFetched(data);
      })
      .catch(error => {
        // Manejar errores aquí si es necesario
      });
  }, [onDataFetched]);

  return null; // No necesitas renderizar nada en este componente
};

export default DataFetcher;
