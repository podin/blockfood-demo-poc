import React from 'react'

export const STEPS = {
    CUSTOMER_SET_ADDRESS: 1,
    CUSTOMER_CHOOSE_RESTAURANT: 2,
    CUSTOMER_CREATE_ORDER: 3,
    CUSTOMER_DO_PAYMENT: 4,
    RESTAURANT_ACCEPT_ORDER: 5,
    RESTAURANT_NOTIFY_ORDER_READY: 6,
    COURIER_ACCEPT_ORDER: 7,
    COURIER_NOTIFY_ORDER_PICKED: 8,
    COURIER_NOTIFY_ORDER_DELIVERED: 9,
    FREE_MODE: 10
}

export const getStepLabel = (step) => {
    return {
        [STEPS.CUSTOMER_SET_ADDRESS]: 'As a customer, choose a sector by typing an address.',
        [STEPS.CUSTOMER_CHOOSE_RESTAURANT]: 'As a customer, choose a restaurant.',
        [STEPS.CUSTOMER_CREATE_ORDER]: 'As a customer, choose your order in the selected restaurant and then, validate your order.',
        [STEPS.CUSTOMER_DO_PAYMENT]: 'As a customer, proceed to the payment of your order.',
        [STEPS.RESTAURANT_ACCEPT_ORDER]: 'As a restaurant, select a waiting order and accept it.',
        [STEPS.RESTAURANT_NOTIFY_ORDER_READY]: 'As a restaurant, notify that the order is now ready to be delivered.',
        [STEPS.COURIER_ACCEPT_ORDER]: 'As a courier, select a waiting order and accept it.',
        [STEPS.COURIER_NOTIFY_ORDER_PICKED]: 'As a courier, notify that the order is now picked and on its way to be delivered.',
        [STEPS.COURIER_NOTIFY_ORDER_DELIVERED]: 'As a courier, notify that the order is now delivered.',
        [STEPS.FREE_MODE]: 'As a customer, a restaurant or a courier, keep do whatever you want!'
    }[step]
}

export const STEP_INFOS = {
    START_AS_CUSTOMER: 1,
    START_AS_RESTAURANT: 2,
    START_AS_COURIER: 3,
    START_FREE_MODE: 4
}

export const getStepInfoPopupMessage = (stepInfoId) => {
    return {
        [STEP_INFOS.START_AS_CUSTOMER]: (
            <React.Fragment>
                <h1>Welcome to the demo of BlockFood</h1>
                <p>Play the role of a customer, a restaurant and a courier!</p>
                <p>Look at the bottom of your screen to see what you have to do next.</p>
                <h3>Start right now as a hungry customer!</h3>
            </React.Fragment>
        ),
        [STEP_INFOS.START_AS_RESTAURANT]: (
            <React.Fragment>
                <h1>Your order is now created!</h1>
                <p>It's time to become a restaurant in order to accept and prepare this order.</p>
                <h3>Let's go! Chef!</h3>
            </React.Fragment>
        ),
        [STEP_INFOS.START_AS_COURIER]: (
            <React.Fragment>
                <h1>Your order is now cooked and ready!</h1>
                <p>You are going to become another player once again: a courier.</p>
                <h3>Don't wait any longer!</h3>
            </React.Fragment>
        ),
        [STEP_INFOS.START_FREE_MODE]: (
            <React.Fragment>
                <h1>The demo is finished!</h1>
                <p>You are now free to play each role like you want.</p>
                <h3>Use the buttons in the bottom of your screen to switch.</h3>
            </React.Fragment>
        )
    }[stepInfoId]
}