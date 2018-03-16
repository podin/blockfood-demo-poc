import React from 'react';
import {withRouter} from 'react-router-dom';
import Api from '../../api/Api'

import './StartView.scss'

class StartView extends React.Component {
    constructor(props) {
        super(props)

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        Api.startDemo().then((demoId) => this.props.history.push(`${demoId}/customer-restaurants/`))
    }

    render() {
        return (
            <div id="bf-demo-start-view">
                <button onClick={this.onStartDemo}>START DEMO</button>
            </div>
        )
    }
}

export default withRouter(StartView)
