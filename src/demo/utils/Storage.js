import * as _ from 'lodash'

const STORAGE_PREFIX = 'bf-demo-'

class Storage {
    _clearObjectFromSessionStorage(key, usePrefix = true) {
        try {
            window.sessionStorage.removeItem((usePrefix ? STORAGE_PREFIX : '') + key)
        }
        catch (e) {
        }
    }

    _readObjectFromSessionStorage(key, usePrefix = true) {
        try {
            const response = window.sessionStorage.getItem((usePrefix ? STORAGE_PREFIX : '') + key)
            return response ? JSON.parse(response) : undefined
        }
        catch (e) {
            return undefined
        }
    }

    _writeObjectToSessionStorage(key, object, usePrefix = true) {
        try {
            window.sessionStorage.setItem((usePrefix ? STORAGE_PREFIX : '') + key, JSON.stringify(object))
        }
        catch (e) {
        }
    }

    setCurrentAddress(currentAddress) {
        this._writeObjectToSessionStorage('current-address', currentAddress)
    }

    getCurrentAddress() {
        return this._readObjectFromSessionStorage('current-address')
    }

    setOrderInProgress(orderInProgress) {
        this._writeObjectToSessionStorage('order-in-progress', orderInProgress)
    }

    getOrderInProgress() {
        return this._readObjectFromSessionStorage('order-in-progress')
    }

    clearAll() {
        _.forEach(_.keys(window.sessionStorage), key => {
            if (key.indexOf(STORAGE_PREFIX) === 0) {
                this._clearObjectFromSessionStorage(key, false)
            }
        })
    }
}

export default new Storage()