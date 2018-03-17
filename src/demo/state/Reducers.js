import {RESTART, SET_STEP, SET_CUSTOMER_ADDRESS, SET_CURRENT_ORDER} from './Actions'

const reduceStep = (state, action) => {
    if (action.allowBack || action.step > state.step) {
        const newState = {}
        Object.assign(newState, state, {step: action.step})
        return newState
    }
    else {
        return state
    }
}

const reduceCustomerAddress = (state, action) => {
    const newState = {}
    Object.assign(newState, state, {customerAddress: action.customerAddress})
    return newState
}

const reduceCurrentOrder = (state, action) => {
    const newState = {}
    Object.assign(newState, state, {currentOrder: action.currentOrder})
    return newState
}

const DEFAULT_STATE = {
    step: 1,
    customerAddress: '',
    currentOrder: null
}

export const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case RESTART:
            return DEFAULT_STATE
        case SET_STEP:
            return reduceStep(state, action)
        case SET_CUSTOMER_ADDRESS:
            return reduceCustomerAddress(state, action)
        case SET_CURRENT_ORDER:
            return reduceCurrentOrder(state, action)
        default:
            return state
    }
}