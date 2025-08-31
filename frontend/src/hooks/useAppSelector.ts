import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../types/reduxType";

const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export {useAppSelector}