import React, { } from 'react';

export default class Loading extends React.Component {
    render() {
        return <div style={{ width: "100vw", height: "100vh", background: "transparent", position: "fixed", left: 0, top: 0 }}>
            <img src={require('@/asserts/img/123.gif')} style={{ width: 200, height: 200, position: 'absolute', transformOrigin: "center bottom", top: "calc( 50vh - 100px )", left: "calc( 50vw - 100px  )", background: 'transparent' }} />
        </div>
    }
}