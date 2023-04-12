const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg.length}`);
	fs.appendFile('adcUDP.raw', msg, (e) => {
		if(e) console.log('error:', e.message);
	});
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(12345);