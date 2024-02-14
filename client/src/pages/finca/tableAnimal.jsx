import React, { useState, useEffect } from "react";
import AxiosInstance from "../../api/axios.js";
import "./css/ganado.table.css";
import { Button } from "@nextui-org/react";
import { TextField, Pagination, Select, MenuItem } from "@mui/material";
import SearchJson from "../../images/Animation-searchGanado.json";
import Lottie from "react-lottie";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [ganado, setGanado] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [registroSelected, setRegistroSelected] = useState(null)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();



  const handleOpen = (id, prueba) => {
    console.log("prueba de registro selccionado", prueba)
    setOpen(true)
    setRegistroSelected(id)
  };

  const handleClose = () => setOpen(false);

  const viewDataGanado = (id) => {
    navigate(`/informacion/becerro/vaca/${id}`);
  };

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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    // Limpiar la búsqueda cuando ambos campos estén vacíos
    if (!identificacion && !nombre) {
      resetSearch();
    }
  }, [identificacion, nombre]);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`/data/ganado?page=${currentPage}`);
      setGanado(response.data.ganado);
      setTotalPages(response.data.totalPages);
      setUserNotFound(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGanado([]);
      setUserNotFound(true);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const buscarRegistroGanado = async () => {
    try {
      let response;
      if (identificacion) {
        response = await AxiosInstance.get(`/buscar/registro/ganado`, {
          params: {
            identificacion: identificacion,
          },
        });
      } else if (nombre) {
        response = await AxiosInstance.get(`/buscar/registro/ganado`, {
          params: {
            nombre: nombre,
          },
        });
      } else {
        // Ambos identificacion y nombre están vacíos
        return;
      }
      if (response.data && response.data.resultado.length > 0) {
        setGanado(response.data.resultado);
        setUserNotFound(false);
        setCurrentPage(1);
      } else {
        setGanado([]);
        setUserNotFound(true);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setGanado([]);
      setUserNotFound(true);
    }
  };

  const resetSearch = () => {
    // Restablecer los datos a su estado original
    fetchData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "identification") {
      setIdentificacion(value);
    } else if (name === "name") {
      setNombre(value);
    }
  };

  const handleAddCalf = async () => {
    try {
      const response = await AxiosInstance.post(`/animals/${registroSelected}/calf`, formData);
      const calfInfo = response.data;
      await AxiosInstance.post("/cargar/data", formData)
      handleClose();
    } catch (error) {
      console.error('Error al agregar el ternero:', error);
    }
  };

  const options = {
    loop: true,
    autoPlay: true,
    animationData: SearchJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 571,
    height: "min-height-90vh",
    bgcolor: 'background.paper',
    overflow: "scroll",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
  };

  return (
    <div className="pt-20 pb-20">
      <div className="ganado-form-table-cont pb-10 pt-10">
        <section className="ganado-table-cont">
          <h1>Listado de Ganado</h1>
          {userNotFound ? (
            <div className="table-userNotfound">
              <p>No se encontraron resultados.</p>
            </div>
          ) : (
            <React.Fragment>
              <table className="table-auto ganado-table ml-2">
                <thead>
                  <tr className="tr-table-ganado">
                    <th>
                      <span className="text-center pl-2 pr-2">#</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Identificación</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Name</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Raza</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Genero</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Fecha de nacimiento</span>
                    </th>
                    <th>
                      <span className="text-center pl-2 pr-2">Añadir</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ganado.map((data, index) => (
                    <tr key={data._id}>
                      <td className="text-center td-table-ganado pl-2 pr-2">{index + 1}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">{data.identificationNumber}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">{data.name}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">{data.breed}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">{data.gender}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">{new Date(data.birthDate).toLocaleDateString('es-ES')}</td>
                      <td className="text-center td-table-ganado pl-2 pr-2">
                        <Button color="primary" className="mr-2" onClick={() => viewDataGanado(data._id)}>Ver mas</Button>
                        <Button color="success" onClick={() => handleOpen(data._id, data.identificationNumber)}>Anadir</Button>
                        <Modal
                          className="box-modal-add-becerro-00"
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          BackdropProps={{
                            style: {
                              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cambia el último valor (0.5) para ajustar la opacidad
                            },
                          }}
                        >
                          <Box sx={style} style={{
                            maxHeight: "90vh",
                            minHeight: "min-content",
                            overflowY: "auto"
                          }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center uppercase">
                              Adicionar bezerro
                            </Typography>
                            <Typography id="modal-modal-description" componet="" sx={{ mt: 2 }}>
                              <div className="registro-01-div-form">
                                <span className="form-001-span mb-2">
                                  <TextField
                                    className="form-00-span-textFiel mr-2"
                                    required
                                    id="identificationNumber"
                                    name="identificationNumber"
                                    label="Identificación"
                                    placeholder="123456789"
                                    value={formData.identificationNumber}
                                    onChange={(e) => setFormData({ ...formData, identificationNumber: e.target.value })}
                                  />
                                  <TextField
                                    className="form-00-span-textFiel ml-2"
                                    required
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    placeholder="Vaca"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
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
                                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                  />
                                  <TextField
                                    className="form-00-span-textFiel mr-2"
                                    id="distinctiveMark"
                                    name="distinctiveMark"
                                    label="Marca distintiva"
                                    placeholder="Mancha en la frente"
                                    value={formData.distinctiveMark}
                                    onChange={(e) => setFormData({ ...formData, distinctiveMark: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  />
                                </span>
                                <Button color="primary" onClick={handleAddCalf}> Cargar</Button>
                              </div>
                            </Typography>
                          </Box>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </React.Fragment>
          )}
        </section>
        <section className="section-form-ganado-table">
          <form action="" className="section-form-ganado">
            <article className="section-article-form-ganado">
              <span className="mb-2 section-form-ganado-lottie">
                <Lottie options={options} />
              </span>
            </article>
            <span className="mb-2 section-form-ganado-span">
              <TextField
                className="section-form-ganado-textField"
                id="identification"
                name="identification"
                label="Identificación"
                variant="outlined"
                value={identificacion}
                onChange={handleInputChange}
              />
            </span>
            <span className="mb-2 section-form-ganado-span">
              <TextField
                className="section-form-ganado-textField"
                id="generatedId"
                label="Id Generado"
                variant="outlined"
              />
            </span>
            <span className="mb-2 section-form-ganado-span">
              <TextField
                className="section-form-ganado-textField"
                id="name"
                name="name"
                label="Nombre"
                variant="outlined"
                value={nombre}
                onChange={handleInputChange}
              />
            </span>
            <span className="mb-2 section-form-ganado-span">
              <Button
                color="success"
                className="section-form-ganado-textField button-form-ganado text-white"
                onClick={buscarRegistroGanado}
              >
                Buscar
              </Button>
            </span>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Table;
