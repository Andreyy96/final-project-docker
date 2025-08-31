import {Pagination} from "@mui/material";
import {ChangeEvent} from "react";

import {useUserPageQuery} from "../../../hooks/useUserPageQuery";
import css from "./ManagerPagination.module.css"

const ManagerPagination = () => {

    const {page, handleChange, total_page}: {page: string, handleChange: (event: ChangeEvent<unknown>, value: number) => void, total_page: number} = useUserPageQuery()



    return (
        <div className={css.div_pagination}>
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

export {ManagerPagination};