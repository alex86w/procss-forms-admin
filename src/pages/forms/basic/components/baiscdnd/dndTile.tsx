import React, { useContext } from 'react'
import { Button } from 'antd'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'umi'
interface Props {
    title: string,
    icon?: React.ReactNode,
    type: string,
}
import { ContentContext } from '../formdes'

export default ({ title, icon, type: key, }: Props) => {
    const { addItems } = useContext(ContentContext)
    const [{ opacity }, drag] = useDrag({
        item: { key, type: "title", title },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: monitor.isDragging()
        }),
        end: (dr, monitor) => {
            if (monitor.didDrop()) {
                addItems && addItems({ id: Date.parse(new Date().toString()), type: key, title });
            }
        }
    })

    return (
        <div ref={drag} style={{ opacity, cursor: 'move', }}>
            <Button onClick={() => addItems({ id: Date.parse(new Date().toString()), type: key, title })} size='small' icon={icon}>
                {title}
            </Button>
        </div>
    )
}