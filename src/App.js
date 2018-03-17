import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Store from './demo/state/Store'
import MainView from './demo/MainView'

import './App.scss';

export default () => (
    <Provider store={Store}>
        <BrowserRouter>
            <MainView/>
        </BrowserRouter>
    </Provider>
)
