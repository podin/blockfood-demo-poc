export const SET_STEP = 'SET_STEP'
export const SET_STEP_INFO = 'SET_STEP_INFO'
export const SET_CUSTOMER_ADDRESS = 'SET_CUSTOMER_ADDRESS'
export const SET_ORDER_IN_PROGRESS = 'SET_ORDER_IN_PROGRESS'
export const SET_ORDERS = 'SET_ORDERS'
export const RESTART = 'RESTART'

export const setStep = (step, allowBack = false) => ({type: SET_STEP, step, allowBack})

export const setStepInfo = (id, onClose) => ({type: SET_STEP_INFO, id, onClose})

export const setCustomerAddress = (customerAddress) => ({type: SET_CUSTOMER_ADDRESS, customerAddress})

export const setOrderInProgress = (orderInProgress) => ({type: SET_ORDER_IN_PROGRESS, orderInProgress})

export const setOrders = (orders) => ({type: SET_ORDERS, orders})

export const restart = () => ({type: RESTART})