import {MainLayout} from "../layouts/MainLayout";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {PublicLayout} from "../layouts/PublicLayout";
import {LoginPage} from "../pages/LoginPage";
import {AuthLayout} from "../layouts/AuthLayout";
import {AuthRequired} from "../hoc/AuthRequired";
import {OrderPage} from "../pages/OrderPage";
import {AdminPanelPage} from "../pages/AdminPanelPage";
import {CurrentUserLogined} from "../hoc/CurrentUserLogined";
import {ActivatePage} from "../pages/ActivatePage";
import {RecoveryPasswordPage} from "../pages/RecoveryPasswordPage";
import {ActionLayout} from "../layouts/ActionLayout";
import { AdminAccess } from "../hoc/AdminAccess";



export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children:[
            {index:true, element:<Navigate to={"/login"}/>},
            {element: <CurrentUserLogined><PublicLayout/></CurrentUserLogined>, children: [
                    {path: "login", element: <LoginPage/>},
                ]},
            {element: <AuthRequired><AuthLayout/></AuthRequired>, children: [
                    {path: "orders", element: <OrderPage/>},
                    {path: "adminPanel", element: <AdminAccess><AdminPanelPage/></AdminAccess>},
                ]},
            {element: <ActionLayout/>, children: [
                    {path: "activate/:actionToken", element: <ActivatePage/>},
                    {path: "recovery-password/:actionToken", element: <RecoveryPasswordPage/>},
                ]}
        ]
    }
])