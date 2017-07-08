
const net = require( 'net' );
const process = require( 'process' );

var url = process.argv[ 2 ].split( '/' );
var host = url[ 0 ];
var uri = url[ 1 ];
var headerProperties = {};


if( host === undefined ){
    console.log( 'type "node client.js urlThingHere" for the client to access that website.' );
} else {
  var client = net.createConnection( 80, host, function(){
    client.setEncoding( 'utf8' );

    client.on( 'data', function( data ){
      headerArray = data.split('\n');
      //console.log( headerArray );
      for( var i = 1; i < headerArray.length; i++ ){
        let keyPairArray = headerArray[ i ].split( ' ' );
        let key = keyPairArray[ 0 ];
        key = key.slice( 0, key.length - 1 );
        let property = keyPairArray[ 1 ];
        headerProperties[ key ] = keyPairArray[ 1 ];
      }

      let htmlBody = data.split( '\r\n\r\n' )[ 1 ];
      //console.log( `@@${ htmlBody }` );
      //let htmlBody = data;
      process.stdout.write( htmlBody.toString() );
      //client.end();
    } );

    let date = new Date().toUTCString();

    client.write( `GET / HTTP/1.1\r\nHost: ${ host }\r\nDate: ${ date }\r\nUser-Agent: Poor Man Browser\r\nConnection: close\r\n\r\n` );
    //client.write( 'GET /${ uri } HTTP/1.1\r\n\r\n' );
  } );
}


