import React from "react"
import { Link } from "gatsby"
import { InlineIcon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";

class Navigation extends React.Component {

  render() {
  
    return ( 
      <nav>            
        <Link to="/"><InlineIcon icon={chevronLeft} /> Etusivu</Link>            
      </nav>
      );
    }

}

export default Navigation
