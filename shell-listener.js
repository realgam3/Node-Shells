var net = require('net');

LHOST="0.0.0.0";
LPORT="443";

function shellListener(HOST, PORT) {
    var server = net.createServer(function(client) { //'connection' listener
        console.log(
            'connect to [' + client.localAddress + '] from ' + client.remoteAddress +
            ' [' + client.remoteAddress + '] ' + client.remotePort
        );
        client.pipe(process.stdout);
        //process.stdin.pipe(client);
        process.stdin.once('data', function(data) {
            var rtrim_data = data.toString().replace(/(\r|\n)+$/, '');
            if (rtrim_data == "exit")
                process.exit(0);
            client.write(data);
        });
    });
    server.listen(PORT, HOST, function() {
        console.log('listening on [' + ((HOST === '0.0.0.0')? 'any': HOST) + '] ' + PORT);
    });
}

shellListener(LHOST,LPORT);
