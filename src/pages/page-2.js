import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import DataTable from '../components/DataTable'



const SecondPage = () => (
  <Layout>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <section className="section">
                  <DataTable path="kmmtest" />
              </section>
  </Layout>
)

export default SecondPage
