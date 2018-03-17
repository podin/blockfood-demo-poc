import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {restart} from '../../state/Actions'

import './FooterController.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onRestart = this.onRestart.bind(this)
    }

    onRestart() {
        this.props.dispatch(restart())
        this.props.history.push('/')
    }

    render() {
        const {location, step} = this.props

        const task = {
            1: 'As a customer, choose a sector by typing an adress',
            2: 'As a customer, choose a restaurant',
            3: 'As a customer, choose your order in the selected restaurant and then, validate your order',
            4: 'As a customer, proceed to the payment of your order'
        }[step]

        return (
            <div id="bf-demo-footer" className={location.pathname !== '/' ? 'visible' : ''}>
                <button className="restart" onClick={this.onRestart}><i className="fas fa-undo-alt"/>Restart</button>
                <div className="progress">
                    <div className="task">{step}/ {task}</div>
                    <div className="breadcrumb">
                        <div className={`icon customer${step >= 1 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 1 ? ' completed' : ''}`}>1</div>
                        <div className={`step${step >= 2 ? ' completed' : ''}`}>2</div>
                        <div className={`step${step >= 3 ? ' completed' : ''}`}>3</div>
                        <div className={`step${step >= 4 ? ' completed' : ''}`}>4</div>
                        <div className={`icon restaurant${step >= 5 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 5 ? ' completed' : ''}`}>5</div>
                        <div className={`step${step >= 6 ? ' completed' : ''}`}>6</div>
                        <div className={`icon courier${step >= 7 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 7 ? ' completed' : ''}`}>7</div>
                        <div className={`step${step >= 8 ? ' completed' : ''}`}>8</div>
                        <div className={`step${step >= 9 ? ' completed' : ''}`}>9</div>
                        <div className={`step${step >= 10 ? ' completed' : ''}`}>10</div>
                        <div className={`icon customer${step >= 11 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 11 ? ' completed' : ''}`}>11</div>
                        <div className={`icon restaurant${step >= 12 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 12 ? ' completed' : ''}`}>12</div>
                        <div className={`icon courier${step >= 13 ? ' completed' : ''}`}></div>
                        <div className={`step${step >= 13 ? ' completed' : ''}`}>13</div>
                    </div>
                </div>
                <button className={`next${true ? ' disabled' : ''}`}><i className="fas fa-hand-point-right"/>Next
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step
    }
}

export default withRouter(connect(mapStateToProps)(Footer))
