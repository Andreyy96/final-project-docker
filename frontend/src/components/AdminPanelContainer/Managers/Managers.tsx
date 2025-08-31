import {useAppSelector} from "../../../hooks/useAppSelector";
import {Manager} from "../Manager/Manager";
import css from "./Managers.module.css"

const Managers = () => {

    const {managers} = useAppSelector(state => state.user)

    return (
        <div className={css.managers_main_div}>
            {managers && managers.map(manager => <Manager key={manager.user.id} manager={manager}/>)}
        </div>
    );
};

export {Managers};
