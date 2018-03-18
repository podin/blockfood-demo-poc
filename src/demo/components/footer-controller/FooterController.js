import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {
    CUSTOMER_ROUTES, RESTAURANT_ROUTES, COURIER_ROUTES,
    getRouteCustomerAddress, getRouteRestaurantOrders, getRouteCourierOrders,
    getDemoIdFromPathname, getRestaurantIdFromPathname
} from '../../Routes'
import Api from '../../api/Api'
import Modal from '../modal/Modal'
import doWithMinTime from '../../utils/DoWithMinTime'

import {setModal, setOrders} from '../../state/Actions'

import './FooterController.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.lastFreeModeRoutes = {
            [CUSTOMER_ROUTES]: null,
            [RESTAURANT_ROUTES]: null,
            [COURIER_ROUTES]: null
        }

        this.state = {
            type: this.getType(this.props.location.pathname),
            task: this.getTask(),
            loadingFreeModeView: null
        }

        this.onRestart = this.onRestart.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onLoadFreeModeView = this.onLoadFreeModeView.bind(this)
        this.onModalFreeModeLoadInitialized = this.onModalFreeModeLoadInitialized.bind(this)
        this.onModalFreeModeClose = this.onModalFreeModeClose.bind(this)
    }

    getType(pathname) {
        return _.find([
                CUSTOMER_ROUTES,
                RESTAURANT_ROUTES,
                COURIER_ROUTES
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
        this.props.dispatch(setModal(null))
    }

    onLoadFreeModeView(event) {
        const {pathname} = this.props.location
        const demoId = getDemoIdFromPathname(pathname)

        const nextType = this.getType(event.target.className)

        this.lastFreeModeRoutes[this.state.type] = pathname

        let getOrders, routeToRedirect
        if (nextType === CUSTOMER_ROUTES) {
            getOrders = () => Api.getOrders(demoId)
            routeToRedirect = this.lastFreeModeRoutes[CUSTOMER_ROUTES] || getRouteCustomerAddress(demoId)
        }
        else if (nextType === RESTAURANT_ROUTES) {
            let restaurantId
            if (this.lastFreeModeRoutes[RESTAURANT_ROUTES]) {
                restaurantId = getRestaurantIdFromPathname(this.lastFreeModeRoutes[RESTAURANT_ROUTES])
            }
            else {
                restaurantId = this.props.orders[0].details.restaurantId
            }

            getOrders = () => Api.getOrdersForRestaurant(demoId, restaurantId)
            routeToRedirect = this.lastFreeModeRoutes[RESTAURANT_ROUTES] || getRouteRestaurantOrders(demoId, restaurantId)
        }
        else if (nextType === COURIER_ROUTES){
            getOrders = () => Api.getOrdersForCourier(demoId)
            routeToRedirect = this.lastFreeModeRoutes[COURIER_ROUTES] || getRouteCourierOrders(demoId)
        }

        this.setState({loadingFreeModeView: nextType})
        doWithMinTime(() => getOrders()).then((orders) => {
            this.props.dispatch(setOrders(orders))
            this.props.history.replace(routeToRedirect)
            this.loadingFreeModeViewModalRef.close()
        })
    }

    onModalFreeModeLoadInitialized(ref) {
        this.loadingFreeModeViewModalRef = ref
    }

    onModalFreeModeClose() {
        this.setState({loadingFreeModeView: null})
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
        const {location, step, modal} = this.props
        const {type, task, loadingFreeModeView} = this.state

        // http://localhost:3000/4d62ae00-2ab5-11e8-b84f-e1ebcffe5fc4/courier-view/order/50823d80-2ab5-11e8-b84f-e1ebcffe5fc4

        let firstBtn = false
        const getStep = (minStep, icon = null, btn = false) => {
            const isCompleted = step >= minStep
            const isActiveBtn = btn && isCompleted
            const isActiveBtnSelected = loadingFreeModeView ? loadingFreeModeView === icon : type === icon

            const className = _.compact([
                isCompleted && 'completed',
                icon ? `icon ${icon}` : 'step',
                btn && 'btn',
                !firstBtn && 'sep',
                isActiveBtn && 'enable',
                isActiveBtn && isActiveBtnSelected && 'active'
            ]).join(' ')
            btn && (firstBtn = true)

            const isActiveBtnClickable = isActiveBtn && !isActiveBtnSelected && !loadingFreeModeView

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
                        {getStep(1, CUSTOMER_ROUTES)}
                        {getStep(1)}
                        {getStep(2)}
                        {getStep(3)}
                        {getStep(4)}
                        {getStep(5, RESTAURANT_ROUTES)}
                        {getStep(5)}
                        {getStep(6)}
                        {getStep(7, COURIER_ROUTES)}
                        {getStep(7)}
                        {getStep(8)}
                        {getStep(9)}
                        {getStep(10, CUSTOMER_ROUTES, true)}
                        {getStep(10, RESTAURANT_ROUTES, true)}
                        {getStep(10, COURIER_ROUTES, true)}
                    </div>
                </div>
                <div>
                    <a href="http://blockfood.io" target="_blank" rel="noopener noreferrer">Visit blockfood.io</a>
                </div>
                {modal && (
                    <Modal onImmediateClose={modal.onModalClose} onClose={this.closeModal}>
                        {modal.id === 1 ? (
                            <React.Fragment>
                                <h1>Welcome to the demo of BlockFood</h1>
                                <p>Play the role of a customer, a restaurant and a courier!</p>
                                <p>Look at the bottom of your screen to see what you have to do next.</p>
                                <h3>Start right now as a hungry customer!</h3>
                            </React.Fragment>
                        ) : modal.id === 2 ? (
                            <React.Fragment>
                                <h1>Your order is now created!</h1>
                                <p>It's time to become a restaurant in order to accept and prepare this order.</p>
                                <h3>Let's go! Chef!</h3>
                            </React.Fragment>
                        ) : modal.id === 3 ? (
                            <React.Fragment>
                                <h1>Your order is now cooked and ready!</h1>
                                <p>You are going to become another player once again: a courier.</p>
                                <h3>Don't wait any longer!</h3>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h1>The demo is finished!</h1>
                                <p>You are now free to play each role like you want.</p>
                                <h3>Use the buttons in the bottom of your screen to switch.</h3>
                            </React.Fragment>
                        )}
                    </Modal>
                )}
                {loadingFreeModeView && (
                    <Modal ref={this.onModalFreeModeLoadInitialized} noButton onClose={this.onModalFreeModeClose}>
                        <h1 className="centered">Loading...</h1>
                    </Modal>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        modal: state.modal,
        orders: state.orders
    }
}

export default connect(mapStateToProps)(Footer)
