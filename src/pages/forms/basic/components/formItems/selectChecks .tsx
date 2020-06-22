import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Checkbox, Select } from 'antd';
function SelectChecksForms(props: ContentBaseProps) {

    const { item } = props
    const selects = item.items?.map((x, index) => x.checked && index).filter(x => x || x == 0).filter(x => x.toString() !== 'false');
    return (
        <ContentBase {...props}>
            <Select mode='multiple' style={{ width: '50%' }} value={selects} >
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

export default SelectChecksForms
