import {BaseSyntheticEvent, FC, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {IOrder, IUpdateDtoOrder} from "../../../interfaces/order.interface";
import css from "./ModalWindow.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {Group} from "../../GroupsContainer/Group/Group";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {groupActions} from "../../../store/slices/groupSlice";
import {joiResolver} from "@hookform/resolvers/joi";
import {orderValidator} from "../../../validators/orderValidator";
import {orderActions} from "../../../store/slices/orderSlice";
import {useAppContext} from "../../../hooks/useAppContext";

interface IProps {
    order: IOrder
}

const ModalWindow:FC<IProps> = ({order}) => {
    const [selectOrText, setSelectOrText] = useState<boolean>(true)
    const {register, handleSubmit, setValue, formState: {errors}, resetField} = useForm<IUpdateDtoOrder>({
        mode: "onSubmit",
        resolver: joiResolver(orderValidator)
    });
    const {groups, createGroupError} = useAppSelector(state => state.group)
    const [open, setOpen] = useState<boolean>(false);
    const {currentUser} = useAppSelector(state => state.auth)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectOrText(prevState => !prevState)
        setValue("group", order.group)
        setOpen(false);
    }
    const dispatch = useAppDispatch()
    const [, setFlag] = useAppContext();

    const addBtn = useRef(null)
    const updateBtn = useRef(null)
    const changerBtn = useRef(null)

    useEffect(() => {
        if (order.name) {
            setValue("name", order.name)
        }
        if (order.surname) {
            setValue("surname", order.surname)
        }
        if (order.email) {
            setValue("email", order.email)
        }
        if (order.phone) {
            setValue("phone", order.phone)
        }
        if (order.age) {
            setValue("age", order.age.toString())
        }
        if (order.course) {
            setValue("course", order.course)
        }
        if (order.course_format) {
            setValue("course_format", order.course_format)
        }
        if (order.course_type) {
            setValue("course_type", order.course_type)
        }
        if (order.status) {
            setValue("status", order.status)
        } else {
            setValue("status", "In work")
        }
        if (order.group) {
            setValue("group", order.group)
        } else {
            resetField("group")
        }
    }, [order, setValue]);

    const updateOrder:SubmitHandler<IUpdateDtoOrder> = async (dto,event: BaseSyntheticEvent) => {
        // @ts-expect-error
        if (event.nativeEvent.submitter === updateBtn.current) {
            setFlag(true)
            await dispatch(orderActions.updateById({ id: order._id.toString(), dto}))
            handleClose()
        } else {
            // @ts-expect-error
            if(event.nativeEvent.submitter === changerBtn.current) {
                setSelectOrText(prevState => !prevState)
                dispatch(groupActions.setGroupError(null))
                if (!selectOrText) {
                    setValue("group", order.group)
                } else {
                    resetField("group")
                }
            } else {
                const {meta: {requestStatus}} = await dispatch(groupActions.createGroup({name: dto.group}))
                if (requestStatus==='fulfilled'){
                    setSelectOrText(prevState => !prevState)
                }
            }
        }
    }


    return (
        <>
            <button onClick={handleOpen} disabled={currentUser._id !== order.manager_info?._id && order.manager !== null} className={css.edit}>EDIT</button>
            <Modal
                className={css.modal_window}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={css.box}>
                    <form name={"update_order"} onSubmit={handleSubmit(updateOrder)} className={css.updateForm}>
                        <div className={css.margin_top}>
                            <label className={css.form_item}>Group
                                {selectOrText ?
                                    <>
                                        <select name="group" {...register("group")}>
                                            <option value="">null</option>
                                            {groups.map(group => <Group group={group} key={group._id}/>)}
                                        </select>

                                        <button className={css.button_add} ref={changerBtn}>add group</button>
                                    </>
                                    :
                                    <>
                                        <input className={createGroupError && css.border_red} type="text" name={"group"}
                                               placeholder={'group'} {...register('group')} />
                                        {createGroupError && <p>{createGroupError}</p>}
                                        <div className={css.button_group_container}>
                                            <button ref={addBtn} type={"submit"}>add group</button>
                                            <button ref={changerBtn}>select</button>
                                        </div>
                                    </>
                                }
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Status
                                <select name="status" {...register("status")}>
                                    <option value="">null</option>
                                    <option value="In work">In work</option>
                                    <option value="New">New</option>
                                    <option value="Agree">Agree</option>
                                    <option value="Disagree">Disagree</option>
                                    <option value="Dubbing">Dubbing</option>
                                </select>
                                {errors.status && <p>{errors.status.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Name
                                <input type="text" placeholder={'name'} {...register('name')}/>
                                {errors.name && <p>{errors.name.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Sum
                                <input type="number" placeholder={'sum'}  {...register('sum')}/>
                                {errors.sum && <p>{errors.sum.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Surname
                                <input type="text" placeholder={'surname'} {...register('surname')}/>
                                {errors.surname && <p>{errors.surname.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Already Paid
                                <input type="number" placeholder={'already_paid'}  {...register('already_paid')}/>
                                {errors.already_paid && <p>{errors.already_paid.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Email
                                <input className={errors.email && css.border_red} type="text" placeholder={'email'} {...register('email')}/>
                                {errors.email && <p>{errors.email.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Course
                                <select name="course" {...register("course")}>
                                    <option value="">null</option>
                                    <option value="FS">FS</option>
                                    <option value="QACX">QACX</option>
                                    <option value="JCX">JCX</option>
                                    <option value="JSCX">JSCX</option>
                                    <option value="FE">FE</option>
                                    <option value="PCX">PCX</option>
                                </select>
                                {errors.course && <p>{errors.course.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Phone
                                <input className={errors.phone && css.border_red} type="text" placeholder={'phone'} {...register('phone')}/>
                                {errors.phone && <p>{errors.phone.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Course Format
                                <select name="course_format" {...register("course_format")}>
                                    <option value="">null</option>
                                    <option value="static">static</option>
                                    <option value="online">online</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Age
                                <input className={errors.age && css.border_red} type="number" placeholder={'age'}  {...register('age')}/>
                                {errors.age && <p>{errors.age.message}</p>}
                            </label>
                        </div>
                        <div>
                            <label className={css.form_item}>Course Type
                                <select name="course_type"  {...register("course_type")}>
                                    <option value="">null</option>
                                    <option value="pro">pro</option>
                                    <option value="minimal">minimal</option>
                                    <option value="premium">premium</option>
                                    <option value="incubator">incubator</option>
                                    <option value="vip">vip</option>
                                </select>
                            </label>
                        </div>
                        <div className={css.button_container}>
                            <button onClick={handleClose}>Close</button>
                            <button ref={updateBtn} type={"submit"}>Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export {ModalWindow};
