import {FC} from 'react';
import {IComment} from "../../../interfaces/comment.interface";
import css from "./OrderComment.module.css"

interface IProps {
    comment: IComment
    index: number
}

const OrderComment: FC<IProps> = ({comment, index}) => {
    if (index >= 3) return
    return (
        <>
        <div className={css.commentDiv}>
            <p>{comment.body}</p>
            <p>{comment.manager_name} {comment.manager_surname}  {comment.date}</p>
        </div>
            {index === 2 && <tr/>}
        </>
    );
};

export {OrderComment};