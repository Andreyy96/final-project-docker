import {useSearchParams} from "react-router-dom";

const useAppSortTable = () => {
    const [query, setQuery] = useSearchParams();
    const order = query.get('order');

    return {
        sortById: () => setQuery(prev => {
            if (order === "id") {
                prev.set("order", "-id")
            }
            else {
                prev.set('order', "id")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByName: () => setQuery(prev => {
            if (order === "name") {
                prev.set("order", "-name")
            }
            else {
                prev.set('order', "name")
            }
            prev.set("page", "1")
            return prev
        }),
        sortBySurname: () => setQuery(prev => {
            if (order === "surname") {
                prev.set("order", "-surname")
            }
            else {
                prev.set('order', "surname")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByEmail: () => setQuery(prev => {
            if (order === "email") {
                prev.set("order", "-email")
            }
            else {
                prev.set('order', "email")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByPhone: () => setQuery(prev => {
            if (order === "phone") {
                prev.set("order", "-phone")
            }
            else {
                prev.set('order', "phone")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByAge: () => setQuery(prev => {
            if (order === "age") {
                prev.set("order", "-age")
            }
            else {
                prev.set('order', "age")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByCourse: () => setQuery(prev => {
            if (order === "course") {
                prev.set("order", "-course")
            }
            else {
                prev.set('order', "course")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByCourseFormat: () => setQuery(prev => {
            if (order === "course_format") {
                prev.set("order", "-course_format")
            }
            else {
                prev.set('order', "course_format")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByCourseType: () => setQuery(prev => {
            if (order === "course_type") {
                prev.set("order", "-course_type")
            }
            else {
                prev.set('order', "course_type")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByStatus: () => setQuery(prev => {
            if (order === "status") {
                prev.set("order", "-status")
            }
            else {
                prev.set('order', "status")
            }
            prev.set("page", "1")
            return prev
        }),
        sortBySum: () => setQuery(prev => {
            if (order === "sum") {
                prev.set("order", "-sum")
            }
            else {
                prev.set('order', "sum")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByAlreadyPaid: () => setQuery(prev => {
            if (order === "already_paid") {
                prev.set("order", "-already_paid")
            }
            else {
                prev.set('order', "already_paid")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByGroup: () => setQuery(prev => {
            if (order === "group") {
                prev.set("order", "-group")
            }
            else {
                prev.set('order', "group")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByCreatedAt: () => setQuery(prev => {
            if (order === "created_at") {
                prev.set("order", "-created_at")
            }
            else {
                prev.set('order', "created_at")
            }
            prev.set("page", "1")
            return prev
        }),
        sortByManager: () => setQuery(prev => {
            if (order === "manager") {
                prev.set("order", "-manager")
            }
            else {
                prev.set('order', "manager")
            }
            prev.set("page", "1")
            return prev
        }),
    }
}

export {useAppSortTable}