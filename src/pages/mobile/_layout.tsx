import React from 'react'

const Layout: React.FC = (props) => {
    console.log('moible', 'layout')
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Layout;
