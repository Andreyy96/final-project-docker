export interface IComment {
  _id: string;
  body: string;
  manager_name: string;
  manager_surname: string;
  date: string;
  _userId: string;
  _orderId: string;
}

export interface ICreateComment {
  body: string;
}
