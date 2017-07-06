const net = require( 'net' );

var myServer = net.createServer();

myServer.listen( 8080, function(){

  myServer.on( 'connection', function( socket ){
    socket.setEncoding( 'utf8' );
    socket.on( 'data', function( chunk ){
      console.log( chunk );
    } );


    //transmit standard http headers to the client
      //correct status code should be sent   httpver ### THING

      //date : current timestamp should be sent in RFC1123 format
      //server : the name of your server
    //trasmit a hardcoded, in memory html body for each route

  //terminate connection
  } );

  //if path is not found in routes, return a 404 and output some text/html content
} );