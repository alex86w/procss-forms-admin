import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Checkbox } from 'antd';
function CheckboxForms(props: ContentBaseProps) {

    const { item } = props
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '8px'
    };
    const selects = item.items?.map((x, index) => x.checked && index).filter(x => x || x == 0).filter(x => x.toString() !== 'false');
    return (
        <ContentBase {...props}>
            <Checkbox.Group value={selects} >
                {
                    item.items?.map((it, index) => <Checkbox
                        value={index}
                        key={index}
                        style={item.layout !== 'horizontal' && radioStyle || {}}
                    >
                        {it.value}
                    </Checkbox>)}
            </Checkbox.Group >
        </ContentBase>
    )
}

export default CheckboxForms
