import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from '../components/navigation'
import marked from 'marked'

class Receipt extends React.Component {

  constructor() {
    super();
  }

  render() {
    
    const title = this.props.pageContext.title;    
    let markdown = this.props.pageContext.markdown;
        
    const renderedMarkdown = marked( markdown );    

    return ( 
      <Layout>
        <SEO title={title} />
        <Navigation></Navigation>
        <div className="receipt" dangerouslySetInnerHTML={{__html:renderedMarkdown}} />
      </Layout>
    );
  }

}

export default Receipt;