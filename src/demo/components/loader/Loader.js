import React from 'react'

import './Loader.scss'

const MIN_LOADING_TIME = 1000

export default class Loader extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true,
            loading: true
        }

        this.startedAt = +new Date()

        this.onLoaderTransitionEnd = this.onTransitionEnd.bind(this)
    }

    onTransitionEnd() {
        this.setState({visible: false})
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), MIN_LOADING_TIME)
    }

    render() {
        const {visible, loading} = this.state

        return (
            <div id="bf-demo-loader"
                 className={`${!loading ? 'fade-out' : ''}`} style={{display: !visible ? 'none' : ''}}
                 onTransitionEnd={this.onLoaderTransitionEnd}>
                <div></div>
            </div>
        )
    }
}