import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {IQueryFilterOrder} from "../../../interfaces/order.interface";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useEffect, useState} from "react";
import {Replay, UploadFile} from "@mui/icons-material";
import css from "./OrderFilter.module.css"
import {Group} from "../../GroupsContainer/Group/Group";
import {useAppLocation} from "../../../hooks/useAppLocation";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {orderActions} from "../../../store/slices/orderSlice";
import {groupActions} from "../../../store/slices/groupSlice";


const OrderFilter = () => {
    const {search} = useAppLocation()
    const {register, handleSubmit, setValue, reset} = useForm<IQueryFilterOrder>();
    const [startTrigger, setStartTrigger] = useState<boolean>(false)
    const [endTrigger, setEndTrigger] = useState<boolean>(false)
    const {groups, groupTrigger} = useAppSelector(state => state.group)
    const dispatch = useAppDispatch()
    const searchParams = new URLSearchParams();
    const navigate = useNavigate()


    const {currentUser} = useAppSelector(state => state.auth)
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        dispatch(groupActions.getAllGroup())
        if (query.get("name")) {
            setValue("name", query.get("name"))
        } else {
            setValue("name", null)
        }
        if (query.get("surname")) {
            setValue("surname", query.get("surname"))
        } else {
            setValue("surname", null)
        }
        if (query.get("email")) {
            setValue("email", query.get("email"))
        } else {
            setValue("email", null)
        }
        if (query.get("phone")) {
            setValue("phone", query.get("phone"))
        } else {
            setValue("phone", null)
        }
        if (query.get("age")) {
            setValue("age", query.get("age"))
        } else {
            setValue("age", null)
        }
        if (query.get("course")) {
            setValue("course", query.get("course"))
        } else {
            setValue("course", null)
        }
        if (query.get("course_format")) {
            setValue("course_format", query.get("course_format"))
        } else {
            setValue("course_format", null)
        }
        if (query.get("course_type")) {
            setValue("course_type", query.get("course_type"))
        } else {
            setValue("course_type", null)
        }
        if (query.get("status")) {
            setValue("status", query.get("status"))
        } else {
            setValue("status", null)
        }
        if (query.get("group")) {
            setValue("group", query.get("group"))
        } else {
            setValue("group", null)
        }
        if (query.get("start_date")) {
            setValue("start_date", query.get("start_date"))
        } else {
            setValue("start_date", null)
        }
        if (query.get("end_date")) {
            setValue("end_date", query.get("end_date"))
        } else {
            setValue("end_date", null)
        }
        if (query.get("manager")) {
            setValue("manager", true)
        } else {
            setValue("manager", false)
        }
    }, [query, setValue, groupTrigger]);

    let queryString: string
    const setQ: SubmitHandler<IQueryFilterOrder> = (queries) => {

        for (const element in queries) {
            // @ts-expect-error
            if (queries[element] && !queries[element].includes("all")) {
                // setQuery(prev => {
                //     const searchParams = new URLSearchParams(prev)
                //     // @ts-ignore
                //     searchParams.set(element, queries[element])
                //     searchParams.delete("page")
                //     // prev.set(element, queries[element])
                //     // prev.delete("page")
                //     return searchParams
                // })
                searchParams.delete(element)
                searchParams.delete("page")
                // @ts-ignore
                searchParams.set(element, queries[element])

                queryString = searchParams.toString();
            } else {
                setQuery(prev => {
                    prev.delete(element)
                    return prev
                })
            }
        }
        console.log(queryString)
        return navigate(queryString ? `/orders?${queryString}`: "/orders")

    }

    const resetTab = () => {
        reset()
        setQuery(prev => {
            prev.delete("name")
            prev.delete("surname")
            prev.delete("email")
            prev.delete("phone")
            prev.delete("age")
            prev.delete("course")
            prev.delete("course_format")
            prev.delete("course_type")
            prev.delete("status")
            prev.delete("group")
            prev.delete("start_date")
            prev.delete("end_date")
            prev.delete("order")
            prev.delete("manager")
            prev.delete("page")
            return prev
        })
    }

    const createExcel =  () => {
        dispatch(orderActions.downloadExcel({query: search}))
    }



    return (
        <div className={css.main_div}>
            <form className={css.main_filter_div} name={"filter_order"} onChange={handleSubmit(setQ)}>
                <div className={css.form_input}>
                    <label>
                    <input type="text" placeholder={'Name'} name='name'  {...register('name')}/>
                    </label>
                    <input type="text" placeholder={'Surname'} name='surname'  {...register('surname')}/>
                    <input type="text" placeholder={'Email'} name='email' {...register('email')}/>
                    <input type="text" placeholder={'Phone'} name='phone' {...register('phone')}/>
                    <input type="text" placeholder={'Age'} name='age' {...register('age')}/>
                    <select name="course"  {...register("course")}>
                        <option value="">all courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JCX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="FE">FE</option>
                        <option value="PCdX">PCX</option>
                    </select>
                    <select name="course_format" {...register("course_format")}>
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select name="course_type" {...register("course_type")}>
                        <option value="">all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select name="status" {...register("status")}>
                        <option value="">all statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Agree">Agree</option>
                        <option value="Disagree">Disagree</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>
                    <select name="gropes" {...register("group")}>
                        <option value="">all groups</option>
                        {groups.map(group => <Group group={group} key={group._id}/>)}
                    </select>
                    <input className={css.form_input_data} type={startTrigger ? "date" : "text"}
                           onClick={() => setStartTrigger(true)}
                           placeholder={'Start_date'} {...register('start_date')}/>
                    <input className={css.form_input_data} type={endTrigger ? "date" : "text"}
                           onClick={() => setEndTrigger(true)} placeholder={'End_date'} {...register('end_date')}/>
                </div>
                <div className={css.form_button_div}>
                    <label>
                        <input className={css.form_input_checkbox} type="checkbox"
                               value={currentUser && currentUser.name || ""} {...register('manager')}/>
                        My
                    </label>
                    <button className={css.button_reset} formAction={resetTab}><Replay className={css.svg_reload}/>
                    </button>
                </div>
            </form>
            <button onClick={createExcel}><UploadFile/></button>
        </div>
    );
};

export {OrderFilter};