import { Action } from '@/pages/models/ModelBase'
import { useReducer, useEffect, ReactText } from 'react'
import { ColumnType } from 'antd/lib/table'


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
const fetchDataSource = function (){

}

export default () => {
    const [store, dispatch] = useReducer(reducer, init);

    useEffect(() => {
        

    })


}