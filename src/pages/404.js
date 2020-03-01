import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from '../components/navigation'
import { InlineIcon } from "@iconify/react";
import starCircle from "@iconify/icons-mdi/star-circle";

const NotFoundPage = () => (
  <Layout layoutClass="page-not-found-404">
    <SEO title="Etsimääsi sivua ei löytynyt - 404" />
    <Navigation />
    <div class="content">          
      <h1>Etsimääsi sivua ei löydetty - 404</h1>
      <p>Etsimääsi sivua ei löydy... voihan harmi!.</p>

      <div class="icon-holder icon-holder--center icon-holder--rotate icon-holder--rotate-slow">
        <i><InlineIcon icon={starCircle} className="huge" /></i>        
      </div>      
    </div>
  </Layout>
)

export default NotFoundPage
