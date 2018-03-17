export const RESTART = 'RESTART'
export const SET_STEP = 'SET_STEP'
export const SET_CUSTOMER_ADDRESS = 'SET_CUSTOMER_ADDRESS'
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'

export const setStep = (step, allowBack = false) => ({type: SET_STEP, step, allowBack})

export const restart = () => ({type: RESTART})

export const setCustomerAddress = (customerAddress) => ({type: SET_CUSTOMER_ADDRESS, customerAddress})

export const setCurrentOrder = (currentOrder) => ({type: SET_CURRENT_ORDER, currentOrder})