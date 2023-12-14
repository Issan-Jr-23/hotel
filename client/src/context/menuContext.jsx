import React, { useState, createContext, useContext } from 'react';

// Crear el contexto
const MenuContext = createContext();

// Crear un proveedor de contexto
export const MenuProvider = ({ children }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <MenuContext.Provider value={{ menuAbierto, setMenuAbierto }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook para usar el contexto
export const useMenu = () => useContext(MenuContext);
