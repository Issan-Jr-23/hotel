// import React from "react";
import {Input} from "@nextui-org/react";
import './formulario.css'

export default function App() {
  const variants = ["flat"];

  return (
    <div className="w-full flex flex-col gap-4 form_exp">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 div_formulario" >

          <Input className='input_form' type="Text" variant={variant} label="Nombre" />
          <Input className='input_form' type="text" variant={variant} label="Acompañantes" />
          <Input className='input_form' type="Text" variant={variant} label="Nombre" />
        </div>
      ))}  
    </div>  
  );
}
