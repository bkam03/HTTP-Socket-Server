const net = require( 'net' );

var myServer = net.createServer();

myServer.listen( 8080, function(){

  myServer.on( 'connection', function( socket ){
    socket.setEncoding( 'utf8' );
    socket.on( 'data', function( chunk ){
      //console.log( chunk );

      var date = new Date().toUTCString();
      console.log( date );

      socket.write( `HTTP/1.1 200 OK\n
                    Server: testServer\n
                    Date: ${ date }\n\n

                    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>` );

      socket.end();
    } );


    //transmit standard http headers to the client

    //trasmit a hardcoded, in memory html body for each route


  } );

  //if path is not found in routes, return a 404 and output some text/html content
} );