import React, { useState, createContext, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <MenuContext.Provider value={{ menuAbierto, setMenuAbierto }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
