import React, { useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './content.css'

import { Button } from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { FormItems } from '@/services/interface/forms.interface'
import { useModel } from 'umi'
import ChildrenTable from './ChildrenTable'
import CommonItem from './CommonItem'
import ChildrenItem from './ChildrenItem'
export interface ContentBaseProps {
    item: FormItems
    onClick: (cahceId: any) => void;
    selectCahceId: any,
    tabId?: string,
}

const TIMER: any = null;
const ContentBase: React.FC<ContentBaseProps> = (props) => {

    if (props.item.parentId) {
        return <ChildrenItem {...props} />
    } else {
        return <CommonItem {...props} />
    }
}

export default ContentBase