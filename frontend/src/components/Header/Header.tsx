
import css from "./Header.module.css"
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useEffect} from "react";
import {authActions} from "../../store/slices/authSlice";
import {authService} from "../../services/authService";
import {ExitToApp, ManageAccounts} from "@mui/icons-material";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {useNavigate} from "react-router-dom";


const Header = () => {

    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const access = authService.getAccessToken();
    

    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me())
        }
    }, [access, currentUser, dispatch])

    const signOut = async () => {
        await authService.logOut()
        navigate("/login")
    }

    return (
        <div className={css.Header}>
            <div onClick={() => navigate("/orders")} className={css.div_logo}>
                <h1>Logo</h1>
            </div>
            <div className={css.div_info}>
                <div>
                    <p>{ currentUser && currentUser.name}</p>
                </div>
                <div className={css.tools}>
                    { currentUser&& currentUser.role === UserRoleEnum.ADMIN && <button onClick={() => navigate("/adminPanel")}><ManageAccounts/></button>}
                    <button onClick={signOut}><ExitToApp/></button>
                </div>
            </div>
        </div>
    );
};

export {Header}