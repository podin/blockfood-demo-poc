import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom'
import Api from './api/Api'
import {
    CUSTOMER_ADDRESS_ROUTE,
    CUSTOMER_RESTAURANTS_ROUTE,
    CUSTOMER_RESTAURANT_MENU_ROUTE
} from './Routes'
import Loader from './components/loader/Loader'
import Header from './components/header/Header'
import StartView from './views/start-view/StartView'
import CustomerAddress from './views/customer-views/CustomerAddress'
import CustomerRestaurants from './views/customer-views/CustomerRestaurants'
import CustomerRestaurantMenu from './views/customer-views/CustomerRestaurantMenu'
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
                        <Route path={`/:demoId/${CUSTOMER_ADDRESS_ROUTE}`} exact component={CustomerAddress}/>
                        <Route path={`/:demoId/${CUSTOMER_RESTAURANTS_ROUTE}`} exact component={CustomerRestaurants}/>
                        <Route path={`/:demoId/${CUSTOMER_RESTAURANT_MENU_ROUTE}:restaurantId/`} exact component={CustomerRestaurantMenu}/>
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
