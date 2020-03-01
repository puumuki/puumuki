import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ReceiptList from "../components/receiptlist"
import get from 'lodash/get' 

export const receiptsQuery = graphql`
query ReceiptsAll2 {
  allReceiptObject {
    nodes {
      name
      title
      markdown
    }
  }
}
`

class IndexPage extends React.Component {

  render( data ) {
  
    const receipts =  get(this, 'props.data.allReceiptObject.nodes')

    return ( 
      <Layout>
        <SEO title="Reseptit" />        
        <ReceiptList receipts={receipts}/>
      </Layout>
      );
    }

}

export default IndexPage
