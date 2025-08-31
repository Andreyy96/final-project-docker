import { IComment } from "../interfaces/comment.intarface";

class CommentPresenter {
  public toPublicResDto(entity: IComment): Partial<IComment> {
    return {
      _id: entity._id,
      body: entity.body,
      manager_name: entity.manager_name,
      manager_surname: entity.manager_surname,
      date: entity.date,
    };
  }
}

export const commentPresenter = new CommentPresenter();
