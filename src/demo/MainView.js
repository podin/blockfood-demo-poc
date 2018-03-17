import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom'
import Api from './api/Api'
import {
    CUSTOMER_ADDRESS_ROUTE,
    CUSTOMER_RESTAURANTS_ROUTE,
    CUSTOMER_RESTAURANT_ORDER_ROUTE,
    CUSTOMER_PAYMENT_ROUTE
} from './Routes'
import Loader from './components/loader/Loader'
import Header from './components/header/Header'
import StartView from './views/start-view/StartView'
import CustomerAddress from './views/customer-views/customer-address/CustomerAddress'
import CustomerRestaurants from './views/customer-views/customer-restaurants/CustomerRestaurants'
import CustomerOrder from './views/customer-views/customer-order/CustomerOrder'
import CustomerPayment from './views/customer-views/customer-payment/CustomerPayment'
import FooterController from './components/footer-controller/FooterController'

import './MainView.scss'

class MainView extends React.Component {
    constructor(props) {
        super(props)

        Api.init(this.onError.bind(this))

        this.state = {
            error: false
        }

        this.onRestart = this.onRestart.bind(this)
    }

    onError() {
        this.setState({error: true})
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    render() {
        const {error} = this.state

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
                    <Route path="/" component={Header}/>
                    <Switch>
                        <Route path="/" exact component={StartView}/>
                        <Route path={CUSTOMER_ADDRESS_ROUTE} exact component={CustomerAddress}/>
                        <Route path={CUSTOMER_RESTAURANTS_ROUTE} exact component={CustomerRestaurants}/>
                        <Route path={CUSTOMER_RESTAURANT_ORDER_ROUTE} exact component={CustomerOrder}/>
                        <Route path={CUSTOMER_PAYMENT_ROUTE} exact component={CustomerPayment}/>
                        <Redirect to="/"/>
                    </Switch>
                    <Route path="/" component={FooterController}/>
                    <Loader/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(MainView)
