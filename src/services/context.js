import Gun from 'gun'
import 'gun/sea'
import React, { Component } from 'react'
// import { access } from './access'

const defaultState = {
    authenticated: false,
    username: null,
   // access: [],
}
const GlobalContext = React.createContext(defaultState)

export class GlobalContextProvider extends Component {
    constructor(props) {
        super(props)

        this.state = defaultState

        if (window && !(window.gun || window.user || window.sea)) {
            // window.gun = Gun(['https://gun-us.herokuapp.com/gun','https://kmm-gun.herokuapp.com/'])
            window.gun = Gun('https://gun-us.herokuapp.com/gun')
            window.user = window.gun.user()
            window.sea = Gun.SEA // TODO stopped using this as goal one was to get service workers implemented
            window.authenticated = new CustomEvent('authenticated', {
                detail: { authenticated: true },
            })
        }
    }

    componentDidMount() {
        if (window) {
            var { user, authenticated } = window

            user.recall({ sessionStorage: true }, ack => {
                if (user.is && user._.sea) window.dispatchEvent(authenticated)
            })

            window.addEventListener('authenticated', event => {
                this.setState({
                    ...event.detail,
                    username: user.is.alias,
                  //  access: access(user.is.alias),
                })
            })
        }
    }

    componentWillUnmount() {
        if (window) window.removeEventListener('authenticated', null)
    }

    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext