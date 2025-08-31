import {urls} from "../constants/urls";
import {apiService} from "./apiService";
import {IRes} from '../types/responeType';

const commentService = {
    postComment: (dto: {body: string}, id: string):IRes<void> => apiService.post(urls.comment.postComment(id), dto),
}

export {
    commentService
}