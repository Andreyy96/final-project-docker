import { IQuery } from "../interfaces/query.interface";
import {
  IManagerListResponse,
  IResUser,
  IUser,
  IUserWithStatistic,
} from "../interfaces/user.interface";

class UserPresenter {
  public toPublicResDto(entity: IUser): Partial<IUser> {
    return {
      _id: entity._id,
      id: entity.id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      is_active: entity.is_active,
      last_login: entity.last_login,
      is_banned: entity.is_banned,
      role: entity.role,
    };
  }

  public toResDto(entity: IUserWithStatistic): IResUser {
    return {
      user: {
        _id: entity._id,
        id: entity.id,
        name: entity.name,
        surname: entity.surname,
        email: entity.email,
        is_active: entity.is_active,
        is_banned: entity.is_banned,
        last_login: entity.last_login,
        role: entity.role,
      },
      orders: {
        total: entity.total.length,
        in_work: entity.in_work.length,
        agree: entity.agree.length,
        disagree: entity.disagree.length,
        dubbing: entity.dubbing.length,
      },
    };
  }

  public toListResDto(
    entities: IUserWithStatistic[],
    total: number,
    limit: number,
    query: IQuery,
  ): IManagerListResponse {
    return {
      data: entities.map(this.toResDto),
      page: query.page ? +query.page : 1,
      total,
      limit,
    };
  }
}

export const userPresenter = new UserPresenter();
