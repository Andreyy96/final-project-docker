import {FC, PropsWithChildren} from 'react';

import {Navigate} from "react-router-dom";
import {authService} from "../services/authService";


interface IProps extends PropsWithChildren {}

const CurrentUserLogined:FC<IProps> = ({children}) => {

    const accessToken = authService.getAccessToken();

    if (accessToken ) {
        return <Navigate to={"/orders"}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export {CurrentUserLogined};