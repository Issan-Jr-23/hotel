import React, { createContext, useContext, useState } from "react";

const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  const actualizarUsuarios = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <UsuariosContext.Provider value={{ usuarios, actualizarUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => {
  return useContext(UsuariosContext);
};
