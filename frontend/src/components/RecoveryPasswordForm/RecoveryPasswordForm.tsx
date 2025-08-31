import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {schemaForSetPassword} from "../../validators/userValidator";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {authActions} from "../../store/slices/authSlice";
import css from "./RecoveryPasswordForm.module.css";
import {IPassword} from "../../interfaces/password.interface";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const RecoveryPasswordForm = () => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false)
    const {register, handleSubmit, formState: {errors}} = useForm<IPassword>({
        mode: "onSubmit",
        resolver: joiResolver(schemaForSetPassword)
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {passwordError} = useAppSelector(state => state.auth)

    const {actionToken} = useParams<string>()

    const recoveryPassword:SubmitHandler<IPassword> = async (body) => {
        const {meta: {requestStatus}} = await dispatch(authActions.recoveryPassword({actionToken, body}))
        if (requestStatus === 'fulfilled'){
            setVisiblePassword(false)
            navigate('/login')
        }
    }

    return (
        <div className={css.recoveryPasswordPage}>
            <form className={css.recoveryPasswordForm} onSubmit={handleSubmit(recoveryPassword)}>
                <label className={css.labelPassword} htmlFor={"password"}>Password
                <input className={errors.password && css.redBorder} id={"password"} type={visiblePassword ? "text" : "password"} placeholder={'password'} {...register('password')}/>
                    {visiblePassword ? <VisibilityOff onClick={() => setVisiblePassword(false)}/> :  <Visibility onClick={() => setVisiblePassword(true)}/>}
                </label>
                {errors.password && <p className={css.passwordError}>{errors.password.message}</p>}
                <label className={css.labelConfirmPassword} htmlFor={"confirm_password"}>Confirm password
                <input className={(errors.confirm_password || passwordError) && css.redBorder} id={"confirm_password"} type={visibleConfirmPassword ? "text" : "password"} placeholder={'confirm_password'} {...register('confirm_password')}/>
                    {visibleConfirmPassword ? <VisibilityOff onClick={() => setVisibleConfirmPassword(false)}/> :  <Visibility onClick={() => setVisibleConfirmPassword(true)}/>}
                </label>
                {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
                {passwordError && <p>{passwordError}</p>}
                <button>Confirm</button>
            </form>
        </div>
    );
};

export {RecoveryPasswordForm};
