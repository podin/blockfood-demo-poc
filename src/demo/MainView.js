import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom'
import Api from './api/Api'
import Loader from './components/loader/Loader'
import StartView from './views/start-view/StartView'
import CustomerRestaurants from './views/customer-views/CustomerRestaurants'
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
                    <Switch>
                        <Route path="/" exact component={StartView}/>
                        <Route path="/:demoId/customer-restaurants/" exact component={CustomerRestaurants}/>
                        <Redirect to="/"/>
                    </Switch>
                    <Route path="/" render={ ( props ) => ( props.location.pathname !== '/') && <FooterController/> }/>
                    <Loader/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(MainView)
