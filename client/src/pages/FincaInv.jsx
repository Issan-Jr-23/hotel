import React from 'react';
import Navbars from '../components/Navbars';
import Inventario from "./finca/RanchInventario.jsx";
import { Button } from 'primereact/button'; 
import 'primeflex/primeflex.css';
const FincaInv = () => {
  return (
    <div>
        <Navbars />
        <Inventario/>
        <Button label="Submit" icon="pi pi-check" iconPos="right" />
    </div>
  )
}

export default FincaInv