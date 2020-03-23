import React, { useContext, useEffect } from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Radio, Select } from 'antd';

function SelectForm(props: ContentBaseProps) {

    const { item } = props
    const checkeIndex = item.items?.findIndex(x => x.checked) || 0;

    return (
        <ContentBase {...props}>
            <Select style={{ width: '50%' }} value={checkeIndex >= 0 && checkeIndex || 0}>
                {
                    item.items?.map((it, index) => <Select.Option
                        value={index}
                        key={index}
                    >
                        {it.value}
                    </Select.Option>)}
            </Select >
        </ContentBase>
    )
}

export default SelectForm
