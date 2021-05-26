import React, {
    Component
} from 'react'

export default class DataTable extends Component {
    state = {
        headers: []
    }

    componentDidMount() {
        if (window) {
            var {
                gun
            } = window
            console.log(this.props.path)
            gun.get(this.props.path).on(data => {
                console.log(data)
                Object.keys(data).map(async key => {
                    try {
                        console.log(key)
                        if (key !== '_') {
                            console.log(data[key], 'inside')
                            var headers = this.state.headers
                            if (!headers[key]) {
                                var temp = {"key":key, "value":data[key]}
                                headers[key] = key // todo temp into this then render both key and value
                            }
                           
                            this.setState({
                                headers: headers
                            })
                        }
                    } catch (error) {}
                })
            })
        }
    }

    componentWillUnmount() {
        if (window) {
            window.gun.get(this.props.path).off()
        }
    }

    render() {
        return ( <
            div className = "table-container" >
            {
                Object.keys(this.state['headers']).map(key => ( 
                    <p key={key}> {this.state['headers'][key]}</p>
                    
                    ))
            } 
            </div>
        )
    }
}