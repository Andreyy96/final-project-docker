import { UserRoleEnum } from "../enums/user-role.enum";

export interface ITokenPayload {
  userId: string;
  role: UserRoleEnum;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
