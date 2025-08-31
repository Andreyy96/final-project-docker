import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";

const AuthLayout = () => {

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {AuthLayout};
