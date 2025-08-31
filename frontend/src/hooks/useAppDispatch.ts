import {useDispatch} from "react-redux";
import {AppDispatch} from "../types/reduxType";

const useAppDispatch = () => useDispatch<AppDispatch>()

export {useAppDispatch}