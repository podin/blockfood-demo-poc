import * as _ from 'lodash'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {CUSTOMER_ADDRESS_ROUTE} from '../../Routes'
import RESTAURANTS from '../../data/Restaurants'

import {setStep} from '../../state/Actions'

import './CustomerRestaurants.scss'

class CustomerRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        this.props.history.push(`/${demoId}/${CUSTOMER_ADDRESS_ROUTE}`)
    }

    componentDidMount() {
        this.props.dispatch(setStep(2))
    }

    render() {
        const {customerAddress} = this.props

        if (!customerAddress) {
            const {demoId} = this.props.match.params
            return <Redirect to={`/${demoId}/${CUSTOMER_ADDRESS_ROUTE}`}/>
        }
        else {
            return (
                <div id="bf-demo-customer-restaurants" className="view">
                    <div>
                        <h1>
                            <div onClick={this.onGoBack}><i className="fas fa-arrow-left"/></div>
                            <div className="label">{RESTAURANTS.length} restaurants found at: <span>{customerAddress}</span></div>
                        </h1>
                        <div className="list">
                            {RESTAURANTS.map(restaurant => (
                                <div key={restaurant.id} className="item">
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
        customerAddress: state.customerAddress || '5 Marble Street'
    }
}

export default connect(mapStateToProps)(CustomerRestaurants)
