import * as _ from 'lodash'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRouteCustomerAddress, getRouteCustomerOrder} from '../../../Routes'
import RESTAURANTS from '../../../data/Restaurants'

import {setStep} from '../../../state/Actions'

import './CustomerRestaurants.scss'

class CustomerRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.demoId = this.props.match.params.demoId

        this.onGoBack = this.onGoBack.bind(this)
        this.onChoose = this.onChoose.bind(this)
    }

    onGoBack() {
        this.props.history.push(getRouteCustomerAddress(this.demoId))
    }

    onChoose(event) {
        let target = event.target, restaurantId
        while (!restaurantId) {
            restaurantId = target.getAttribute('data-id')
            if (!restaurantId) {
                target = target.parentElement
            }
        }

        this.props.history.push(getRouteCustomerOrder(this.demoId, restaurantId))
    }

    componentDidMount() {
        this.props.customerAddress && this.props.dispatch(setStep(2))
    }

    render() {
        const {customerAddress} = this.props

        if (!customerAddress) {
            return <Redirect to={getRouteCustomerAddress(this.demoId)}/>
        }
        else {
            return (
                <div id="bf-demo-customer-restaurants" className="view">
                    <div>
                        <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                        <div className="view-title">
                            <div className="label">{RESTAURANTS.length} restaurants found at: <span>{customerAddress}</span></div>
                        </div>
                        <div className="list">
                            {RESTAURANTS.map(restaurant => (
                                <div key={restaurant.id} className="item" data-id={restaurant.id} onClick={this.onChoose}>
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
}

const mapStateToProps = (state) => {
    return {
        customerAddress: state.customerAddress
    }
}

export default connect(mapStateToProps)(CustomerRestaurants)
