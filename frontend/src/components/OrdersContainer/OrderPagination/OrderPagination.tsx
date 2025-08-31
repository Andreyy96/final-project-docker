import {Pagination} from "@mui/material";
import {ChangeEvent} from "react";
import "./OrderPagination.css"

import {usePageQuery} from "../../../hooks/usePageQuery";
import css from "./OrderPagination.module.css"

const OrderPagination = () => {

    const {page, handleChange, total_page}: {page: string, handleChange: (event: ChangeEvent<unknown>, value: number) => void, total_page: number} = usePageQuery()



    return (
        <div className={css.pagination_div}>
            <Pagination
                count={total_page}
                page={+page}
                onChange={handleChange}
                siblingCount={2}
                boundaryCount={1}
            />
        </div>
    );
};

export {OrderPagination};