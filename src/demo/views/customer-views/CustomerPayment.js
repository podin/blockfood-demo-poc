import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {CUSTOMER_ADDRESS_ROUTE, CUSTOMER_RESTAURANT_MENU_ROUTE} from '../../Routes'

import {setStep} from '../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component {
    constructor(props) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        const {restaurantId} = this.props.currentOrder
        this.props.history.push(`/${demoId}/${CUSTOMER_RESTAURANT_MENU_ROUTE + restaurantId}/`)
    }

    componentDidMount() {
        this.props.currentOrder && this.props.dispatch(setStep(4))
    }

    render() {
        const {currentOrder} = this.props

        if (!currentOrder) {
            const {demoId} = this.props.match.params
            return <Redirect to={`/${demoId}/${CUSTOMER_ADDRESS_ROUTE}`}/>
        }
        else {
            return (
                <div id="bf-demo-customer-payment" className="view">
                    <div>
                        <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                        <div className="view-title">
                            <div className="label">Proceed to the payment of your command</div>
                        </div>
                        <div className="btn"><i className="fas fa-dollar-sign"/></div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentOrder: state.currentOrder
    }
}

export default connect(mapStateToProps)(CustomerPayment)
