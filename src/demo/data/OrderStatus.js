const ORDER_STATUS = {
    WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION',
    COOKING: 'COOKING',
    WAITING_COURIER: 'WAITING_COURIER',
    DELIVERING: 'DELIVERING',
    DONE: 'DONE'
}

export default ORDER_STATUS

export const getStatus = order => {
    return {
        [ORDER_STATUS.WAITING_RESTAURANT_VALIDATION]: 'Waiting restaurant validation',
        [ORDER_STATUS.COOKING]: 'In preparation',
        [ORDER_STATUS.WAITING_COURIER]: 'Looking for a courier',
        [ORDER_STATUS.DELIVERING]: 'Delivering',
        [ORDER_STATUS.DONE]: 'Done'
    }[order.status]
}