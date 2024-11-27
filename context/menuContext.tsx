import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null);

export const useMenuContext = () => {
  const {data, setDataAction} = useContext(Context);

  return { callback: data, setCallback: setDataAction };
};

export const MenuContextProvider = ({ children }) => {
  const [data, setData] = useState({ action: () => {} });

  const setDataAction = (callback) => {
    setData({
      action: callback,
    });
  };


  return (
    <Context.Provider value={{ data : data.action, setDataAction }}>
      {children}
    </Context.Provider>
  );
};
