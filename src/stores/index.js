import { createContext, useContext } from "react";

export const StoreProvider = (props) => {
    return <StoreContext.Provider value={{}} {...props} />;
};

export const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);
