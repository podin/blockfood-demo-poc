import {SET_STEP, SET_CUSTOMER_ADDRESS} from './Actions'

const reduceStep = (state, action) => {
    if (action.step > state.step) {
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

const DEFAULT_STATE = {
    step: 1,
    customerAddress: ''
}

export const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_STEP:
            return reduceStep(state, action)
        case SET_CUSTOMER_ADDRESS:
            return reduceCustomerAddress(state, action)
        default:
            return state
    }
}