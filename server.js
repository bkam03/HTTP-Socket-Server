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
      var statusCode = '';

      if( requestMethod === 'GET' ){
        console.log( requestPath + '\n' );

        let date = new Date().toUTCString();
        console.log( socket );
        fs.readFile( requestPath, 'utf8', ( err, data ) => {
          if( err ){
            fs.readFile( './404.html', 'utf8', ( err, errorSite ) => {
              statusCode = 'HTTP/1.1 404 NOT FOUND';
              htmlBody = errorSite;
              socket.write( `${ statusCode }\nServer: testServer\nDate: ${ date }\n\n${htmlBody }` );
              socket.end();
            } );
          } else {
            statusCode = 'HTTP/1.1 200 OK';
            htmlBody = data;
            socket.write( `${ statusCode }\nServer: testServer\nDate: ${ date }\n\n${htmlBody }` );
            socket.end();
          }
       } );
      }
    } );
  } );
} );