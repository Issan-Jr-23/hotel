// import React from "react";
import {Input} from "@nextui-org/react";
import './formulario.css'
import {Select, SelectItem} from "@nextui-org/react";
import { useState } from 'react';

export default function App() {
  const variants = ["flat"];

  const placements = [
    "inside",
  ];



  const [numero, setNumero] = useState('');

  const handleInputChange = (event) => {
    // Obtén el valor del campo de entrada
    let inputValue = event.target.value;

    // Remueve cualquier carácter que no sea número
    inputValue = inputValue.replace(/[^\d]/g, '');

    // Formatea el número con puntos separando los miles
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Actualiza el estado con el nuevo valor formateado
    setNumero(inputValue);
  };



  return (
    <div className="w-full flex flex-col gap-4 form_exp">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 div_formulario" >

          <Input className='input_form' type="Text" variant={variant} label="Nombre del producto" />
          <Select
          id="tamaño"
          label="Tamaño"
          placeholder="seleccione si o no"
          className="w-full"
          >

          <SelectItem>Pequeño</SelectItem>
          <SelectItem>Mediano</SelectItem>
          <SelectItem>Grande</SelectItem>
          <SelectItem>Mega</SelectItem>

          {/* {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>} */}
          </Select>
          <Input className='input_form' type="Number" variant={variant} label="Cantidad"/>
          {placements.map((placement) => (
            <Input
              key={placement}
              id="fechaDeCaducidad"
              type="date"
              label="Fecha de caducidad"
              labelPlacement={placement}
              placeholder="Enter your email"
              description={placement}
            />
          ))}

          <Input className='input_form' 
          id="precioDeVenta"
          placeholder="0.00" 
          type="text" 
          value={numero}
          label="Precio de venta" 
          onChange={handleInputChange}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
            
          }/>
        </div>
      ))}  
    </div>  
  );
}
