import * as _ from 'lodash';
import React from 'react';
import {CUSTOMER_ROUTES, RESTAURANT_ROUTES, COURIER_ROUTES} from '../../Routes'

import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: this.getType()
        }
    }

    getType(props) {
        return _.find([
                CUSTOMER_ROUTES,
                RESTAURANT_ROUTES,
                COURIER_ROUTES
            ], route => (props || this.props).location.pathname.indexOf(route) !== -1) || null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.pathname) {
            const nextType = this.getType(nextProps)

            nextType && this.setState({type: nextType})
        }
    }

    render() {
        const {location} = this.props
        const {type} = this.state

        return (
            <header id="bf-demo-header" className={location.pathname !== '/' ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={type}/>
                        <div>Block<span>Food</span><span>/{type}</span></div>
                    </div>
                </div>

                <div className="user">
                    <i className="fas fa-user"/> Welcome <span>John/Jane Doe</span>
                </div>
            </header>
        )
    }
}

export default Header