import {useAppSelector} from "../../../hooks/useAppSelector";
import css from "./OrderStatistic.module.css"

const OrderStatistic = () => {

    const {status_statistic} = useAppSelector(state => state.order)

    return (
        <div className={css.statistic_container}>
            <div>
                <p>Orders statistic</p>
            </div>
            <div className={css.statistic}>
                <p>Total: {status_statistic && status_statistic.total}</p>
                <p>Agree: {status_statistic && status_statistic.agree}</p>
                <p>In work: {status_statistic && status_statistic.in_work}</p>
                <p>Disagree: {status_statistic && status_statistic.disagree}</p>
                <p>Dubbing: {status_statistic && status_statistic.dubbing}</p>
                <p>New: {status_statistic && status_statistic.new}</p>
                <p>Null: {status_statistic && status_statistic.null}</p>
            </div>
        </div>
    );
};

export {OrderStatistic};
