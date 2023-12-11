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
        onDataFetched(data);
      })
      .catch(error => {
      });
  }, [onDataFetched]);

  return null; 
};

export default DataFetcher;
