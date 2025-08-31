export interface IRefreshToken {
  _id: string;
  refreshToken: string;
  _userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
