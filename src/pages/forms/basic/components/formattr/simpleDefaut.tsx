import React, { useContext } from 'react'
import { ContentContext } from '../formdes'
import { Input } from 'antd';

const SimpleDefault = () => {
    const { selectItem, updateItem } = useContext(ContentContext);

    return <>
        <span>默认值</span>
        <Input value={selectItem.defaultValue} onChange={e => updateItem(e.target.value, 'defaultValue')} />
    </>
}

export default SimpleDefault