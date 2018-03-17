import * as _ from 'lodash'
import React from 'react'
import {withRouter, matchPath, Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Api from './api/Api'
import {
    CUSTOMER_ADDRESS_ROUTE,
    CUSTOMER_RESTAURANTS_ROUTE,
    CUSTOMER_RESTAURANT_ORDER_ROUTE,
    CUSTOMER_PAYMENT_ROUTE,
    RESTAURANT_ORDERS_ROUTE,
    RESTAURANT_ORDER_ROUTE
} from './Routes'
import Loader from './components/loader/Loader'
import Header from './components/header/Header'
import ViewValidator from './ViewValidator'
import StartView from './views/start-view/StartView'
import CustomerAddress from './views/customer-views/customer-address/CustomerAddress'
import CustomerRestaurants from './views/customer-views/customer-restaurants/CustomerRestaurants'
import CustomerOrder from './views/customer-views/customer-order/CustomerOrder'
import CustomerPayment from './views/customer-views/customer-payment/CustomerPayment'
import RestaurantOrders from './views/restaurant-views/restaurant-orders/RestaurantOrders'
import RestaurantOrder from './views/restaurant-views/restaurant-order/RestaurantOrder'
import FooterController from './components/footer-controller/FooterController'

import {setStep, setRestaurantOrders} from './state/Actions'

import './MainView.scss'

class MainView extends React.Component {
    constructor(props) {
        super(props)

        Api.init(this.onError.bind(this))

        this.state = {
            error: false,
            ready: false
        }

        this.onRestart = this.onRestart.bind(this)
    }

    getRouteMatch(path) {
        return matchPath(this.props.location.pathname, {path, exact: true})
    }

    onError() {
        this.setState({error: true})
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    componentDidMount() {
        const {pathname} = this.props.location

        if (pathname !== '/') {
            const demoId = pathname.split('/')[1]

            Api.getStep(demoId)
                .then(step => {
                    if (step >= 5 && step <= 6) {
                        const routes = [
                            RESTAURANT_ORDERS_ROUTE,
                            RESTAURANT_ORDER_ROUTE
                        ]
                        const routeIndex = _.findIndex(routes, route => this.getRouteMatch(route))

                        this.props.dispatch(setStep(step))
                        
                        const {restaurantId} = this.getRouteMatch(routes[routeIndex]).params

                        return Api.getRestaurantOrders(demoId, restaurantId)
                            .then(restaurantOrders => {
                                this.props.dispatch(setRestaurantOrders(restaurantOrders))
                                this.setState({ready: true})
                            })
                    }
                    else {
                        const routeIndex = _.findIndex([
                            CUSTOMER_ADDRESS_ROUTE,
                            CUSTOMER_RESTAURANTS_ROUTE,
                            CUSTOMER_RESTAURANT_ORDER_ROUTE,
                            CUSTOMER_PAYMENT_ROUTE
                        ], route => this.getRouteMatch(route))

                        this.props.dispatch(setStep(routeIndex + 1))
                        this.setState({ready: true})
                    }
                })
                .catch(() => {
                    this.props.history.replace('/')
                    this.setState({ready: true})
                })

        }
        else {
            this.setState({ready: true})
        }
    }

    render() {
        const {error, ready} = this.state

        if (error) {
            return (
                <div id="bf-demo-error">
                    <p>Error... Please restart the demo...</p>
                    <button onClick={this.onRestart}>Restart demo</button>
                </div>
            )
        }
        else {
            return (
                <React.Fragment>
                    {ready && (
                        <ViewValidator>
                            <Route path="/" component={Header}/>
                            <Switch>
                                <Route path="/" exact component={StartView}/>
                                <Route path={CUSTOMER_ADDRESS_ROUTE} exact component={CustomerAddress}/>
                                <Route path={CUSTOMER_RESTAURANTS_ROUTE} exact component={CustomerRestaurants}/>
                                <Route path={CUSTOMER_RESTAURANT_ORDER_ROUTE} exact component={CustomerOrder}/>
                                <Route path={CUSTOMER_PAYMENT_ROUTE} exact component={CustomerPayment}/>
                                <Route path={RESTAURANT_ORDERS_ROUTE} exact component={RestaurantOrders}/>
                                <Route path={RESTAURANT_ORDER_ROUTE} exact component={RestaurantOrder}/>
                                <Redirect to="/"/>
                            </Switch>
                            <Route path="/" component={FooterController}/>
                        </ViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(connect()(MainView))
