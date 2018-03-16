import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainView from './demo/MainView'

import './App.scss';

export default () => (
    <BrowserRouter>
        <MainView/>
    </BrowserRouter>
)
