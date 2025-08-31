import {FC, useState} from 'react';
import {IManagerWithStatistic} from "../../../interfaces/user.interface";
import css from "./Manager.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {userActions} from "../../../store/slices/userSlice";
import {authActions} from "../../../store/slices/authSlice";
import {UserRoleEnum} from "../../../enums/user-role.enum";
import {useAppContext} from "../../../hooks/useAppContext";
import {Alert, Snackbar} from "@mui/material";

interface IProps {
    manager: IManagerWithStatistic
}

const Manager: FC<IProps> = ({manager: {user, orders}}) => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [, setFlag] = useAppContext();


    const banUser = () => {
        setFlag(true)
        dispatch(userActions.bannedById({userId: user._id}))
    }

    const unbanUser = () => {
        setFlag(true)
        dispatch(userActions.unbannedById({userId: user._id}))
    }

    const getURLForActivate = async () => {
        const {meta: {requestStatus}} = await dispatch(authActions.getURLForActivate({userId: user._id}))
        if (requestStatus==='fulfilled') {
            handleClick()
        }
    }

    const getURLForRecoveryPassword = async () => {
        const {meta: {requestStatus}} = await dispatch(authActions.getURLForRecoveryPassword({email: user.email}))
        if (requestStatus==='fulfilled') {
            handleClick()
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }



    return (
        <div className={css.manager_main_div}>
            <div className={css.user_info_div}>
                <p>Id: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Surname: {user.surname}</p>
                <p>Email: {user.email}</p>
                <p>Last login: {user.last_login}</p>
                <p>Banned: {!user.is_banned ? "false" : "true"}</p>
                <p>Is active: {!user.is_active ? "false" : "true"}</p>
            </div>
            <div className={css.statistic_div}>
                <p>Total: {orders.total}</p>
                <p>In work: {orders.in_work}</p>
                <p>Agree: {orders.agree}</p>
                <p>Disagree: {orders.disagree}</p>
                <p>Dubbing:{orders.dubbing}</p>
            </div>
            <div className={css.buttons_div}>
                {
                    !user.is_active ?
                        <button onClick={getURLForActivate}>ACTIVATE</button>
                        :
                        <button onClick={getURLForRecoveryPassword}>RECOVERY PASSWORD</button>
                }
                {(user.is_banned && user.role !== UserRoleEnum.ADMIN) && <button onClick={unbanUser}>UNBAN</button>}
                {(!user.is_banned && user.role !== UserRoleEnum.ADMIN)  &&<button onClick={banUser}>BAN</button>}
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    The URL has been copied to the clipboard
                </Alert>
            </Snackbar>
        </div>
    );
};

export {Manager};