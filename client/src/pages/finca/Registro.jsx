import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from "@nextui-org/react"
import AxiosInstance from "../../api/axios.js"
import Lottie from "react-lottie"
import Animation from "../../images/Animation-registerEstate.json"
import "./css/registro.css"

const Registro = () => {
  const [formData, setFormData] = useState({
    identificationNumber: "",
    name: "",
    breed: "",
    gender: "",
    birthDate: "",
    color: "",
    distinctiveMark: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const cargarData = async () => {
    console.log("datos enviados", formData)
    try {
      await AxiosInstance.post("/cargar/data", formData)
      console.log(success)
    } catch (error) {
      console.log(error)
    }
  }

  const options = {
    loop: false,
    autoPlay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }


  return (
    <div className="pt-20 pb-20 registro-00-container">
      <form action="" className="flex  registro-01-form">
        <div className="registro-00-div-form">
          <h1 className="registro-01-form-title">Datos del Ganado: Formulario de Registro</h1>
          <span className=" mb-2" style={{ height: "300px", width: "300px" }}>
            <Lottie options={options} />
          </span>

        </div>
        <div lassName="registro-01-div-form">
          <span className="form-001-span mb-2">
            <TextField
              className="form-00-span-textFiel mr-2"
              required
              id="identificationNumber"
              name="identificationNumber"
              label="Identificación"
              placeholder="123456789"
              value={formData.identificationNumber}
              onChange={handleChange}
            />
            <TextField
              className="form-00-span-textFiel ml-2"
              required
              id="name"
              name="name"
              label="Nombre"
              placeholder="Vaca"
              value={formData.name}
              onChange={handleChange}
            />

          </span>

          <span className="form-001-span mb-2">
            <TextField
              className="form-01-span-textField"
              required
              id="breed"
              name="breed"
              label="Raza"
              placeholder="Braman"
              value={formData.breed}
              onChange={handleChange}
            />
          </span>
          <span className="form-001-span mb-2">
            <FormControl required className="form-01-span-textField">
              <InputLabel id="gender-label" >Género</InputLabel>
              <Select
                required
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="hembra">Hembra</MenuItem>
                <MenuItem value="macho">Macho</MenuItem>
              </Select>
            </FormControl>
          </span>

          <span className="form-001-span mb-2">
            <TextField
              className="form-01-span-textField"
              required
              id="birthDate"
              name="birthDate"
              label="Fecha de nacimiento"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </span>

          <span className="form-001-span mb-2">
            <TextField
              className="form-00-span-textFiel mr-2"
              id="color"
              name="color"
              label="Color"
              placeholder="Blanco"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              className="form-00-span-textFiel mr-2"
              id="distinctiveMark"
              name="distinctiveMark"
              label="Marca distintiva"
              placeholder="Mancha en la frente"
              value={formData.distinctiveMark}
              onChange={handleChange}
            />

          </span>

          <span className="form-001-span mb-2">
            <TextField
              className="form-01-span-textField"
              id="description"
              name="description"
              label="Descripción"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </span>
          <Button onClick={cargarData} color="primary"> Cargar</Button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
