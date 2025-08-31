import {IManagerInfo} from "./user.interface";
import {IComment} from "./comment.interface";

export interface IOrder {
	_id: string;
	id: number;
	name?: string;
	surname?: string;
	email?: string;
	phone?: string;
	age?: number;
	course?: string;
	course_format?: string;
	course_type?: string;
	sum?: number;
	already_paid?: number;
	group?: string;
	status?: string;
	msg?: string;
	utm?: string;
	created_at: string;
	manager?: string;
	manager_info?: IManagerInfo;
	comments?: IComment[];
}

export interface IGeneralInfoOrder{
	_id: string
	id: number
	name: string
	surname: string | null,
	email: string | null,
	phone: string | null,
	age: number | null,
	course: string | null,
	course_format: string | null,
	course_type: string | null,
	sum: number | null,
	already_paid: number | null,
	created_at: string | null,
	utm: string | null,
	msg: string | null,
	status: string | null,
	group: string | null,
	manager: string | null
}

export interface IOrderPagination {
	data: IOrder[],
	page: number,
	total: number,
	limit: number,

}

export interface ISortOrder {
	sortById: () => void
	sortByName: () => void
	sortBySurname: () => void
	sortByEmail: () => void
	sortByPhone: () => void
	sortByAge: () => void
	sortByCourse: () => void
	sortByCourseFormat: () => void
	sortByCourseType: () => void
	sortBySum: () => void
	sortByStatus: () => void
	sortByAlreadyPaid: () => void
	sortByGroup: () => void
	sortByCreatedAt: () => void
	sortByManager: () => void
}

export interface IQueryFilterOrder {
	name?: string
	surname?: string
	email?: string
	phone?: string
	age?: string
	course?: string
	course_format?: string
	course_type?: string
	status?: string
	group?: string
	start_date?: string
	end_date?: string
	manager?: boolean
}

export interface IUpdateDtoOrder {
	name?: string
	surname?: string
	email?: string
	phone?: string
	age?: string
	course?: string
	course_format?: string
	course_type?: string
	status?: string
	group?: string
	sum?: string
	already_paid?: string
}

export interface IStatusStatistic {
	total: number,
	agree: number,
	in_work: number,
	disagree: number,
	dubbing:  number,
	new: number,
	null: number
}