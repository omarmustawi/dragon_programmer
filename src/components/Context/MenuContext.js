import { createContext, useState } from "react";

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [blockMenu, setBlockMenu] = useState(true);

  return (
    <MenuContext.Provider value={{ blockMenu, setBlockMenu }}>
      {children}
    </MenuContext.Provider>
  );
};



export { MenuContext , MenuContextProvider } ;