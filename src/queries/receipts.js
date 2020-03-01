import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

export default ({ children }) => (
  <StaticQuery query={query}
    render={({ allReceiptObject }) => {
      return children(allReceiptObject && allReceiptObject.nodes.map(node => node))
    }}
  />
)
const query = graphql`
query QReceipts {
  allReceiptObject {
    nodes {
      name
      title
    }
  }
}
`