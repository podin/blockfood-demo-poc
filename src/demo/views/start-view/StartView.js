import React from 'react'
import {connect} from 'react-redux'
import Api from '../../api/Api'
import {getRouteCustomerAddress} from '../../Routes'

import {restart} from '../../state/Actions'

import './StartView.scss'

class StartView extends React.Component {
    constructor(props) {
        super(props)

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        Api.startDemo().then((demoId) => this.props.history.push(getRouteCustomerAddress(demoId)))
    }

    componentDidMount() {
        this.props.dispatch(restart())
    }

    render() {
        return (
            <div id="bf-demo-start-view">
                <button onClick={this.onStartDemo}>START DEMO</button>
            </div>
        )
    }
}

export default connect()(StartView)
