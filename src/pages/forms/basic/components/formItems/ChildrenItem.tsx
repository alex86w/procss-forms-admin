import React, { useState } from 'react'
import './content.css'

import { FormItems } from '@/services/interface/forms.interface'
import { Button } from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDrag, useDrop } from 'react-dnd'
import { useModel } from 'umi'
export interface ContentBaseProps {
    item: FormItems
    onClick: (cahceId: any) => void;
    selectCahceId: any,
    tabId?: string
}

const ChildrenItem: React.FC<ContentBaseProps> = ({ children, item, selectCahceId, onClick }) => {
    const isSelect = item.id === selectCahceId;
    const [timer, setTimer] = useState(null as any)
    const { moveSubFormsItems, copySelect, deleteSelect } = useModel('forms')
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'subform', id: item.id, pid: item.parentId },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })


    const [, drop] = useDrop({
        accept: ['subform'],
        //@ts-ignore
        hover({ id: dId, pid }) {
            !timer && setTimer(setTimeout(() => {
                if (dId !== item.id) {
                    moveSubFormsItems(dId, item.id, pid)
                }
                // if (dId !== id && type === 'contentItem') {
                //    console.log('moveItems', dId + "::" + id)
                //     moveItems(dId, id, tabId)
                // }
                setTimer(null)
            }, 100))
        },
        canDrop: () => false
    })
    const opacity = isDragging ? 0 : 1
    return (
        <div className={'item'} style={{ opacity }} ref={node => drag(drop(node))} onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(item.id) }}>

            <div className='flex' style={{ display: 'flex', height: '33px', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #d9d9d9' }}>
                <span>{item.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 10px 10px 10px' }}>
                {children}
            </div>
            <div className={isSelect ? 'mask actvie' : "mask"} />
            {isSelect && <div className="select-operation" style={{ zIndex: 100 }}>
                <Button style={{ marginRight: 10 }} shape="circle" onClick={e => { e.preventDefault(); e.stopPropagation(); copySelect(); }} icon={<CopyOutlined style={{ color: "#0DB3A6" }} />} />
                <Button style={{ marginRight: 50 }} shape="circle" onClick={e => { e.preventDefault(); e.stopPropagation(); deleteSelect(); }} icon={<DeleteOutlined style={{ color: 'red' }} />} />
            </div>}
        </div>
    )
}

export default ChildrenItem