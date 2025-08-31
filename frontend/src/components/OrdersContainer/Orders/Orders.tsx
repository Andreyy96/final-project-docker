import {useAppSelector} from "../../../hooks/useAppSelector";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {orderActions} from "../../../store/slices/orderSlice";
import {Order} from "../Order/Order";
import css from "./Orders.module.css"
import {OrderPagination} from "../OrderPagination/OrderPagination";
import {useAppLocation} from "../../../hooks/useAppLocation";
import {useAppSortTable} from "../../../hooks/useAppSortTable";
import {ISortOrder} from "../../../interfaces/order.interface";
import {usePageQuery} from "../../../hooks/usePageQuery";
import {useDebounce} from "../../../hooks/useDebounce";
import { CircularProgress } from "@mui/material";
import {useAppContext} from "../../../hooks/useAppContext";

const Orders = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {orders} = useAppSelector(state => state.order)
    const {trigger, createCommentAction} = useAppSelector(state => state.comment)
    const {orderTrigger} = useAppSelector(state => state.order)
    const {total_page} = usePageQuery()
    const dispatch = useAppDispatch()
    const {
        sortById,
        sortByName,
        sortBySurname,
        sortByEmail,
        sortByPhone,
        sortByAge,
        sortByCourse,
        sortByCourseFormat,
        sortByCourseType,
        sortByStatus,
        sortBySum,
        sortByAlreadyPaid,
        sortByGroup,
        sortByCreatedAt,
        sortByManager
    }: ISortOrder = useAppSortTable()

    const {search} = useAppLocation()
    const debouncedSearchTerm = useDebounce(search, 1000);

    const [flag, setFlag] = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
                if (debouncedSearchTerm.debouncedValue) {
                    if (flag) {
                        setIsLoading(false)
                    } else  {
                        setIsLoading(true)
                    }
                     const {meta: {requestStatus}} = await dispatch(orderActions.getAll({query: debouncedSearchTerm.debouncedValue}))
                    if (requestStatus==='fulfilled'){
                        setFlag(false)
                        setIsLoading(false)
                    }
                } else {
                    if (flag) {
                        setIsLoading(false)
                    } else  {
                        setIsLoading(true)
                    }
                    const {meta: {requestStatus}} = await dispatch(orderActions.getAll({query: search}))
                    if (requestStatus==='fulfilled'){
                        setFlag(false)
                        setIsLoading(false)
                    }
                }
        };

        fetchData();
    }, [debouncedSearchTerm.debouncedValue, trigger, orderTrigger]);

    return (
        <div className={css.main_page_div}>

            { isLoading && !createCommentAction  ?
                <div className={css.loader_div}><CircularProgress size={160} /></div>
                :
                <table>
                    <thead>
                    <tr>
                        <th onClick={sortById}>id</th>
                        <th onClick={sortByName}>name</th>
                        <th onClick={sortBySurname}>surname</th>
                        <th onClick={sortByEmail}>email</th>
                        <th onClick={sortByPhone}>phone</th>
                        <th onClick={sortByAge}>age</th>
                        <th onClick={sortByCourse}>course</th>
                        <th onClick={sortByCourseFormat}>course_format</th>
                        <th onClick={sortByCourseType}>course_type</th>
                        <th onClick={sortByStatus}>status</th>
                        <th onClick={sortBySum}>sum</th>
                        <th onClick={sortByAlreadyPaid}>already_paid</th>
                        <th onClick={sortByGroup}>group</th>
                        <th onClick={sortByCreatedAt}>created_at</th>
                        <th onClick={sortByManager}>manager</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => <Order order={order} index={index+1} key={order._id}/>)}
                    </tbody>
                </table>
            }
            {(total_page !== 1 && !isLoading) && <OrderPagination/>}

        </div>
    );
};

export {Orders};
