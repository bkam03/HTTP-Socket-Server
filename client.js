/*
The node command requires a single argument, the host and uri to request a resource from
example: www.devleague.com/apply
Transmit 'standard' HTTP Headers to the server
Wait for a response from the server
When the server responds, display the response message body to the terminal
If the node client is run with no arguments, display a "help/usage" message that explains how to use your client, including all available options
example usage:

node client.js www.devleague.com
*/

const net = require( 'net' );
const process = require( 'process' );

let host = 'www.google.com';//process.argv[ 2 ];


var client = net.createConnection( 80, host, function(){
  client.setEncoding( 'utf8' );
  //console.log( `-${ host }-` );

  //connects, then sends request
  //client.write( `GET / HTTP/1.1\r\nHost: ${ host }` );
  //waits to receive data, then exits
  client.on( 'data', function( data ){
    console.log( data );
    client.end();
  } );

  client.write( 'GET / HTTP/1.1\r\n\r\n' );
  //client.write( 'GET / HTTP/1.1\r\nHost: www.example.com\r\nConnection: close\r\n\r\n' );
  //client.write( 'GET / HTTP/1.1\r\nHost: ${ host }\r\n\r\n' );

} );
