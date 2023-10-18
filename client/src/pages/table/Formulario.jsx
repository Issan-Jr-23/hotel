// import React from "react";
import {Input} from "@nextui-org/react";
import './formulario.css'
import {Select, SelectItem} from "@nextui-org/react";

export default function App() {
  const variants = ["flat"];

  return (
    <div className="w-full flex flex-col gap-4 form_exp">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 div_formulario" >

          <Input className='' type="Text" variant={variant} label="Nombre" />
          <Select
          label="Reserva"
          placeholder="seleccione si o no"
          className="max-w-xxs "
          >

          <SelectItem>SI</SelectItem>
          <SelectItem>NO</SelectItem>

          {/* {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>} */}
          </Select>
          <Input className='input_form' type="Number" variant={variant} label="Pago pendiente" />
          <Input className='input_form' type="Text" variant={variant} label="Nombre" />
          <Input className='input_form' type="Text" variant={variant} label="Nombre" />
          <Select
          // items={animals}
          label="Favorite Animal"
          placeholder="Select an animal"
          className="max-w-xs"
          >
          {/* {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>} */}
          </Select>
        </div>
      ))}  
    </div>  
  );
}
