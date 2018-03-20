import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {
    CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX,
    getRestaurantIdFromPathname,
    getRouteCustomerOrders, getRouteRestaurantOrders, getRouteCourierOrders
} from '../../Routes'
import {getStepInfoPopupMessage} from '../../data/Steps'
import Modal from '../modal/Modal'

import {setStepInfo} from '../../state/Actions'

import './FooterController.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.lastFreeModeRoutes = {
            [CUSTOMER_PREFIX]: null,
            [RESTAURANT_PREFIX]: null,
            [COURIER_PREFIX]: null
        }

        this.state = {
            type: this.getType(this.props.location.pathname),
            task: this.getTask()
        }

        this.onRestart = this.onRestart.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onLoadFreeModeView = this.onLoadFreeModeView.bind(this)
    }

    getType(pathname) {
        return _.find([
                CUSTOMER_PREFIX,
                RESTAURANT_PREFIX,
                COURIER_PREFIX
            ], route => pathname.indexOf(route) !== -1) || null
    }

    getTask(props) {
        return {
            1: 'As a customer, choose a sector by typing an address.',
            2: 'As a customer, choose a restaurant.',
            3: 'As a customer, choose your order in the selected restaurant and then, validate your order.',
            4: 'As a customer, proceed to the payment of your order.',
            5: 'As a restaurant, select a waiting order and accept it.',
            6: 'As a restaurant, notify that the order is now ready to be delivered.',
            7: 'As a courier, select a waiting order and accept it.',
            8: 'As a courier, notify that the order is now picked and on its way to be delivered.',
            9: 'As a courier, notify that the order is now delivered.',
            10: 'As a customer, a restaurant or a courier, keep do whatever you want!'
        }[(props || this.props).step]
    }

    onRestart() {
        this.props.history.replace('/')
    }

    closeModal() {
        this.props.dispatch(setStepInfo(null))
    }

    onLoadFreeModeView(event) {
        const {pathname} = this.props.location

        const nextType = this.getType(event.target.className)

        this.lastFreeModeRoutes[this.state.type] = pathname

        let routeToRedirect
        if (nextType === CUSTOMER_PREFIX) {
            routeToRedirect = this.lastFreeModeRoutes[CUSTOMER_PREFIX] || getRouteCustomerOrders()
        }
        else if (nextType === RESTAURANT_PREFIX) {
            let restaurantId
            if (this.lastFreeModeRoutes[RESTAURANT_PREFIX]) {
                restaurantId = getRestaurantIdFromPathname(this.lastFreeModeRoutes[RESTAURANT_PREFIX])
            }
            else {
                restaurantId = this.props.orders[0].details.restaurantId
            }

            routeToRedirect = this.lastFreeModeRoutes[RESTAURANT_PREFIX] || getRouteRestaurantOrders(restaurantId)
        }
        else if (nextType === COURIER_PREFIX){
            routeToRedirect = this.lastFreeModeRoutes[COURIER_PREFIX] || getRouteCourierOrders()
        }

        this.props.history.replace(routeToRedirect)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const type = this.getType(nextProps.location.pathname)

            type && this.setState({type})
        }
        else if (nextProps.step !== this.props.step) {
            const task = this.getTask(nextProps)

            task && this.setState({task})
        }
    }

    render() {
        const {location, step, stepInfo} = this.props
        const {type, task} = this.state
        
        let firstBtn = false
        const getStep = (minStep, icon = null, btn = false) => {
            const isCompleted = step >= minStep
            const isActiveBtn = btn && isCompleted
            const isActiveBtnSelected = type === icon

            const className = _.compact([
                isCompleted && 'completed',
                icon ? `icon ${icon}` : 'step',
                btn && 'btn',
                !firstBtn && 'sep',
                isActiveBtn && 'enable',
                isActiveBtn && isActiveBtnSelected && 'active'
            ]).join(' ')
            btn && (firstBtn = true)

            const isActiveBtnClickable = isActiveBtn && !isActiveBtnSelected

            return (
                <div className={className} onClick={isActiveBtnClickable ? this.onLoadFreeModeView : null}>
                    {!icon ? minStep : null}
                </div>
            )
        }

        return (
            <div id="bf-demo-footer" className={location.pathname !== '/' ? 'visible' : ''}>
                <button className="restart" onClick={this.onRestart}><i className="fas fa-undo-alt"/>Restart</button>
                <div className="progress">
                    <div className="task">
                        <div><span>{step}.</span> {task}</div>
                    </div>
                    <div className="breadcrumb">
                        {getStep(1, CUSTOMER_PREFIX)}
                        {getStep(1)}
                        {getStep(2)}
                        {getStep(3)}
                        {getStep(4)}
                        {getStep(5, RESTAURANT_PREFIX)}
                        {getStep(5)}
                        {getStep(6)}
                        {getStep(7, COURIER_PREFIX)}
                        {getStep(7)}
                        {getStep(8)}
                        {getStep(9)}
                        {getStep(10, CUSTOMER_PREFIX, true)}
                        {getStep(10, RESTAURANT_PREFIX, true)}
                        {getStep(10, COURIER_PREFIX, true)}
                    </div>
                </div>
                <div>
                    <a href="http://blockfood.io" target="_blank" rel="noopener noreferrer">Visit blockfood.io</a>
                </div>
                {stepInfo && (
                    <Modal onImmediateClose={stepInfo.onClose} onClose={this.closeModal}>
                        {getStepInfoPopupMessage(stepInfo.id)}
                    </Modal>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        stepInfo: state.stepInfo,
        orders: state.orders
    }
}

export default connect(mapStateToProps)(Footer)
