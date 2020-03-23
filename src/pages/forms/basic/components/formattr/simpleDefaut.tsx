import React, { useContext } from 'react';

import { Input } from 'antd';
import { useModel } from 'umi';

const SimpleDefault = () => {
    const { selectItem, updateItem } = useModel('forms');

    return (
        <>
            <span>默认值</span>
            <Input
                value={selectItem.value}
                onChange={e => updateItem(e.target.value, 'value')}
            />
        </>
    );
};

export default SimpleDefault;
