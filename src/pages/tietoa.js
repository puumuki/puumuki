import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from '../components/navigation'

const About = () => (
  <Layout>
    <SEO title="Etsimääsi sivua ei löytynyt - 404" />
    <Navigation />
    <h1>Etsimääsi sivua ei löydetty - 404</h1>
    <p>Etsimääsi sivua ei löydy... voihan harmi!.</p>
  </Layout>
)

export default About
