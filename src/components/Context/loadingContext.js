import { createContext, useState } from "react";

const loadingCreate = createContext();

const LoadingProvider = ({ children }) => {
  const [is_loading, set_is_loading] = useState(false);
  return (
    <loadingCreate.Provider value={{ is_loading, set_is_loading }}>
      {children}
    </loadingCreate.Provider>
  );
};
export { loadingCreate, LoadingProvider };
