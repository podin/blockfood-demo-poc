import React from 'react'
import {connect} from 'react-redux'
import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'
import {getRouteCustomerAddress} from '../../Routes'

import {restart, setStep, setModal} from '../../state/Actions'

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
            this.props.dispatch(setModal(1))
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
