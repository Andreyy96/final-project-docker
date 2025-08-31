import { FilterQuery } from "mongoose";

import { IAccessToken } from "../interfaces/access-token.interface";
import { AccessToken } from "../models/access-token.model";

class AccessTokenRepository {
  public async create(dto: Partial<IAccessToken>): Promise<IAccessToken> {
    return await AccessToken.create(dto);
  }

  public async findByParams(
    params: FilterQuery<IAccessToken>,
  ): Promise<IAccessToken> {
    return await AccessToken.findOne(params);
  }

  public async deleteByParams(params: Partial<IAccessToken>): Promise<void> {
    await AccessToken.deleteOne(params);
  }
}

export const accessTokenRepository = new AccessTokenRepository();
