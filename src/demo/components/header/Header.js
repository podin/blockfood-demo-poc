import * as _ from 'lodash';
import React from 'react';
import {CUSTOMER_ROUTES, RESTAURANT_ROUTES, COURIER_ROUTES} from '../../Routes'

import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props)

        const {type, user} = this.getTypeAndUser()

        this.state = {
            type,
            user
        }
    }

    getTypeAndUser(props) {
        const type = _.find([
                CUSTOMER_ROUTES,
                RESTAURANT_ROUTES,
                COURIER_ROUTES
            ], route => (props || this.props).location.pathname.indexOf(route) !== -1) || null

        const user = {
            [CUSTOMER_ROUTES]: 'a hungry customer',
            [RESTAURANT_ROUTES]: 'a passionate chef',
            [COURIER_ROUTES]: 'a motivated courier'
        }[type]

        return {type, user}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.pathname) {
            const {type, user} = this.getTypeAndUser(nextProps)

            type && this.setState({type, user})
        }
    }

    render() {
        const {location} = this.props
        const {type, user} = this.state

        return (
            <header id="bf-demo-header" className={location.pathname !== '/' ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={type}/>
                        <div>Block<span>Food</span><span>/{type}</span></div>
                    </div>
                </div>

                <div className="user">
                    <i className="fas fa-user"/> Welcome to <span>{user}</span>
                </div>
            </header>
        )
    }
}

export default Header