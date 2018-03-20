import * as _ from 'lodash'
import Storage from '../utils/Storage'

import {
    RESTART,
    SET_STEP,
    SET_STEP_INFO,
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

const reduceStepInfoPopup = (state, action) => {
    const newModal = action.id ? {
        id: action.id,
        onClose: action.onClose
    } : null
    const newState = {}
    _.assign(newState, state, {stepInfo: newModal})
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
    const newState = {}
    _.assign(newState, state, {orders: action.orders})
    return newState
}

const DEFAULT_STATE = {
    step: 0,
    stepInfo: null,
    customerAddress: '',
    orderInProgress: null,
    orders: []
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
        case SET_STEP_INFO:
            return reduceStepInfoPopup(state, action)
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