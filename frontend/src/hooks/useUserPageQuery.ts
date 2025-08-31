import {useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";
import {useAppSelector} from "./useAppSelector";

const useUserPageQuery = () => {

    const {total, limit} = useAppSelector(state => state.user)
    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    const total_page = Math.ceil(total / limit)

    return {
        page: page ? page : "1",
        handleChange: (_event: ChangeEvent<unknown>, value: number) => {
            setQuery(prev => {
                prev.set('page', (value).toString())
                return prev
            })
        },
        total_page
    }
}

export {useUserPageQuery}