import {FC} from 'react';
import {IOrder} from "../../../interfaces/order.interface";
import css from "./Order.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {OrderComment} from "../OrderComment/OrderComment";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {commentActions} from "../../../store/slices/commentSlice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {orderActions} from "../../../store/slices/orderSlice";
import {commentValidator} from "../../../validators/commentValidator";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppContext} from "../../../hooks/useAppContext";

interface IProps {
    order: IOrder
    index: number
}

const Order: FC<IProps> = ({order, index}) => {
    // const [trigger, setTrigger] = useState<boolean>(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<{comment: string}>({
        mode: "onSubmit",
        resolver: joiResolver(commentValidator)
    })
    const dispatch = useAppDispatch()
    const res = (index % 2) === 0
    const {currentUser} = useAppSelector(state => state.auth)
    const {order_tr} = useAppSelector(state => state.order)

        const [, setFlag] = useAppContext();

    const sendComment:SubmitHandler<{comment: string}> = ({comment}) =>  {
        setFlag(true)
        reset()
        dispatch(commentActions.postComment({dto: {body: comment}, id: order._id}))
    }

    const openExtraWindow = () => {
        if (order_tr === `div${order.id}`) {
            dispatch(orderActions.setString(null))
        } else {
            dispatch(orderActions.setString(`div${order.id}`))
        }
    }


    return (
        <>
        {/*<tr className={!res ? css.white : css.gray} onClick={() => setTrigger(!trigger)}>*/}
        <tr className={!res ? css.white : css.gray} onClick={openExtraWindow}>
            <th>{order.id}</th>
            <th>{order.name ? order.name : "null"}</th>
            <th>{order.surname ? order.surname : "null"}</th>
            <th>{order.email ? order.email : "null"}</th>
            <th>{order.phone ? order.phone : "null"}</th>
            <th>{order.age ? order.age : "null"}</th>
            <th>{order.course ? order.course : "null"}</th>
            <th>{order.course_format ? order.course_format : "null"}</th>
            <th>{order.course_type ? order.course_type : "null"}</th>
            <th>{order.status ? order.status : "null"}</th>
            <th>{order.sum ? order.sum : "null"}</th>
            <th>{order.already_paid ? order.already_paid : "null"}</th>
            <th>{order.group ? order.group : "null"}</th>
            <th>{order.created_at ? order.created_at : "null"}</th>
            <th>{order.manager ? order.manager : "null"}</th>
        </tr>
            {/*{trigger && <tr className={css.tr}>*/}
            {order_tr === `div${order.id}` && <tr className={css.tr}>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <p className={css.message}>Message: {order.msg ? order.msg : "null"}</p>
                    <p className={css.utm}>UTM: {order.utm ? order.utm : "null"}</p>
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    {order.comments &&
                        <div className={css.commentsDiv}>
                            {order.comments.map((comment, index) => <OrderComment key={comment._id} comment={comment}
                                                                                  index={index}/>)}
                        </div>
                    }
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <form onSubmit={handleSubmit(sendComment)} className={css.form}>
                        <div className={css.form_div}>
                        <input className={errors.comment ? css.border_red_submit : css.input} type={"text"} placeholder={"Comment"} {...register("comment")}/>
                        <button className={css.submit} disabled={currentUser._id !== order.manager_info?._id && order.manager !== null}>SUBMIT</button>
                        </div>
                        {errors.comment && <p>{errors.comment.message}</p>}
                    </form>
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <ModalWindow order={order}/>
                </th>
            </tr>}
        </>
    )
};

export {Order};