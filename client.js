
const net = require( 'net' );
const process = require( 'process' );

var url = process.argv[ 2 ].split( '/' );
var host = url[ 0 ];
var uri = url[ 1 ];
var headerProperties = {};
var statusCode = 0;


if( host === undefined ){
    console.log( 'type "node client.js urlThingHere" for the client to access that website.' );
} else {
  var client = net.createConnection( 80, host, function(){
    client.setEncoding( 'utf8' );

    client.on( 'data', function( data ){

      let headerEndPosition = data.indexOf( '<' );
      let header = data.slice( 0, headerEndPosition );
      let htmlBody = data.slice( headerEndPosition );
      let headerKeyPairs = header.split( '\r\n' );
      headerEndPosition = headerKeyPairs.indexOf( '' );
      headerKeyPairs.splice( headerEndPosition );

      let statusLine = headerKeyPairs.shift();
      if( statusLine !== undefined ){
        statusCode = statusLine.split( ' ' )[ 1 ];
      }

      for( var i = 0; i < headerKeyPairs.length; i++ ){
        let keyPairArray = headerKeyPairs[ i ].split( ': ' );
        headerProperties[ keyPairArray[ 0 ] ] = keyPairArray[ 1 ];
      }

      process.stdout.write( htmlBody );
    } );

    let date = new Date().toUTCString();

    client.write( `GET / HTTP/1.1\r\nHost: ${ host }\r\nDate: ${ date }\r\nUser-Agent: Poor Man Browser\r\nConnection: close\r\n\r\n` );
  } );
}