// import React from "react";
import {Input} from "@nextui-org/react";
import './formulario.css'
import {Select, SelectItem} from "@nextui-org/react";


export default function App() {
  const variants = ["flat"];

  const placements = [
    "inside",
  ];

  return (
    <div className="w-full flex flex-col gap-4 form_exp">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 div_formulario" >

          <Input className='input_form' type="Text" variant={variant} label="Nombre del producto" />
          <Select
          label="Tamaño"
          placeholder="seleccione si o no"
          className="max-w-xs input_form"
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
              type="date"
              label="Email"
              labelPlacement={placement}
              placeholder="Enter your email"
              description={placement}
            />
          ))}

          <Input className='input_form' placeholder="0.00" type="Number" variant={variant} label="Precio de venta" startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
            
          }/>
        </div>
      ))}  
    </div>  
  );
}
