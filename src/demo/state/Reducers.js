import * as _ from 'lodash'
import Storage from '../utils/Storage'
import {CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX} from '../Routes'

import {
    RESTART,
    SET_STEP,
    SET_MODAL,
    SET_CUSTOMER_ADDRESS,
    SET_ORDER_IN_PROGRESS,
    SET_ORDERS
} from './Actions'

const reduceStep = (state, action) => {
    if (action.allowBack || action.step > state.step) {
        const newState = {}
        _.assign(newState, state, {step: action.step})
        return newState
    }
    else {
        return state
    }
}

const reduceModal = (state, action) => {
    const newModal = action.modal ? {
        id: action.modal,
        onModalClose: action.onModalClose
    } : null
    const newState = {}
    _.assign(newState, state, {modal: newModal})
    return newState
}

const reduceCustomerAddress = (state, action) => {
    Storage.setCurrentAddress(action.customerAddress)
    const newState = {}
    _.assign(newState, state, {customerAddress: action.customerAddress})
    return newState
}

const reduceOrderInProgress = (state, action) => {
    Storage.setOrderInProgress(action.orderInProgress)
    const newState = {}
    _.assign(newState, state, {orderInProgress: action.orderInProgress})
    return newState
}

const reduceOrders = (state, action) => {
    const newOrders = {}
    _.assign(newOrders, state.orders, {[action.ordersType]: action.orders})
    const newState = {}
    _.assign(newState, state, {orders: newOrders})
    return newState
}

const DEFAULT_STATE = {
    step: 0,
    modal: null,
    customerAddress: '',
    orderInProgress: null,
    orders: {
        [CUSTOMER_PREFIX]: [],
        [RESTAURANT_PREFIX]: [],
        [COURIER_PREFIX]: []
    }
}

const INITIAL_STATE = {}
_.assign(INITIAL_STATE, DEFAULT_STATE, {
    customerAddress: Storage.getCurrentAddress() || '',
    orderInProgress: Storage.getOrderInProgress() || null
})

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTART:
            Storage.clearAll()
            return DEFAULT_STATE
        case SET_STEP:
            return reduceStep(state, action)
        case SET_MODAL:
            return reduceModal(state, action)
        case SET_CUSTOMER_ADDRESS:
            return reduceCustomerAddress(state, action)
        case SET_ORDER_IN_PROGRESS:
            return reduceOrderInProgress(state, action)
        case SET_ORDERS:
            return reduceOrders(state, action)
        default:
            return state
    }
}