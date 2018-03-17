import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerOrder, getRouteRestaurantOrders} from '../../../Routes'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setModal} from '../../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component {
    constructor(props) {
        super(props)

        this.demoId = this.props.match.params.demoId

        this.state = {
            submitted: false,
            success: false
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onGoBack() {
        if (!this.state.submitted) {
            const {restaurantId} = this.props.currentOrder
            this.props.history.replace(getRouteCustomerOrder(this.demoId, restaurantId))
        }
    }

    onSubmit() {
        if (!this.state.submitted) {
            const onSuccess = () => {
                this.setState({success: true})

                const onModalClose = () => {
                    this.props.dispatch(setStep(5))
                    this.props.history.replace(getRouteRestaurantOrders(this.demoId))
                }

                setTimeout(() => this.props.dispatch(setModal(2, onModalClose)), 500)
            }

            this.setState({submitted: true})
            doWithMinTime(() => Api.createNewOrder(this.demoId, this.props.currentOrder)).then(onSuccess)
        }
    }

    render() {
        const {submitted, success} = this.state

        return (
            <div id="bf-demo-customer-payment" className="view">
                <div>
                    <div className={`go-back${submitted ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Proceed to the payment of your order</div>
                    </div>
                    <div className={`btn${submitted ? ' submitted' : ''}`} onClick={this.onSubmit}>
                        {success ? (
                            <i className="fas fa-check"/>
                        ) : submitted ? (
                            <i className="fas fa-circle-notch fa-spin"/>
                        ) : (
                            <i className="fas fa-dollar-sign"/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentOrder: state.currentOrder
    }
}

export default connect(mapStateToProps)(CustomerPayment)
