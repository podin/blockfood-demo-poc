import React from 'react';

import './Template.scss'

class Template extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {type} = this.props

        return (
            <div id="bf-demo-template">
                <header>
                    <div className="logo">
                        <div className="name">
                            <i className={type}/>
                            <div>Block<span>Food</span><span>/{type}</span></div>
                        </div>
                    </div>

                    <div className="user">
                        <i className="fas fa-user"/> Welcome <span>John/Jane Doe</span>
                    </div>
                </header>
                {this.props.children}
            </div>
        )
    }
}

export default Template
