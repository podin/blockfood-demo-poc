import * as _ from 'lodash'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import RESTAURANTS from '../../data/Restaurants'
import {CUSTOMER_ADDRESS_ROUTE, CUSTOMER_RESTAURANTS_ROUTE} from '../../Routes'

import {setStep} from '../../state/Actions'

import './CustomerRestaurantMenu.scss'

class CustomerRestaurantMenu extends React.Component {
    constructor(props) {
        super(props)

        this.restaurant = _.find(RESTAURANTS, ({id}) => id === this.props.match.params.restaurantId)

        this.state = {
            orderIds: [],
            price: 0
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onChoose = this.onChoose.bind(this)
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        this.props.history.push(`/${demoId}/${CUSTOMER_RESTAURANTS_ROUTE}`)
    }

    onChoose(event) {
        const {orderIds} = this.state

        let target = event.target, menuId
        while (!menuId) {
            menuId = target.getAttribute('data-id')
            if (!menuId) {
                target = target.parentElement
            }
        }

        let newOrderIds
        if (orderIds.includes(menuId)) {
            newOrderIds = _.without(orderIds, menuId)
        }
        else {
            newOrderIds = [...orderIds, menuId]
        }

        const newPrice = _.reduce(this.restaurant.menu, (total, menu) => {
            if (newOrderIds.includes(menu.id)) {
                total += menu.price
            }

            return total
        }, 0)

        this.setState({orderIds: newOrderIds, price: newPrice})
    }

    componentDidMount() {
        this.props.dispatch(setStep(3))
    }

    render() {
        if (!this.restaurant) {
            const {demoId} = this.props.match.params
            return <Redirect to={`/${demoId}/${CUSTOMER_ADDRESS_ROUTE}`}/>
        }
        else {
            const {orderIds, price} = this.state

            return (
                <div id="bf-demo-customer-restaurant-menu" className="view">
                    <div>
                        <h1>
                            <div onClick={this.onGoBack}><i className="fas fa-arrow-left"/></div>
                            <div className="label">{this.restaurant.name}</div>
                        </h1>
                        <div className="list">
                            {this.restaurant.menu.map(menu => (
                                <div key={menu.id} data-id={menu.id}
                                     className={`item${orderIds.includes(menu.id) ? ' selected' : ''}`}
                                     onClick={this.onChoose}>
                                    <i className="fas fa-check"/>
                                    <div className="name">{menu.name} ({menu.price}$)</div>
                                </div>
                            ))}
                        </div>
                        <div className="validate">
                            <div>{price}$</div>
                            <button>VALIDATE</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect()(CustomerRestaurantMenu)
