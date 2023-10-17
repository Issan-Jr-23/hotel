import React from 'react';
import { useFormik } from 'formik';
import  {cliente} from "../../../../src/models/client.model.js";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      reserva: 0,
      pago_pendiente: 0,
      total_del_paquete: 0,
      bar: '',
      restaurante: '',
      total_consumido: ''
    },
    validationSchema: Yup.object().shape(cliente), // Usa el schema para la validación
    onSubmit: async (values) => {
      try {
        // Valida los datos utilizando el schema antes de enviar la solicitud
        await cliente.validate(values, { abortEarly: false });

        const response = await fetch('URL_DE_TU_API', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Puedes agregar otros encabezados si son necesarios
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Usuario guardado correctamente.');
        } else {
          console.error('Error al guardar el usuario.');
        }
      } catch (error) {
        // Maneja los errores de validación y de red aquí
        console.error('Error:', error.errors || error.message);
      }
    },
  });

  return (
    
    <form onSubmit={formik.handleSubmit}> 
      <label htmlFor="Nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.nombre}
      />
    
      <label htmlFor="Reserva">Reserva</label>
      <input
        id="reserva"
        name="reserva"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.reserva}
      />
    
      <label htmlFor="Pago pendiente">Pago pendiente</label>
      <input
        id="pado_pendiente"
        name="pago_pendiente"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.pago_pendiente}
      />
    
      <label htmlFor="Total del paquete">Total del paquete</label>
      <input
        id="total_del_paquete"
        name="total_del_paquete"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.pago_pendiente}
      />
    
      <label htmlFor="bar">Bar</label>
      <input
        id="bar"
        name="bar"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.pago_pendiente}
      />
    
      <label htmlFor="Restaurante">Restaurante</label>
      <input
        id="restaurante"
        name="restaurante"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.pago_pendiente}
      />
    
      <label htmlFor="total consumido">Total consumido</label>
      <input
        id="total_consumido"
        name="total_consumido"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.pago_pendiente}
      />
    
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;

