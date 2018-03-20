import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerAddress} from '../../Routes'
import {STEP_INFOS} from '../../data/Steps'
import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'

import {restart, setStep, setStepInfo} from '../../state/Actions'

import './StartView.scss'

class StartView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        this.setState({loading: true})

        doWithMinTime(() => Api.startDemo()).then(() => {
            this.props.dispatch(setStep(1))
            this.props.dispatch(setStepInfo(STEP_INFOS.START_AS_CUSTOMER))
            this.props.history.push(getRouteCustomerAddress())
        })
    }

    componentDidMount() {
        this.props.dispatch(restart())
    }

    render() {
        const {loading} = this.state

        return (
            <div id="bf-demo-start-view">
                {loading ? (
                    <i className="fas fa-circle-notch fa-spin"/>
                ) : (
                    <button onClick={this.onStartDemo}>START DEMO</button>
                )}
            </div>
        )
    }
}

export default connect()(StartView)
