import React, { useEffect } from 'react'
import Mobile from '.';
import { useHistory, useModel } from 'umi';

const finished: React.FC = () => {
    const { location } = useHistory();
    const { asyncFetch, todos } = useModel('todoForm')
    useEffect(() => {
        asyncFetch(location)
    }, [])
    return (
        <Mobile />
    )
}

export default finished;
