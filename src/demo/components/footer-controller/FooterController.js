import React from 'react';
import {withRouter} from 'react-router-dom'

import './FooterController.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onRestart = this.onRestart.bind(this)
    }

    onRestart() {
        this.props.history.push('/')
    }

    render() {
        const {location} = this.props

        return (
            <div id="bf-demo-footer" className={location.pathname !== '/' ? 'visible' : ''}>
                <button className="restart" onClick={this.onRestart}><i className="fas fa-undo-alt"/>Restart</button>
            </div>
        )
    }
}

export default withRouter(Footer)
