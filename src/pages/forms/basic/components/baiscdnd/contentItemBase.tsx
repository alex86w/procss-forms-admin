import React, { useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './content.css'
import { useDispatch } from 'umi'
import { ContentContext } from '../formdes'
import { Button } from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
export interface ContentBaseProps {
    title?: string,
    id: any,
    selectCahceId: any
    onClick: (cahceId: any) => void;
}

const ContentBase: React.FC<ContentBaseProps> = ({ id, children, selectCahceId, onClick }) => {

    const { moveItems, moveVirBox, copyItem, deleItem } = useContext(ContentContext);

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'contentItem', id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, drop] = useDrop({
        accept: ['contentItem', 'title'],
        //@ts-ignore
        hover({ id: dId, type }) {
            if (dId !== id && type === 'contentItem') {
                // moveItems(dId, id)
                moveItems(dId, id)
            } else if (type === "title") {
                moveVirBox(id)
            }
        },
        canDrop: () => false
    })

    const opacity = isDragging ? 0 : 1
    const isSelect = id === selectCahceId;
    return (
        <div className={isSelect ? "content-view select-lable" : "content-view"} onClick={() => onClick(id)} ref={node => drag(drop(node))} style={{ opacity }}>

            {children}

            <div className={"mask"} />
            {isSelect && <div className="select-operation">
                <Button style={{ marginRight: 10 }} onClick={e => { e.preventDefault(); e.stopPropagation(); copyItem(id) }} shape="circle" icon={<CopyOutlined style={{ color: "#0DB3A6" }} />} />
                <Button style={{ marginRight: 50 }} onClick={e => { e.preventDefault(); e.stopPropagation(); deleItem(id) }} shape="circle" icon={<DeleteOutlined style={{ color: 'red' }} />} />
            </div>}
        </div>

    )
}

export default ContentBase