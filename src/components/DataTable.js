import React, { Component } from 'react'

export default class DataTable extends Component {
    state = { headers: [] }

    componentDidMount() {
        if (window) {
            var { gun, sea } = window
            gun.get('kmmtest').on(data => {
                Object.keys(data).map(async key => {
                    try {
                        var _data = await sea.verify(JSON.parse(data[key]), key)
                        if (key === _data.pub) {
                            this.setState({ [key]: _data })
                            var headers = this.state.headers
                            for (var _key in _data) {
                                if (!headers[_key]) {
                                    headers[_key] = _key
                                }
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
                                        {Object.keys(this.state[key]).map(
                                            _key => (
                                                <td key={_key}>
                                                    {this.state[key][_key]}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
