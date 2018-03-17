import React from 'react';
import Api from '../../api/Api'
import {CUSTOMER_RESTAURANT_ROUTE} from '../../Routes'

import './StartView.scss'

class StartView extends React.Component {
    constructor(props) {
        super(props)

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        Api.startDemo().then((demoId) => this.props.history.push(`/${demoId}/${CUSTOMER_RESTAURANT_ROUTE}`))
    }

    render() {
        return (
            <div id="bf-demo-start-view">
                <button onClick={this.onStartDemo}>START DEMO</button>
            </div>
        )
    }
}

export default StartView
