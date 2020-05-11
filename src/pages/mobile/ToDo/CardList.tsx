import React, { useEffect, useState, ReactText } from 'react';
import { Badge, List } from 'antd-mobile';
import { cardlist, } from './layout.less'
import { queryGroup } from '@/services/todo';
import { Response } from '@/services/base';
import { message } from 'antd';
import { history } from 'umi';



const ListItem = List.Item;

export const Card = function ({ item: { form = {}, ...rest }, state }: { item: any, state: ReactText }) {
    return (
        <ListItem style={{ margin: 8 }} extra={<Badge text={rest.formCount} />} onClick={() => history.push(`/mobile/todo/FormList?formId=${rest.formId}&state=${state}`)}>
            <div style={{ overflow: "visible" }}><span>{(form || {}).name}</span></div>
        </ListItem>
    )
}



const fetch = async function (state: ReactText, $data: (v: any) => void) {
    const res = await queryGroup(state) as Response<any>;
    if (res.success) {
        $data(res.data);
    } else {
        message.error('获取数据失败', 2);
    }
}

export default function CardList({ state }: { state: ReactText }) {
    const [data, $data] = useState<any[]>([]);
    useEffect(() => {
        fetch(state, $data)
    }, [state])

    return (
        <List className={cardlist}>
            {data.map(item => <Card item={item} key={item.formId} state={state} />)}
        </List>
    )

}


