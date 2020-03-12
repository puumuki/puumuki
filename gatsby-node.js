/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('node-fetch');
const crypto = require('crypto');
const path = require('path');
const http = require('http');

const fs = require('fs');

function downloadFile(url, dest) {  
  return new Promise((success, failure) => {
    var file = fs.createWriteStream(dest);
    
    var request = http.get(url, function(response) {
      response.pipe(file);

      file.on('finish', function() {
        file.close(() => {
          success({ url, destination: dest });
        });
      });
    }).on('error', function(err) {
       // Delete the file async. (But we don't check the result)
      fs.unlink(dest);         
      failure( error );      
    });
  });
};


exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions;

  const result = await graphql(`
  query AllReceiptsQuery {
    allReceiptObject {
      nodes {
        title
        slug
        name
        id
        markdown      
      }
    }
  }  
  `)

  result.data.allReceiptObject.nodes.forEach( node  => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/receipt.js`),
      context: {
        ...node
      },
    })
  })  
}

exports.sourceNodes = async ({ actions }) => {
  
  console.log( "PROCESS", process.env)

  const baseUrl = "http://192.168.8.200:8080";
  const staticFolder = path.join( path.dirname( __filename ), 'static' );
     
  const { createNode } = actions

  try {
    const response2 = await fetch(`${baseUrl}/api/files`);
    const files = await response2.json();
    
    const promises = files.map(( fileUrl ) => {
      const paths = fileUrl.split("/");
      const fileName = paths[ paths.length - 1 ];
      const destination = path.join( staticFolder, fileName );

      //Download file only if it does't exist.
      if( !fs.existsSync( destination ) ) {
        return downloadFile( fileUrl, )
      }
    }).filter( Boolean );

    Promise.all( promises ).then(( result ) => {
      console.log("All files downloaded", result);
    });

  } catch( error ) {
    console.error( "Error occurred file copying files to static folder", error )
    throw error;
  }

  try {
    const response = await fetch(`${baseUrl}/api/v2/recipes`);
    let receipts = await response.json();
  
    receipts = receipts.map(  receipt => {
      
      const title = receipt.markdown.split('\n')[0];
      
      //Replace file references in the markdown with the reference to static files folder
      receipt.markdown = receipt.markdown.replace(new RegExp('http://puumuki.game-server.cc/static/img', 'g'), '');
                                    
      return {
        slug: `/reseptit/${receipt.name}`,
        title,
        ...receipt      
      };  
    });

    receipts.forEach( receipt => {
      
      const jsonReceipt = JSON.stringify( receipt );

      createNode({
        id: receipt.name,
        parent: null,
        children: [],
        internal: {
          type: "ReceiptObject",
          contentDigest: crypto.createHash('md5').update(jsonReceipt).digest('hex'),
          description: receipt.title
        },
        ...receipt
      });
    });

  } catch( error ) {
    console.error( error );
  }
  
  return;
}
