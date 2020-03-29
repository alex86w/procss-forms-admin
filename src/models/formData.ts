import { Action } from '@/pages/models/ModelBase'
import { useReducer, useEffect, ReactText } from 'react'
import { ColumnType } from 'antd/lib/table'
import { query } from '@/services/formData'
import { notification } from 'antd'


interface DataSource {
    [key: string]: ReactText;

}
export interface State {
    col: ColumnType<any>[];
    data: DataSource[];
    page: number;
    size: number;
    count: number;

}

const reducer = (state: State, action: Action) => {
    if (action.type === 'changeColAndData') {

    }
    return { ...state, [action.type]: action.payload }
}
const init: State = {
    count: 0,
    col: [],
    data: [],
    page: 0,
    size: 10
}
const fetchData = async function (page: number, size: number, dispatch: (action: Action) => void) {
    const res = await query({ page, size });
    if (res.success) {
        const data = res.data;
        const col = (res.items || []).map((it: any) => ({ dataIndex: it.id, key: it.id, title: it.title, width: 150 }))
        dispatch({type:'changeColAndData',})

    }

}

export default () => {
    const [store, dispatch] = useReducer(reducer, init);

    useEffect(() => {


    })


}