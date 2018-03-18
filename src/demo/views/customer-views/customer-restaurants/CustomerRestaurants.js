import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerAddress, getRouteCustomerOrderInProgress} from '../../../Routes'
import RESTAURANTS from '../../../data/Restaurants'

import {setStep, setOrderInProgress} from '../../../state/Actions'

import './CustomerRestaurants.scss'

class CustomerRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        this.props.history.replace(getRouteCustomerAddress(demoId))
    }

    onSubmit(event) {
        const {demoId} = this.props.match.params
        const {orderInProgress} = this.props

        let target = event.target, restaurantId
        while (!restaurantId) {
            restaurantId = target.getAttribute('data-id')
            if (!restaurantId) {
                target = target.parentElement
            }
        }

        this.props.dispatch(setStep(3))
        if (orderInProgress && orderInProgress.restaurantId !== restaurantId) {
            this.props.dispatch(setOrderInProgress(null))
        }
        this.props.history.replace(getRouteCustomerOrderInProgress(demoId, restaurantId))
    }

    render() {
        const {customerAddress} = this.props

        return (
            <div id="bf-demo-customer-restaurants" className="view">
                <div>
                    <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                    <div className="view-title">
                        {customerAddress ? (
                            <div className="label">
                                {RESTAURANTS.length} restaurants found at: <span>{customerAddress}</span>
                            </div>
                        ) : (
                            <div className="label">All restaurants</div>
                        )}
                    </div>
                    <div className="list">
                        {RESTAURANTS.map(restaurant => (
                            <div key={restaurant.id} className="item" data-id={restaurant.id} onClick={this.onSubmit}>
                                <img src={restaurant.image} alt={restaurant.name}/>
                                <div className="name">{restaurant.name}</div>
                                <div className="type">{restaurant.type}</div>
                                <div className="rate">
                                    {_.map(_.range(restaurant.rate), i => (
                                        <div key={i}><i className="fas fa-star"/></div>
                                    ))}
                                    {_.map(_.range(5 - restaurant.rate), i => (
                                        <div key={restaurant.rate + i}><i className="far fa-star"/></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customerAddress: state.customerAddress,
        orderInProgress: state.orderInProgress
    }
}

export default connect(mapStateToProps)(CustomerRestaurants)
