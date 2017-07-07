const net = require( 'net' );
const fs = require( 'fs' );


var myServer = net.createServer();

myServer.listen( 8080, function(){

  myServer.on( 'connection', function( socket ){
    socket.setEncoding( 'utf8' );
    socket.on( 'data', function( chunk ){
      console.log( `chunk\n${ chunk }` );
      let chunkAsArray = chunk.split( ' ' );
      let requestMethod = chunkAsArray[ 0 ];
      let requestPath = `.${ chunkAsArray[ 1 ] }`;
      var htmlBody = '';

      console.log( requestPath + '\n' );
      //try {
        fs.readFile( requestPath, 'utf8', ( err, data ) => {
          if( err ){
            fs.readFile( './404.html', 'utf8', ( err, errorSite ) => {
              htmlBody = errorSite;
            } );
          } else {
            htmlBody = data;
          }

          console.log( `-${ htmlBody }-` );


          let date = new Date().toUTCString();


          socket.write( `HTTP/1.1 200 OK\nServer: testServer\nDate: ${ date }\n\n${htmlBody}` );
          //socket.write( `HTTP/1.1 200 OK\nServer: testServer\nDate: ${ date }\n\n${ htmlBody }` );

          socket.end();
       } );
    } );
  } );

  //if path is not found in routes, return a 404 and output some text/html content
} );