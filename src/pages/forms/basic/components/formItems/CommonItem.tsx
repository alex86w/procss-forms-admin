import React, { useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './content.css'

import { Button } from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { FormItems } from '@/services/interface/forms.interface'
import { useModel } from 'umi'
export interface ContentBaseProps {
    item: FormItems
    onClick: (cahceId: any) => void;
    selectCahceId: any,
    tabId?: string,
}

const TIMER: any = null;
const CommonItem: React.FC<ContentBaseProps> = ({ children, onClick, item, selectCahceId, tabId }) => {

    const { moveItems, moveVirBox, copyItem, deleItem } = useModel('forms');
    const [timer, setTimer] = useState(TIMER)
    const { id, title, description } = item
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'contentItem', id: item.id, tabId },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, drop] = useDrop({
        accept: ['contentItem', 'title'],
        //@ts-ignore
        hover({ id: dId, type }) {
            !timer && setTimer(setTimeout(() => {
                if (dId !== id && type === 'contentItem') {
                   console.log('moveItems', dId + "::" + id)
                    moveItems(dId, id, tabId)
                } else if (type === "title") {
                    moveVirBox(id, tabId)
                }
                setTimer(null)
            }, 100))
        },
        canDrop: () => false
    })

    const opacity = isDragging ? 0 : 1
    const isSelect = id === selectCahceId;

    return (
        <div className={isSelect ? "content-view select-lable" : "content-view"} onClick={() => onClick(id)} ref={node => drag(drop(node))} style={{ opacity }}>
            <span className="title">{title}</span>
            <div dangerouslySetInnerHTML={{ __html: description || "" }}>
            </div>
            {children}

            <div className={"mask"} />
            {isSelect && <div className="select-operation">
                <Button style={{ marginRight: 10 }} onClick={e => { e.preventDefault(); e.stopPropagation(); copyItem(id) }} shape="circle" icon={<CopyOutlined style={{ color: "#0DB3A6" }} />} />
                <Button style={{ marginRight: 50 }} onClick={e => { e.preventDefault(); e.stopPropagation(); deleItem(id) }} shape="circle" icon={<DeleteOutlined style={{ color: 'red' }} />} />
            </div>}
        </div>

    )
}

export default CommonItem