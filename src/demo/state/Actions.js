export const SET_STEP = 'SET_STEP'
export const SET_CUSTOMER_ADDRESS = 'SET_CUSTOMER_ADDRESS'

export const setStep = (step) => ({type: SET_STEP, step})

export const setCustomerAddress = (customerAddress) => ({type: SET_CUSTOMER_ADDRESS, customerAddress})