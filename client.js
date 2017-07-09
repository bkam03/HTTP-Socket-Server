
const net = require( 'net' );
const process = require( 'process' );

var method = 'GET';
var url = '';
var host = '';
var uri = '';
var options = '';
var headerProperties = {};
var statusCode = 0;


if( process.argv.length === 4 ){
  url = process.argv[ 3 ].split( '/' );
  host = url[ 0 ];
  uri = url[ 1 ];
  options = process.argv[ 2 ];
} else if( process.argv.length === 3 ) {
  url = process.argv[ 2 ].split( '/' );
  host = url[ 0 ];
  uri = url[ 1 ];
} else {
  throw error;
}

console.log( options );


if( host === undefined ){
    console.log( 'node client.js [-options] targetUrl' );
} else {
  var client = net.createConnection( 80, host, function(){
    client.setEncoding( 'utf8' );

    client.on( 'data', function( data ){

      let headerEndPosition = data.indexOf( '<' );
      let header = data.slice( 0, headerEndPosition ); //separate header from body
      let htmlBody = data.slice( headerEndPosition );

      let headerKeyPairs = header.split( '\r\n' );
      headerEndPosition = headerKeyPairs.indexOf( '' ); //grab just keyvalue pairs in header
      headerKeyPairs.splice( headerEndPosition );

      let statusLine = headerKeyPairs.shift();  //grab status line from header
      if( statusLine !== undefined ){
        statusCode = statusLine.split( ' ' )[ 1 ];
      }

      for( var i = 0; i < headerKeyPairs.length; i++ ){ //make header into key value pairs
        let keyPairArray = headerKeyPairs[ i ].split( ': ' );
        headerProperties[ keyPairArray[ 0 ] ] = keyPairArray[ 1 ];
      }

      process.stdout.write( htmlBody );
    } );

    let date = new Date().toUTCString();



    client.write( `${ method } / HTTP/1.1\r\nHost: ${ host }\r\nDate: ${ date }\r\nUser-Agent: Poor Man Browser\r\nConnection: close\r\n\r\n` );
  } );
}