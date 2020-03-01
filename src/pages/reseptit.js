import React from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReceiptList from "../components/receiptlist"
import Navigation from '../components/navigation'
import { graphql } from 'gatsby'
import get from 'lodash/get'  

export const receiptsQuery = graphql`
query ReceiptsAll {
  allReceiptObject {
    nodes {
      name
      title
    }
  }
}
`

class Receipts extends React.Component {

  render() {
  
  const receipts =  get(this, 'props.data.allReceiptObject.nodes')

  return ( 
    <Layout>
      <SEO title="Home" />
      <Navigation></Navigation>
      <ReceiptList receipts={receipts}/>      
    </Layout>
    );
  }

}

export default Receipts;