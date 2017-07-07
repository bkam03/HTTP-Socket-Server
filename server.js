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
      let requestPath = `.${ chunkAsArray[ 1 ] }`;

      var htmlBody = '';
      //read input
      console.log( requestPath );
      fs.readFile( requestPath, ( err, data ) => {
        if( err ) throw err;
        console.log( `@${ data }` );
        htmlBody = data;
        console.log( htmlBody );
      } );



      //output

      let date = new Date().toUTCString();


      socket.write( `HTTP/1.1 200 OK\nServer: testServer\nDate: ${ date }\n\n${ htmlBody }` );

      socket.end();
    } );



    //trasmit a hardcoded, in memory html body for each route


  } );

  //if path is not found in routes, return a 404 and output some text/html content
} );