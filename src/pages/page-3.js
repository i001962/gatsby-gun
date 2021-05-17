import React, { Component } from 'react'

//import Dashboard from '../../../layouts/Dashboard'
import DataTable from '../components/DataTable'

export default class User extends Component {
    state = {}

    render() {
        const { pageContext } = this.props
        return (
         
                <section className="section">
                    <DataTable pageContext={pageContext} path="kmmtest" />
                </section>
        )
    }
}