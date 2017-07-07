const net = require( 'net' );
const fs = require( 'fs' );


var myServer = net.createServer();

myServer.listen( 8080, function(){

  myServer.on( 'connection', function( socket ){
    socket.setEncoding( 'utf8' );
    socket.on( 'data', function( chunk ){
      console.log( chunk );
      let chunkAsArray = chunk.split( ' ' );
      let requestMethod = chunkAsArray[ 0 ];
      let requestPath = chunkAsArray[ 1 ];

      console.log( requestMethod, requestPath );
      //read input




      //output

      let date = new Date().toUTCString();
      let htmlBody = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>';

      socket.write( `HTTP/1.1 200 OK\nServer: testServer\nDate: ${ date }\n\n${ htmlBody }` );

      socket.end();
    } );



    //trasmit a hardcoded, in memory html body for each route


  } );

  //if path is not found in routes, return a 404 and output some text/html content
} );