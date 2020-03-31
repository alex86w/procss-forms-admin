import React, { useEffect } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import Mobile from '..'
import { useLocation, history, useModel } from 'umi'

function Submit(props: any) {

    const location = useLocation();
    const { asyncFetch } = useModel('forms')
    const { clearTodoForms } = useModel('todoForm')
    //@ts-ignore
    const { query = {} } = location;
    useEffect(() => {
        clearTodoForms();
        asyncFetch(location);
    }, []);
    return (
        <div>
            <NavBar onLeftClick={() => history.goBack()} leftContent={<Icon type='left' />} >
                {query.title}
            </NavBar>
            <Mobile />
        </div>
    )
}

export default Submit
