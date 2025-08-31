export interface IComments {
	comments: IComment[];
}
export interface IComment {
	_id: string;
	body: string;
	manager_name: string;
	manager_surname: string;
	date: string;
	_orderId: string;
}