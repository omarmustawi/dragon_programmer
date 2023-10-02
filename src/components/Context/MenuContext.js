import { createContext, useState } from "react";

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
};



export { MenuContext , MenuContextProvider } ;