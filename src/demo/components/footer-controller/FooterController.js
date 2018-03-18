import React from 'react';
import {connect} from 'react-redux'
import Modal from '../modal/Modal'

import {setModal} from '../../state/Actions'

import './FooterController.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onRestart = this.onRestart.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    onRestart() {
        this.props.history.replace('/')
    }

    closeModal() {
        this.props.dispatch(setModal(null))
    }

    render() {
        const {location, step, modal} = this.props

        const task = {
            1: 'As a customer, choose a sector by typing an address.',
            2: 'As a customer, choose a restaurant.',
            3: 'As a customer, choose your order in the selected restaurant and then, validate your order.',
            4: 'As a customer, proceed to the payment of your order.',
            5: 'As a restaurant, select a waiting order and accept it.',
            6: 'As a restaurant, notify that the order is now ready to be delivered.',
            7: 'As a courier, select a waiting order and accept it.',
            8: 'As a courier, notify that the order is now picked and on its way to be delivered.',
            9: 'As a courier, notify that the order is now delivered.',
            10: 'As a customer, a restaurant or a courier, keep do whatever you want!'
        }[step]

        return (
            <div id="bf-demo-footer" className={location.pathname !== '/' ? 'visible' : ''}>
                <button className="restart" onClick={this.onRestart}><i className="fas fa-undo-alt"/>Restart</button>
                <div className="progress">
                    <div className="task">
                        {step !== 0 && <div><span>{step}.</span> {task}</div>}
                    </div>
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
                        <div className={`icon last sep customer${step >= 10 ? ' completed' : ''}`}></div>
                        <div className={`icon last restaurant${step >= 10 ? ' completed' : ''}`}></div>
                        <div className={`icon last courier${step >= 10 ? ' completed' : ''}`}></div>
                    </div>
                </div>
                <div>
                    <a href="http://blockfood.io" target="_blank" rel="noopener noreferrer">Visit blockfood.io</a>
                </div>
                {modal && (
                    <Modal onImmediateClose={modal.onModalClose} onClose={this.closeModal}>
                        {modal.id === 1 && (
                            <React.Fragment>
                                <h1>Welcome to the demo of BlockFood</h1>
                                <p>Play the role of a customer, a restaurant and a courier!</p>
                                <p>Look at the bottom of your screen to see what you have to do next.</p>
                                <h3>Start right now as a hungry customer!</h3>
                            </React.Fragment>
                        )}
                        {modal.id === 2 && (
                            <React.Fragment>
                                <h1>Your order is now created!</h1>
                                <p>It's time to become a restaurant in order to accept and prepare this order.</p>
                                <h3>Let's go! Chef!</h3>
                            </React.Fragment>
                        )}
                        {modal.id === 3 && (
                            <React.Fragment>
                                <h1>Your order is now cooked and ready!</h1>
                                <p>You are going to become another player once again: a courier.</p>
                                <h3>Don't wait any longer!</h3>
                            </React.Fragment>
                        )}
                    </Modal>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        modal: state.modal
    }
}

export default connect(mapStateToProps)(Footer)
