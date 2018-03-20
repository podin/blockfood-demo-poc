import React from 'react'
import {withRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Api from './api/Api'
import Init from './Init'
import * as Routes from './Routes'
import Loader from './components/loader/Loader'
import Header from './components/header/Header'
import ViewValidator from './ViewValidator'
import StartView from './views/start-view/StartView'
import CustomerAddress from './views/customer-views/customer-address/CustomerAddress'
import CustomerRestaurants from './views/customer-views/customer-restaurants/CustomerRestaurants'
import CustomerOrderInProgress from './views/customer-views/customer-order-in-progress/CustomerOrderInProgress'
import CustomerPayment from './views/customer-views/customer-payment/CustomerPayment'
import CustomerOrders from './views/customer-views/customer-orders/CustomerOrders'
import RestaurantOrders from './views/restaurant-views/restaurant-orders/RestaurantOrders'
import RestaurantOrder from './views/restaurant-views/restaurant-order/RestaurantOrder'
import CourierOrders from './views/courier-views/courier-orders/CourierOrders'
import CourierOrder from './views/courier-views/courier-order/CourierOrder'
import FooterController from './components/footer-controller/FooterController'

import {setStep, setOrders} from './state/Actions'

import './MainView.scss'

class MainView extends React.Component {
    constructor(props) {
        super(props)

        const {pathname} = this.props.location
        const demoId = this.demoId = pathname !== '/' ? pathname.split('/')[1] : null

        Api.init(demoId, this.onError.bind(this))

        this.state = {
            error: false,
            ready: false
        }

        this.onRestart = this.onRestart.bind(this)
    }

    onError() {
        this.setState({error: true})
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    componentDidMount() {
        Init(this.demoId, this.props.location.pathname).then(({step, orders, pathname}) => {
            step !== null && this.props.dispatch(setStep(step))
            orders !== null && this.props.dispatch(setOrders(orders))
            pathname !== null && this.props.history.replace(pathname)

            this.setState({ready: true})
        })
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
                                <Route path={Routes.CUSTOMER_ADDRESS_ROUTE} exact component={CustomerAddress}/>
                                <Route path={Routes.CUSTOMER_RESTAURANTS_ROUTE} exact component={CustomerRestaurants}/>
                                <Route path={Routes.CUSTOMER_ORDER_IN_PROGRESS_ROUTE} exact component={CustomerOrderInProgress}/>
                                <Route path={Routes.CUSTOMER_PAYMENT_ROUTE} exact component={CustomerPayment}/>
                                <Route path={Routes.CUSTOMER_ORDERS_ROUTE} exact component={CustomerOrders}/>
                                <Route path={Routes.RESTAURANT_ORDERS_ROUTE} exact component={RestaurantOrders}/>
                                <Route path={Routes.RESTAURANT_ORDER_ROUTE} exact component={RestaurantOrder}/>
                                <Route path={Routes.COURIER_ORDERS_ROUTE} exact component={CourierOrders}/>
                                <Route path={Routes.COURIER_ORDER_ROUTE} exact component={CourierOrder}/>
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
