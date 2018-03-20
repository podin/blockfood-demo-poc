import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {
    CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX,
    getDemoIdFromPathname, getRestaurantIdFromPathname, getRouteCustomerOrders,
    getRouteRestaurantOrders
} from '../../Routes'
import RESTAURANTS from '../../data/Restaurants'

import './Header.scss'

const RESTAURANTS_SELECT_VALUE = _.map(RESTAURANTS, restaurant => ({value: restaurant.id, label: restaurant.name}))

class Header extends React.Component {
    constructor(props) {
        super(props)

        const {type, user} = this.getTypeAndUser()

        this.state = {
            type,
            user
        }

        this.onViewCustomerOrders = this.onViewCustomerOrders.bind(this)
        this.onRestaurantChange = this.onRestaurantChange.bind(this)
    }

    getTypeAndUser(props) {
        const type = _.find([
                CUSTOMER_PREFIX,
                RESTAURANT_PREFIX,
                COURIER_PREFIX
            ], route => (props || this.props).location.pathname.indexOf(route) !== -1) || null

        const user = {
            [CUSTOMER_PREFIX]: 'a hungry customer',
            [RESTAURANT_PREFIX]: 'a passionate chef',
            [COURIER_PREFIX]: 'a motivated courier'
        }[type]

        return {type, user}
    }

    onViewCustomerOrders() {
        const demoId = getDemoIdFromPathname(this.props.location.pathname)
        this.props.history.replace(getRouteCustomerOrders(demoId))
    }

    onRestaurantChange({value: restaurantId}) {
        const demoId = getDemoIdFromPathname(this.props.location.pathname)

        this.props.history.replace(getRouteRestaurantOrders(demoId, restaurantId))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const {type, user} = this.getTypeAndUser(nextProps)

            type && this.setState({type, user})
        }
    }

    render() {
        const {location, step} = this.props
        const {type, user} = this.state

        const rawType = type && type.split('-')[0]

        const restaurantId = getRestaurantIdFromPathname(location.pathname)

        return (
            <header id="bf-demo-header" className={location.pathname !== '/' ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={rawType}/>
                        <div>Block<span>Food</span><span>/{rawType}</span></div>
                    </div>
                </div>
                <div className="user">
                    {type === CUSTOMER_PREFIX && step === 10 && (
                        <div className="btn" onClick={this.onViewCustomerOrders}>
                            <i className="fas fa-sticky-note"/>View orders
                        </div>
                    )}
                    {type === RESTAURANT_PREFIX && step === 10 && (
                        <div className="select">
                            <i className="fas fa-home"/>
                            <Select
                                name="form-field-name"
                                value={restaurantId}
                                onChange={this.onRestaurantChange}
                                options={RESTAURANTS_SELECT_VALUE}
                                clearable={false} searchable={false}/>
                        </div>
                    )}
                    <div className="username"><i className="fas fa-user"/> Welcome to <span>{user}</span></div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step
    }
}

export default connect(mapStateToProps)(Header)