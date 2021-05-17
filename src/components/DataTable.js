import React, { Component } from 'react'

export default class DataTable extends Component {
    state = { headers: [] }

    componentDidMount() {
        if (window) {
            var { gun } = window
            console.log(this.props.path)
            gun.get(this.props.path).on(data => {
              console.log(data)
                Object.keys(data).map(async key => {
                    try {
                        console.log(key)
                        if (key !== '_' ) {
                          console.log(data[key], 'inside')
                          var _data = data[key]
                          this.setState({ key: _data })
                          var headers = this.state.headers
                            if (!headers[key]) {
                              headers[key] = key
                            }  
                              this.setState({ headers: headers })

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
        return (
            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            {Object.keys(this.state['headers']).map(key => (
                                <td key={key}>{this.state['headers'][key]}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state).map(
                            key =>
                                key !== 'headers' && (
                                    <tr key={key}>
                                                <td key={key}>
                                                    {this.state[key]}
                                                </td>
                                            
                                        
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}