import * as _ from 'lodash'
import Storage from '../utils/Storage'

import {
    RESTART,
    SET_STEP,
    SET_MODAL,
    SET_CUSTOMER_ADDRESS,
    SET_CURRENT_ORDER,
    SET_RESTAURANT_ORDERS
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

const reduceCurrentOrder = (state, action) => {
    Storage.setCurrentOrder(action.currentOrder)
    const newState = {}
    _.assign(newState, state, {currentOrder: action.currentOrder})
    return newState
}

const reduceRestaurantOrders = (state, action) => {
    const newState = {}
    _.assign(newState, state, {restaurantOrders: action.restaurantOrders})
    return newState
}

const DEFAULT_STATE = {
    step: 0,
    modal: null,
    customerAddress: '',
    currentOrder: null,
    restaurantOrders: []
}

const INITIAL_STATE = {}
_.assign(INITIAL_STATE, DEFAULT_STATE, {
    customerAddress: Storage.getCurrentAddress() || '',
    currentOrder: Storage.getCurrentOrder() || null
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
        case SET_CURRENT_ORDER:
            return reduceCurrentOrder(state, action)
        case SET_RESTAURANT_ORDERS:
            return reduceRestaurantOrders(state, action)
        default:
            return state
    }
}