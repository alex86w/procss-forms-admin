import React, { ReactElement } from 'react';
//@ts-ignore
import { Lifecycle } from 'react-router'
const CreateRoutePendding = function CreateRoutePendding(str: string): (component: React.Component) => ReactElement {
    //@ts-ignore
    return React.createClass({
        mixins: [Lifecycle],
        routerWillLeave(nextLocation: Location) {
            if (!this.state.isSaved) {
                return 'Your work is not saved! Are you sure you want to leave?'
            }
        },
        render: function () {
            return <div/>
        }
    })
}