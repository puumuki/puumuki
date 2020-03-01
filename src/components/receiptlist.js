import React from "react";
import { Link } from "gatsby"
import { InlineIcon } from "@iconify/react";
import chevronRight from "@iconify/icons-mdi/chevron-right";

import PubSub from 'pubsub-js';

class ReceiptList extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      receipts: this.props.receipts
    };

    PubSub.subscribe( 'search', this.onSearch );
  }

  onSearch = (  msg, search ) => {

    const searchValue = search.toLowerCase();

    const receipts = this.props.receipts.filter(( receipt ) => {
      return receipt.markdown.toLowerCase().includes( searchValue );
    });

    this.setState({
      receipts
    });
  }

  render() {

    const markdown = this.state.receipts.map( receipt => {
      const link = `/reseptit/${receipt.name}`;

      return (
        <Link  key={receipt.id} to={link}>
          <div  className="receipt-list__receipt">
            {receipt.title} 
            <InlineIcon icon={chevronRight} />            
          </div>
        </Link>
      );
    });

    return ( 
      <div className="receipt-list">
        {markdown}
      </div>
    );
  }

}

export default ReceiptList;