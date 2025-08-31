import {createContext, useState} from "react";

const Context = createContext(null)

// @ts-expect-error
const LoaderContext = ({children}) => {
    const state = useState<boolean>(false);

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export {
    LoaderContext,
    Context
};