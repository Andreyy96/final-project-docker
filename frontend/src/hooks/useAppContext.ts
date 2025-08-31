import {useContext} from "react";
import {Context} from "../hoc/LoaderContext";


const useAppContext = () => useContext(Context)

export {
    useAppContext
}